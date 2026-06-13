"""
memory_manager.py
=================
AM-LLM — Central Memory Controller

The AdaptiveMemoryManager is the single coordinator between:
  - Short-Term Memory (STM)  : rolling buffer of recent turns (SRS §3.1.1)
  - Staging Buffer           : candidates awaiting importance scoring (SRS §3.1.2)
  - Long-Term Memory (LTM)   : FAISS index + SQLite (SRS §3.1.4)
  - Importance Scorer        : decides what enters LTM (SRS §3.1.3)
  - Compressor               : merges similar memories (SRS §3.1.5)
  - Forgetter                : decays and prunes stale memories (SRS §3.1.6)

One instance is created at application startup and shared across all requests
via FastAPI dependency injection.
"""

from __future__ import annotations

import os
from threading import Lock

import faiss
import numpy as np
import yaml

import database
import embedder
import importance_scorer
import compressor as compressor_mod
import forgetter as forgetter_mod
from compressor import CompressionResult
from forgetter  import ForgettingResult


# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------

def _load_config() -> dict:
    config_path = os.path.join(os.path.dirname(__file__), "config.yaml")
    with open(config_path, "r") as f:
        return yaml.safe_load(f)


CONFIG        = _load_config()
_STM_MAX      = int(CONFIG["stm"]["max_turns"])
_TOP_K        = int(CONFIG["retrieval"]["top_k"])
_DIM          = int(CONFIG["embedding"]["dimension"])
_HNSW_M       = int(CONFIG["faiss"]["hnsw_m"])
_MAX_CTX_TOK  = int(CONFIG["llm"]["max_context_tokens"])
_FAISS_PATH   = os.path.join(os.path.dirname(__file__), CONFIG["paths"]["faiss_index"])


# ---------------------------------------------------------------------------
# AdaptiveMemoryManager
# ---------------------------------------------------------------------------

