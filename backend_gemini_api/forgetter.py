"""
forgetter.py
============
AM-LLM — Time-Aware Forgetting Module

Implements SRS §3.1.6:
  "The system shall maintain a relevance decay score for each memory entry,
   reducing it over time as a function of elapsed time since last access."
  "The system shall periodically evaluate all memory entries against a
   minimum relevance threshold."
  "The system shall remove memory entries whose relevance score falls below
   the threshold, logging each deletion."

Decay formula (SRS §6.4):
    S_new = S_old × e^(-λ × Δt)

Where:
    λ    = decay_rate   (config.yaml → forgetting.decay_rate, default 0.01)
    Δt   = hours elapsed since last_accessed
    threshold = min_relevance (config.yaml → forgetting.min_relevance, default 0.10)

Design:
    forgetter.py applies decay to ALL memories in SQLite and prunes entries
    below the threshold. Deleted IDs are returned in ForgettingResult so
    memory_manager.py can rebuild the FAISS index.
"""

from __future__ import annotations

import math
import os
from dataclasses import dataclass, field
from datetime import datetime, timezone

import yaml

import database


# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------

def _load_config() -> dict:
    config_path = os.path.join(os.path.dirname(__file__), "config.yaml")
    with open(config_path, "r") as f:
        return yaml.safe_load(f)


CONFIG  = _load_config()
_FORG   = CONFIG["forgetting"]

DECAY_RATE           = float(_FORG["decay_rate"])       # λ in decay formula
MIN_RELEVANCE        = float(_FORG["min_relevance"])    # prune if score < this
FORGETTING_INTERVAL  = int(_FORG["interval"])           # run every N queries


# ---------------------------------------------------------------------------
# Result dataclass
# ---------------------------------------------------------------------------

@dataclass
class ForgettingResult:
    """
    Returned by run_forgetting() so memory_manager knows what
    was deleted and can remove those entries from the FAISS index.
    """
    memories_evaluated: int       = 0
    memories_decayed:   int       = 0    # score updated but still above threshold
    memories_pruned:    int       = 0    # score fell below threshold → deleted
    deleted_ids:        list[int] = field(default_factory=list)
    skipped_no_data:    bool      = False


# ---------------------------------------------------------------------------
# Public API
# ---------------------------------------------------------------------------

def run_forgetting(session_id: str) -> ForgettingResult:
    """
    Full forgetting cycle (SRS §3.1.6):

      1. Load all memory rows from SQLite.
      2. For each memory:
           a. Compute Δt (hours since last_accessed).
           b. Apply decay: S_new = S_old × e^(-λ × Δt).
           c. Update current_score in SQLite.
           d. If S_new < MIN_RELEVANCE → log deletion + delete row.
      3. Update session forgotten counter.
      4. Return ForgettingResult for memory_manager to update FAISS.

    Args:
        session_id: Active session UUID for stats tracking.

    Returns:
        ForgettingResult with counts and list of deleted SQLite IDs.
    """
    result = ForgettingResult()

    # -- Load all memories ---------------------------------------------------
    memories = database.get_all_memories()
    result.memories_evaluated = len(memories)

    if not memories:
        result.skipped_no_data = True
        return result

    deleted_ids:    list[int] = []
    to_update:      list[tuple[int, float]] = []   # (memory_id, new_score)
    to_delete:      list[tuple[int, str, float]] = []  # (memory_id, text, new_score)

    # -- First pass: compute new scores, classify each memory ----------------
    # We separate computation from DB writes so that deletes during the loop
    # do not interfere with reads (even though WAL mode reduces this risk).
    for memory in memories:
        memory_id   = int(memory["id"])
        old_score   = float(memory["current_score"])
        last_access = memory["last_accessed"]
        text        = memory["text"]

        delta_hours = _hours_since(last_access)
        new_score   = _decay(old_score, delta_hours)

        if new_score < MIN_RELEVANCE:
            to_delete.append((memory_id, text, new_score))
        else:
            to_update.append((memory_id, new_score))

    # -- Second pass: apply updates first, then deletions --------------------
    for memory_id, new_score in to_update:
        database.update_memory_score(memory_id, new_score)
        result.memories_decayed += 1

    for memory_id, text, new_score in to_delete:
        # Log deletion before removing (SRS §3.1.6 requires logging)
        database.log_forgotten_memory(
            memory_id  = memory_id,
            text       = text,
            last_score = new_score,
            reason     = "decay_below_threshold",
        )
        database.delete_memory(memory_id)
        deleted_ids.append(memory_id)
        result.memories_pruned += 1

    # -- Update session stats ------------------------------------------------
    if deleted_ids:
        database.increment_session_forgotten(session_id, len(deleted_ids))

    result.deleted_ids = deleted_ids
    return result


def decay_score(current_score: float, last_accessed_str: str) -> float:
    """
    Compute the decayed score for a single memory without writing to DB.
    Useful for previewing decay in the API or frontend without side effects.

    Args:
        current_score     : The memory's current_score from SQLite.
        last_accessed_str : SQLite TEXT datetime string 'YYYY-MM-DD HH:MM:SS' (UTC).

    Returns:
        Decayed score as a float, clipped to [0.0, 1.0].
    """
    delta_hours = _hours_since(last_accessed_str)
    return _decay(current_score, delta_hours)


def should_forget(query_count: int) -> bool:
    """
    Return True if it is time to run a forgetting cycle.
    Triggered every FORGETTING_INTERVAL queries (from config.yaml).
    """
    return query_count > 0 and (query_count % FORGETTING_INTERVAL == 0)


# ---------------------------------------------------------------------------
# Internal helpers
# ---------------------------------------------------------------------------

def _decay(score: float, delta_hours: float) -> float:
    """
    Apply exponential time decay: S_new = S_old × e^(-λ × Δt)

    Args:
        score       : Current relevance score (0.0 – 1.0).
        delta_hours : Hours elapsed since last access.

    Returns:
        New decayed score, rounded to 6 decimal places, clipped to [0.0, 1.0].
    """
    if delta_hours <= 0.0:
        return score  # No time elapsed — score unchanged

    new_score = score * math.exp(-DECAY_RATE * delta_hours)
    # Clip to valid range and round to avoid floating-point noise
    return round(max(0.0, min(1.0, new_score)), 6)


def _hours_since(datetime_str: str) -> float:
    """
    Compute hours elapsed since a SQLite datetime string.

    SQLite stores datetimes as TEXT in the format 'YYYY-MM-DD HH:MM:SS'
    (produced by datetime('now') in UTC).

    Args:
        datetime_str: SQLite TEXT datetime, e.g. '2025-05-28 10:45:00'.

    Returns:
        Float number of hours elapsed. Returns 0.0 if parsing fails.
    """
    if not datetime_str:
        return 0.0

    try:
        # SQLite datetime('now') returns UTC without timezone info
        past = datetime.strptime(datetime_str, "%Y-%m-%d %H:%M:%S")
        past = past.replace(tzinfo=timezone.utc)
        now  = datetime.now(tz=timezone.utc)
        delta_seconds = (now - past).total_seconds()
        return max(0.0, delta_seconds / 3600.0)
    except (ValueError, TypeError):
        return 0.0
