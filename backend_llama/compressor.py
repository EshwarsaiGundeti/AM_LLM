"""
compressor.py
=============
AM-LLM — Memory Compression Module

Implements SRS §3.1.5:
  "The system shall periodically scan the long-term memory store and
   identify clusters of semantically similar entries."
  "The system shall merge memories within a similarity cluster into a
   single consolidated entry, preserving the most informative attributes."
  "The system shall update the FAISS index to reflect the consolidated
   memory and remove redundant entries."

Algorithm (SRS §6.4):
    AgglomerativeClustering (scikit-learn) + centroid vector merging.

Design:
    compressor.py handles clustering logic and SQLite updates only.
    FAISS index rebuild is delegated to memory_manager.py (the central
    coordinator) which calls run_compression() and then rebuilds the index
    using the returned list of affected IDs.
"""

from __future__ import annotations

import os
from dataclasses import dataclass, field

import numpy as np
import yaml
from sklearn.cluster import AgglomerativeClustering

import database
import embedder


# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------

def _load_config() -> dict:
    config_path = os.path.join(os.path.dirname(__file__), "config.yaml")
    with open(config_path, "r") as f:
        return yaml.safe_load(f)


CONFIG  = _load_config()
_COMP   = CONFIG["compression"]

MERGE_THRESHOLD  = float(_COMP["merge_threshold"])   # distance threshold for clustering
MIN_CLUSTER_SIZE = int(_COMP["min_cluster_size"])     # min members to trigger a merge
COMPRESSION_INTERVAL = int(_COMP["interval"])         # run every N queries


# ---------------------------------------------------------------------------
# Result dataclass
# ---------------------------------------------------------------------------

@dataclass
class CompressionResult:
    """
    Returned by run_compression() so memory_manager knows
    exactly what changed and can rebuild the FAISS index.
    """
    clusters_merged:   int       = 0
    memories_before:   int       = 0
    memories_after:    int       = 0
    deleted_ids:       list[int] = field(default_factory=list)
    inserted_ids:      list[int] = field(default_factory=list)
    skipped_no_data:   bool      = False   # True if LTM was empty or too small


# ---------------------------------------------------------------------------
# Public API
# ---------------------------------------------------------------------------

def run_compression(session_id: str) -> CompressionResult:
    """
    Full compression cycle (SRS §3.1.5):

      1. Load all LTM embeddings + their SQLite IDs.
      2. Run AgglomerativeClustering on the embedding matrix.
      3. For each cluster with size >= MIN_CLUSTER_SIZE:
           a. Compute centroid embedding (mean → re-normalise).
           b. Build merged text (highest-scoring entry first).
           c. Take max importance_score among cluster members.
           d. Insert consolidated memory row into SQLite.
           e. Delete original cluster rows from SQLite.
      4. Update session compression counter.
      5. Return CompressionResult for memory_manager to rebuild FAISS.

    Args:
        session_id: Active session UUID for stats tracking.

    Returns:
        CompressionResult with stats and IDs of deleted/inserted rows.
    """
    result = CompressionResult()

    # -- Load all LTM embeddings ---------------------------------------------
    embeddings, ids = database.get_embeddings_and_ids()
    result.memories_before = len(ids)

    # Need at least MIN_CLUSTER_SIZE entries to compress anything
    if embeddings.shape[0] < MIN_CLUSTER_SIZE:
        result.skipped_no_data = True
        return result

    # -- Run AgglomerativeClustering -----------------------------------------
    # metric="cosine", linkage="average" — best for semantic text clusters.
    # distance_threshold replaces n_clusters so we don't need to specify k.
    labels = _cluster(embeddings)

    # -- Process each cluster ------------------------------------------------
    unique_labels = set(labels)
    all_deleted:  list[int] = []
    all_inserted: list[int] = []

    for label in unique_labels:
        cluster_indices = [i for i, lbl in enumerate(labels) if lbl == label]

        # Only merge clusters that meet the minimum size requirement
        if len(cluster_indices) < MIN_CLUSTER_SIZE:
            continue

        cluster_ids = [ids[i] for i in cluster_indices]

        # Fetch full row data for each cluster member
        rows = [database.get_memory_by_id(mid) for mid in cluster_ids]
        rows = [r for r in rows if r is not None]   # guard against stale IDs

        if len(rows) < MIN_CLUSTER_SIZE:
            continue

        # -- Centroid embedding (SRS: "consolidated entry") ------------------
        # Use the already-loaded embeddings matrix (from get_embeddings_and_ids)
        # indexed by cluster_indices — no need to re-load blobs from SQLite.
        cluster_vecs = embeddings[cluster_indices].astype(np.float32)
        centroid_vec = embedder._normalise(cluster_vecs.mean(axis=0))  # noqa: SLF001

        # -- Merged text (highest importance_score entry listed first) -------
        rows_sorted  = sorted(rows, key=lambda r: r["importance_score"], reverse=True)
        merged_text  = _merge_texts([r["text"] for r in rows_sorted])

        # -- Highest importance score in cluster stays as the score ----------
        max_score    = float(max(r["importance_score"] for r in rows))
        max_current  = float(max(r["current_score"]    for r in rows))

        # -- Insert consolidated memory into SQLite --------------------------
        new_id = database.insert_memory(
            text             = merged_text,
            embedding        = centroid_vec,
            importance_score = max_score,
            session_id       = session_id,
            faiss_id         = None,    # memory_manager will assign after FAISS rebuild
        )
        # Override current_score to the max from cluster (insert_memory sets it = importance_score)
        database.update_memory_score(new_id, max_current)

        # -- Delete original cluster members from SQLite ---------------------
        database.delete_memories_batch(cluster_ids)

        all_deleted.extend(cluster_ids)
        all_inserted.append(new_id)
        result.clusters_merged += 1

    # -- Update session stats ------------------------------------------------
    if all_deleted:
        database.increment_session_compressed(session_id, len(all_deleted))

    result.deleted_ids  = all_deleted
    result.inserted_ids = all_inserted
    result.memories_after = database.get_memory_count()

    return result


def should_compress(query_count: int) -> bool:
    """
    Return True if it is time to run a compression cycle.
    Triggered every COMPRESSION_INTERVAL queries (from config.yaml).
    """
    return query_count > 0 and (query_count % COMPRESSION_INTERVAL == 0)


# ---------------------------------------------------------------------------
# Internal helpers
# ---------------------------------------------------------------------------

def _cluster(embeddings: np.ndarray) -> list[int]:
    """
    Run AgglomerativeClustering on the embedding matrix.

    Uses:
      - metric   = "cosine"  (matches our cosine-similarity retrieval)
      - linkage  = "average" (robust to noise vs. single/complete linkage)
      - distance_threshold = MERGE_THRESHOLD (from config.yaml, default 0.30)
      - n_clusters = None    (required when distance_threshold is set)

    Returns:
        List of integer cluster labels, one per row in embeddings.
    """
    model = AgglomerativeClustering(
        n_clusters         = None,
        distance_threshold = MERGE_THRESHOLD,
        metric             = "cosine",
        linkage            = "average",
    )
    return model.fit_predict(embeddings).tolist()


def _merge_texts(texts: list[str]) -> str:
    """
    Combine multiple memory text fragments into one consolidated entry.

    Strategy: join with ' | ' separator.
    The first text (highest importance_score) is placed first,
    which preserves the most informative content (SRS §3.1.5).
    Truncate to 1000 chars to keep the consolidated entry reasonable.
    """
    merged = " | ".join(t.strip() for t in texts if t.strip())
    return merged[:1000]