class AdaptiveMemoryManager:
    """
    Central coordinator for all memory operations.

    Attributes:
        _index    : FAISS HNSWFlat index for approximate nearest-neighbour search.
        _id_map   : list mapping FAISS index position → SQLite memory row id.
        _stm      : Short-Term Memory buffer — list of {"role", "text"} dicts.
        _staging  : Staging buffer — list of {"text", "vec"} dicts (SRS §3.1.2).
        _lock     : Thread lock protecting FAISS index mutations.
    """

    def __init__(self) -> None:
        # Initialise database tables and CSV log files
        database.init_db()

        # FAISS index + ID mapping
        self._index: faiss.Index = self._load_or_create_index()
        self._id_map: list[int]  = []          # _id_map[faiss_pos] = sqlite_id
        self._lock   = Lock()

        # Rebuild id_map from SQLite so it matches the loaded FAISS index
        self._rebuild_id_map_from_db()

        # Short-Term Memory buffer
        self._stm: list[dict] = []

        # Staging buffer (SRS §3.1.2)
        self._staging: list[dict] = []

    # -----------------------------------------------------------------------
    # Session Management (SRS §3.1.1)
    # -----------------------------------------------------------------------

    def start_session(self, session_id: str) -> None:
        """Create a new session record in SQLite."""
        database.create_session(session_id)

    def close_session(
        self,
        session_id:  str,
        query_count: int,
        hits:        int,
    ) -> dict:
        """
        SRS §3.1.1: On session close, flush STM through importance scoring,
        persist the FAISS index to disk, and return the session summary.

        Args:
            session_id  : Active session UUID.
            query_count : Total queries made in this session.
            hits        : Number of queries where at least one memory was retrieved.

        Returns:
            Session summary dict from SQLite.
        """
        # -- Flush STM → ingest as memory candidates -------------------------
        for turn in self._stm:
            if turn["role"] == "user":
                vec = embedder.encode(turn["text"])
                # Use self-relevance (query_vec = vec) during session close
                # since there is no active query at this point.
                self._score_and_store(turn["text"], vec, vec, session_id)

        # -- Clear STM and staging buffer ------------------------------------
        self._stm.clear()
        self._staging.clear()

        # -- Persist FAISS index to disk (SRS §3.3.2) ------------------------
        self.persist_faiss()

        # -- Compute hit rate and close session in SQLite --------------------
        hit_rate = round(hits / query_count, 4) if query_count > 0 else 0.0
        return database.close_session(session_id, hit_rate)

    # -----------------------------------------------------------------------
    # Short-Term Memory (SRS §3.1.1)
    # -----------------------------------------------------------------------

    def add_to_stm(self, role: str, text: str) -> None:
        """
        Append a turn to the STM rolling buffer.
        If the buffer exceeds max_turns, the oldest entry is dropped.

        Args:
            role : "user" or "assistant".
            text : The utterance text.
        """
        self._stm.append({"role": role, "text": text})
        if len(self._stm) > _STM_MAX:
            self._stm.pop(0)

    def get_stm_context(self) -> str:
        """
        Return the current STM buffer as a single formatted string for
        inclusion in the LLM prompt.
        """
        if not self._stm:
            return ""
        lines = [f"{t['role'].capitalize()}: {t['text']}" for t in self._stm]
        return "\n".join(lines)

    # -----------------------------------------------------------------------
    # Memory Retrieval (SRS §3.1.7)
    # -----------------------------------------------------------------------

    def retrieve_memories(
        self,
        query_vec: np.ndarray,
        top_k:     int | None = None,
    ) -> list[dict]:
        """
        Encode the query, search FAISS for top-k nearest memories,
        update access counts, and return memory dicts sorted by relevance.

        Args:
            query_vec : Unit-normalised 384-dim query embedding.
            top_k     : Number of memories to retrieve (defaults to config value).

        Returns:
            List of memory dicts (from SQLite) sorted by similarity score.
            Returns [] if LTM is empty.
        """
        k = top_k if top_k is not None else _TOP_K

        with self._lock:
            n_stored = self._index.ntotal
            if n_stored == 0:
                return []

            # FAISS requires k ≤ n_stored
            k_actual = min(k, n_stored)
            vec = query_vec.reshape(1, -1).astype(np.float32)
            distances, faiss_indices = self._index.search(vec, k_actual)

        retrieved = []
        for faiss_pos, score in zip(faiss_indices[0], distances[0]):
            if faiss_pos < 0 or faiss_pos >= len(self._id_map):
                continue   # FAISS returns -1 for unfilled slots

            sqlite_id  = self._id_map[faiss_pos]
            memory_row = database.get_memory_by_id(sqlite_id)
            if memory_row is None:
                continue

            # Update access metadata (SRS §3.1.8)
            database.update_memory_access(sqlite_id)

            retrieved.append({
                **memory_row,
                "similarity_score": float(score),
            })

        return retrieved

    def build_augmented_context(
        self,
        query:     str,
        memories:  list[dict],
    ) -> str:
        """
        Concatenate STM context + retrieved LTM snippets + current query
        into a single prompt string, truncated to max_context_tokens chars.
        (SRS §3.1.8)

        Args:
            query    : The current user query.
            memories : Retrieved LTM memory dicts.

        Returns:
            Augmented context string ready to pass to the LLM.
        """
        parts: list[str] = []

        # Retrieved memories section
        if memories:
            mem_lines = [f"- {m['text']}" for m in memories]
            parts.append("Relevant memories:\n" + "\n".join(mem_lines))

        # STM recent conversation
        stm_ctx = self.get_stm_context()
        if stm_ctx:
            parts.append("Recent conversation:\n" + stm_ctx)

        # Current query
        parts.append(f"User: {query}")

        context = "\n\n".join(parts)

        # Truncate by character count as a proxy for token count
        # (1 token ≈ 4 chars for English text)
        char_limit = _MAX_CTX_TOK * 4
        if len(context) > char_limit:
            context = context[-char_limit:]   # keep the most recent content

        return context

    # -----------------------------------------------------------------------
    # Memory Ingestion (SRS §3.1.2 + §3.1.3 + §3.1.4)
    # -----------------------------------------------------------------------

    def ingest_from_text(
        self,
        text:       str,
        query_vec:  np.ndarray,
        session_id: str,
    ) -> list[dict]:
        """
        Full ingestion pipeline for a text fragment (SRS §3.1.2):
          1. Segment into sentences using NLTK.
          2. Encode each sentence.
          3. Add to staging buffer.
          4. Score each candidate via importance_scorer.
          5. Store qualifying candidates in FAISS + SQLite.

        Args:
            text       : The text to consider for memory storage.
            query_vec  : Unit-normalised query embedding (for relevance scoring).
            session_id : Active session UUID.

        Returns:
            List of dicts describing ingestion actions taken.
        """
        actions: list[dict] = []
        sentences = embedder.segment_into_sentences(text)

        for sentence in sentences:
            vec = embedder.encode(sentence)

            # Stage the candidate (SRS §3.1.2)
            self._staging.append({"text": sentence, "vec": vec})

            # Score and conditionally store — pass the real query_vec so
            # importance_scorer computes true contextual relevance, not
            # self-relevance (was a silent bug before this fix).
            action = self._score_and_store(sentence, vec, query_vec, session_id)
            actions.append(action)

        return actions

    def _score_and_store(
        self,
        text:       str,
        vec:        np.ndarray,
        query_vec:  np.ndarray,
        session_id: str,
    ) -> dict:
        """
        Score a single candidate and store it in FAISS + SQLite if it
        passes the importance threshold (SRS §3.1.3 + §3.1.4).

        Args:
            text       : Candidate text.
            vec        : Unit-normalised embedding of the candidate.
            query_vec  : Unit-normalised embedding of the current user query
                         (used to compute contextual relevance in the scorer).
            session_id : Active session UUID.

        Returns:
            Dict with keys: text, score, decision.
        """
        score, decision = importance_scorer.score_candidate(
            candidate_text = text,
            candidate_vec  = vec,
            query_vec      = query_vec,
            session_id     = session_id,
        )

        if decision == "stored":
            self._add_to_ltm(text, vec, score, session_id)
            database.increment_session_stored(session_id)

        return {"text": text, "score": score, "decision": decision}

    def _add_to_ltm(
        self,
        text:       str,
        vec:        np.ndarray,
        score:      float,
        session_id: str,
    ) -> int:
        """
        Write a memory to FAISS + SQLite and update the ID map.

        Returns:
            The new SQLite row id.
        """
        with self._lock:
            # FAISS position = current number of vectors before adding
            faiss_pos = self._index.ntotal
            self._index.add(vec.reshape(1, -1).astype(np.float32))

        # Write to SQLite with the faiss_pos as faiss_id
        sqlite_id = database.insert_memory(
            text             = text,
            embedding        = vec,
            importance_score = score,
            session_id       = session_id,
            faiss_id         = faiss_pos,
        )

        # Append to _id_map inside a lock — ensures that retrieve_memories()
        # never sees a FAISS position with no corresponding id_map entry.
        with self._lock:
            self._id_map.append(sqlite_id)

        return sqlite_id

    # -----------------------------------------------------------------------
    # Maintenance — Compression + Forgetting (SRS §3.1.5 + §3.1.6)
    # -----------------------------------------------------------------------

    def run_maintenance(
        self,
        session_id:  str,
        query_count: int,
    ) -> dict:
        """
        Check whether compression and/or forgetting should run based on
        query_count intervals defined in config.yaml, and execute them.

        Args:
            session_id  : Active session UUID.
            query_count : Total queries made so far in this session.

        Returns:
            Dict summarising what maintenance was performed.
        """
        report: dict = {
            "compression": None,
            "forgetting":  None,
        }

        # -- Compression cycle (SRS §3.1.5) ----------------------------------
        if compressor_mod.should_compress(query_count):
            comp_result: CompressionResult = compressor_mod.run_compression(session_id)
            if comp_result.clusters_merged > 0:
                # Rebuild FAISS to reflect merged/deleted entries
                self._rebuild_faiss_index()
            report["compression"] = {
                "clusters_merged": comp_result.clusters_merged,
                "memories_before": comp_result.memories_before,
                "memories_after":  comp_result.memories_after,
                "skipped":         comp_result.skipped_no_data,
            }

        # -- Forgetting cycle (SRS §3.1.6) -----------------------------------
        if forgetter_mod.should_forget(query_count):
            forg_result: ForgettingResult = forgetter_mod.run_forgetting(session_id)
            if forg_result.memories_pruned > 0:
                # Rebuild FAISS to remove pruned entries
                self._rebuild_faiss_index()
            report["forgetting"] = {
                "evaluated": forg_result.memories_evaluated,
                "decayed":   forg_result.memories_decayed,
                "pruned":    forg_result.memories_pruned,
                "skipped":   forg_result.skipped_no_data,
            }

        return report

    # -----------------------------------------------------------------------
    # FAISS Index Management
    # -----------------------------------------------------------------------

    def _load_or_create_index(self) -> faiss.Index:
        """
        Load FAISS index from disk if it exists; otherwise create a new
        HNSWFlat index with inner-product metric (= cosine sim for unit vecs).
        """
        os.makedirs(os.path.dirname(_FAISS_PATH), exist_ok=True)

        if os.path.exists(_FAISS_PATH):
            index = faiss.read_index(_FAISS_PATH)
            return index

        # Create new HNSW index
        # METRIC_INNER_PRODUCT = cosine similarity for unit-normalised vectors
        index = faiss.IndexHNSWFlat(_DIM, _HNSW_M, faiss.METRIC_INNER_PRODUCT)
        index.hnsw.efConstruction = 200   # build quality (higher = slower build, better recall)
        index.hnsw.efSearch       = 50    # search quality (higher = slower search, better recall)
        return index

    def _rebuild_faiss_index(self) -> None:
        """
        Rebuild the FAISS index from scratch using all embeddings
        currently in SQLite. Called after compression or forgetting removes entries.
        Also rebuilds _id_map to match the new index positions.
        """
        embeddings, sqlite_ids = database.get_embeddings_and_ids()

        # Create fresh index
        new_index = faiss.IndexHNSWFlat(_DIM, _HNSW_M, faiss.METRIC_INNER_PRODUCT)
        new_index.hnsw.efConstruction = 200
        new_index.hnsw.efSearch       = 50

        new_id_map: list[int] = []

        if embeddings.shape[0] > 0:
            new_index.add(embeddings.astype(np.float32))
            new_id_map = list(sqlite_ids)

            # Update faiss_id column in SQLite to match new positions
            for new_pos, sqlite_id in enumerate(sqlite_ids):
                database.update_faiss_id(sqlite_id, new_pos)

        with self._lock:
            self._index  = new_index
            self._id_map = new_id_map

    def _rebuild_id_map_from_db(self) -> None:
        """
        On startup, sync _id_map with the FAISS index loaded from disk
        by reading faiss_id → sqlite_id mappings from SQLite.
        """
        all_memories = database.get_all_memories()

        # Build a list sorted by faiss_id so positions match the index
        with_faiss = [
            m for m in all_memories
            if m.get("faiss_id") is not None
        ]
        with_faiss.sort(key=lambda m: m["faiss_id"])

        self._id_map = [m["id"] for m in with_faiss]

    def persist_faiss(self) -> None:
        """
        Write the FAISS index to disk (SRS §3.3.2).
        Called at session close and on graceful shutdown.
        """
        with self._lock:
            faiss.write_index(self._index, _FAISS_PATH)

    # -----------------------------------------------------------------------
    # Stats helpers (used by API endpoints)
    # -----------------------------------------------------------------------

    def get_memory_stats(self) -> dict:
        """Return current memory store statistics for the metrics dashboard."""
        return {
            "total_memories":  database.get_memory_count(),
            "faiss_vectors":   self._index.ntotal,
            "stm_turns":       len(self._stm),
            "staging_pending": len(self._staging),
        }
