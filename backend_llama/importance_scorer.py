"""
importance_scorer.py
====================
AM-LLM — Memory Importance Scoring Module

Implements SRS §3.1.3:
  "The system shall compute an importance score for each candidate memory
   based on three weighted criteria: contextual relevance, reference
   frequency, and novelty relative to existing stored memories."

Formula (from SRS §6.4):
    Score = α × Relevance + β × Frequency + γ × Novelty

Where:
    Relevance = cosine_sim(candidate_vec, query_vec)
                How closely the candidate relates to the current query.

    Frequency = normalised access count of the most similar existing memory.
                If similar memories are frequently accessed, this candidate
                is likely on a familiar topic — worth keeping.

    Novelty   = 1 - max_cosine_sim(candidate_vec, all_LTM_vectors)
                How different the candidate is from what we already know.
                High novelty = new information = higher priority to store.

All weights (α, β, γ) and the promotion threshold are read from config.yaml.
"""

from __future__ import annotations

import os
import yaml
import numpy as np

import embedder
import database


# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------

def _load_config() -> dict:
    config_path = os.path.join(os.path.dirname(__file__), "config.yaml")
    with open(config_path, "r") as f:
        return yaml.safe_load(f)


CONFIG  = _load_config()
_IMP    = CONFIG["importance"]

ALPHA            = float(_IMP["alpha"])            # weight: relevance
BETA             = float(_IMP["beta"])             # weight: frequency
GAMMA            = float(_IMP["gamma"])            # weight: novelty
THRESHOLD        = float(_IMP["threshold"])        # min score to enter LTM
DEDUP_THRESHOLD  = float(_IMP["dedup_threshold"])  # cosine sim above this = near-duplicate

# Validate weights sum to 1.0 at module load time
# If misconfigured in config.yaml, warn immediately rather than silently
# producing wrong scores during a live session.
_weight_sum = round(ALPHA + BETA + GAMMA, 6)
if abs(_weight_sum - 1.0) > 1e-4:
    import warnings
    warnings.warn(
        f"[importance_scorer] α+β+γ = {_weight_sum:.4f} ≠ 1.0. "
        f"Check config.yaml importance weights. Scores may exceed [0,1] before clipping.",
        UserWarning,
        stacklevel=2,
    )


# ---------------------------------------------------------------------------
# Public API
# ---------------------------------------------------------------------------

def score_candidate(
    candidate_text: str,
    candidate_vec:  np.ndarray,
    query_vec:      np.ndarray,
    session_id:     str,
) -> tuple[float, str]:
    """
    Compute the importance score for a candidate memory fragment and decide
    whether to promote it to Long-Term Memory.

    Steps:
      1. Check for near-duplicate — skip if too similar to existing LTM.
      2. Compute Relevance, Frequency, Novelty from existing LTM state.
      3. Combine with weighted formula.
      4. Compare against threshold.
      5. Log decision to evaluation_log.csv.

    Args:
        candidate_text : Raw text of the memory candidate.
        candidate_vec  : Unit-normalised 384-dim embedding of the candidate.
        query_vec      : Unit-normalised 384-dim embedding of the current query.
        session_id     : Active session UUID (for logging).

    Returns:
        (score, decision) where decision is "stored" or "rejected".
    """
    # -- Step 1: Load all existing LTM embeddings ----------------------------
    ltm_embeddings, ltm_ids = database.get_embeddings_and_ids()
    has_ltm = ltm_embeddings.shape[0] > 0

    # -- Step 2: Near-duplicate check ----------------------------------------
    # SRS §3.1.4: "avoid storing near-duplicate memories by checking
    # cosine similarity before writing"
    if has_ltm:
        similarities = embedder.cosine_similarity_matrix(candidate_vec, ltm_embeddings)
        max_sim = float(np.max(similarities))
        if max_sim >= DEDUP_THRESHOLD:
            score = _combine(
                relevance=_compute_relevance(candidate_vec, query_vec),
                frequency=0.0,   # near-duplicate: don't reward frequency
                novelty=0.0,     # near-duplicate: zero novelty
            )
            database.log_importance_decision(session_id, candidate_text, score, "rejected_duplicate")
            return score, "rejected_duplicate"
    else:
        similarities = np.array([], dtype=np.float32)
        max_sim      = 0.0

    # -- Step 3: Compute the three components --------------------------------
    relevance = _compute_relevance(candidate_vec, query_vec)
    frequency = _compute_frequency(similarities, ltm_ids) if has_ltm else 0.0
    novelty   = _compute_novelty(max_sim)

    # -- Step 4: Weighted combination ----------------------------------------
    score = _combine(relevance, frequency, novelty)

    # -- Step 5: Threshold decision ------------------------------------------
    if score >= THRESHOLD:
        decision = "stored"
    else:
        decision = "rejected"

    # -- Step 6: Log to CSV (SRS §3.1.3) -------------------------------------
    database.log_importance_decision(session_id, candidate_text, score, decision)

    return score, decision


def is_above_threshold(score: float) -> bool:
    """Return True if the score qualifies the candidate for LTM storage."""
    return score >= THRESHOLD


# ---------------------------------------------------------------------------
# Component calculators
# ---------------------------------------------------------------------------

def _compute_relevance(candidate_vec: np.ndarray, query_vec: np.ndarray) -> float:
    """
    Relevance = cosine_sim(candidate, query).
    Measures how directly the candidate relates to the current conversation.
    Clipped to [0, 1] — negative similarity is treated as zero relevance.
    """
    raw = embedder.cosine_similarity(candidate_vec, query_vec)
    return float(np.clip(raw, 0.0, 1.0))


def _compute_frequency(
    similarities: np.ndarray,
    ltm_ids:      list[int],
) -> float:
    """
    Frequency = normalised access_count of the most similar existing memory.

    Logic:
      - Find the most similar existing memory.
      - Look up its access_count from SQLite.
      - Normalise by a soft cap of 20 accesses so the score stays in [0, 1].

    If no similar memory exists, frequency = 0.
    """
    if similarities.size == 0:
        return 0.0

    best_idx   = int(np.argmax(similarities))
    best_id    = ltm_ids[best_idx]
    memory_row = database.get_memory_by_id(best_id)

    if memory_row is None:
        return 0.0

    access_count = int(memory_row.get("access_count", 0))
    # Soft cap: read from config so it stays consistent with everything else.
    # Default 20 means 20+ accesses gives frequency score of 1.0.
    freq_cap = float(CONFIG.get("retrieval", {}).get("frequency_cap", 20))
    return float(min(access_count / freq_cap, 1.0))


def _compute_novelty(max_similarity: float) -> float:
    """
    Novelty = 1 - max_cosine_sim(candidate, all_LTM_vectors).
    Measures how different the candidate is from what is already stored.
    High novelty = new information = more valuable to store.
    Clipped to [0, 1].
    """
    return float(np.clip(1.0 - max_similarity, 0.0, 1.0))


def _combine(relevance: float, frequency: float, novelty: float) -> float:
    """
    Weighted linear combination per SRS §3.1.3 and §6.4:
        Score = α × Relevance + β × Frequency + γ × Novelty

    Result is rounded to 4 decimal places and clipped to [0, 1].
    """
    score = (ALPHA * relevance) + (BETA * frequency) + (GAMMA * novelty)
    return float(round(np.clip(score, 0.0, 1.0), 4))
