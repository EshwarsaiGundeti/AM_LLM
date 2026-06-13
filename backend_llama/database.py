"""
database.py
===========
AM-LLM — SQLite Database Layer

Handles all persistent storage operations:
  - Memory entries (text, embeddings, scores, metadata)
  - Session records
  - Importance scoring log (CSV)
  - Forgetting log (CSV)

All table schemas and file paths are driven by config.yaml.
"""

import sqlite3
import csv
import os
import numpy as np
from datetime import datetime
from typing import Optional
import yaml


# ---------------------------------------------------------------------------
# Config loader
# ---------------------------------------------------------------------------

def _load_config() -> dict:
    """Load config.yaml from the same directory as this file."""
    config_path = os.path.join(os.path.dirname(__file__), "config.yaml")
    with open(config_path, "r") as f:
        return yaml.safe_load(f)


CONFIG = _load_config()
_PATHS = CONFIG["paths"]

DB_PATH         = os.path.join(os.path.dirname(__file__), _PATHS["sqlite_db"])
EVAL_LOG_PATH   = os.path.join(os.path.dirname(__file__), _PATHS["eval_log"])
FORGET_LOG_PATH = os.path.join(os.path.dirname(__file__), _PATHS["forgetting_log"])


# ---------------------------------------------------------------------------
# Database initialisation
# ---------------------------------------------------------------------------

def init_db() -> None:
    """
    Create all tables and CSV log files if they do not already exist.
    Safe to call multiple times (idempotent).
    """
    # Ensure data directory exists
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)

    conn = _get_connection()
    cursor = conn.cursor()

    # -- memories table ------------------------------------------------------
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS memories (
            id              INTEGER PRIMARY KEY AUTOINCREMENT,
            faiss_id        INTEGER,                        -- row position in FAISS index
            text            TEXT    NOT NULL,               -- original text fragment
            embedding       BLOB    NOT NULL,               -- numpy array as bytes
            importance_score REAL   NOT NULL,               -- score at ingestion time
            current_score   REAL    NOT NULL,               -- decayed score (updated over time)
            created_at      TEXT    DEFAULT (datetime('now')),
            last_accessed   TEXT    DEFAULT (datetime('now')),
            access_count    INTEGER DEFAULT 0,
            session_id      TEXT
        )
    """)

    # -- sessions table -------------------------------------------------------
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS sessions (
            id                   TEXT PRIMARY KEY,          -- UUID
            created_at           TEXT DEFAULT (datetime('now')),
            closed_at            TEXT,
            total_queries        INTEGER DEFAULT 0,
            memories_stored      INTEGER DEFAULT 0,
            memories_compressed  INTEGER DEFAULT 0,
            memories_forgotten   INTEGER DEFAULT 0,
            memory_hit_rate      REAL    DEFAULT 0.0
        )
    """)

    conn.commit()
    conn.close()

    # -- CSV log files --------------------------------------------------------
    _init_csv(EVAL_LOG_PATH, [
        "timestamp", "session_id", "text_snippet",
        "importance_score", "decision"
    ])
    _init_csv(FORGET_LOG_PATH, [
        "timestamp", "memory_id", "text_snippet",
        "last_score", "reason"
    ])


def _get_connection() -> sqlite3.Connection:
    """Return a SQLite connection with row_factory set for dict-like access."""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    # WAL mode allows concurrent reads while FastAPI handles multiple requests
    conn.execute("PRAGMA journal_mode=WAL")
    return conn


def _init_csv(path: str, headers: list[str]) -> None:
    """Create a CSV file with headers if it does not already exist."""
    if not os.path.exists(path):
        os.makedirs(os.path.dirname(path), exist_ok=True)
        with open(path, "w", newline="", encoding="utf-8") as f:
            writer = csv.DictWriter(f, fieldnames=headers)
            writer.writeheader()


# ---------------------------------------------------------------------------
# Memory CRUD
# ---------------------------------------------------------------------------

def insert_memory(
    text: str,
    embedding: np.ndarray,
    importance_score: float,
    session_id: str,
    faiss_id: Optional[int] = None,
) -> int:
    """
    Insert a new memory entry and return its auto-incremented id.

    Args:
        text            : Original text fragment.
        embedding       : 384-dim numpy float32 array.
        importance_score: Score computed by importance_scorer.
        session_id      : Active session UUID.
        faiss_id        : Row index in the FAISS index (set after FAISS write).

    Returns:
        The new row id in the memories table.
    """
    conn = _get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO memories
            (faiss_id, text, embedding, importance_score, current_score, session_id)
        VALUES (?, ?, ?, ?, ?, ?)
    """, (
        faiss_id,
        text,
        _ndarray_to_blob(embedding),
        importance_score,
        importance_score,       # current_score starts equal to importance_score
        session_id,
    ))
    new_id = cursor.lastrowid
    conn.commit()
    conn.close()
    return new_id


def get_all_memories() -> list[dict]:
    """Return all memory entries as a list of dicts."""
    conn = _get_connection()
    rows = conn.execute("SELECT * FROM memories ORDER BY current_score DESC").fetchall()
    conn.close()
    return [dict(r) for r in rows]


def get_memory_by_id(memory_id: int) -> Optional[dict]:
    """Return a single memory entry by its primary key."""
    conn = _get_connection()
    row = conn.execute("SELECT * FROM memories WHERE id = ?", (memory_id,)).fetchone()
    conn.close()
    return dict(row) if row else None


def update_memory_score(memory_id: int, new_score: float) -> None:
    """Update the decayed current_score for a memory entry."""
    conn = _get_connection()
    conn.execute(
        "UPDATE memories SET current_score = ? WHERE id = ?",
        (new_score, memory_id)
    )
    conn.commit()
    conn.close()


def update_memory_access(memory_id: int) -> None:
    """
    Increment access_count and set last_accessed to now.
    Called whenever a memory is used in a response.
    """
    conn = _get_connection()
    conn.execute("""
        UPDATE memories
        SET access_count  = access_count + 1,
            last_accessed = datetime('now')
        WHERE id = ?
    """, (memory_id,))
    conn.commit()
    conn.close()


def update_faiss_id(memory_id: int, faiss_id: int) -> None:
    """Set the FAISS index row position for a memory entry after it is written."""
    conn = _get_connection()
    conn.execute(
        "UPDATE memories SET faiss_id = ? WHERE id = ?",
        (faiss_id, memory_id)
    )
    conn.commit()
    conn.close()


def delete_memory(memory_id: int) -> None:
    """Permanently delete a memory entry (called by forgetter after decay)."""
    conn = _get_connection()
    conn.execute("DELETE FROM memories WHERE id = ?", (memory_id,))
    conn.commit()
    conn.close()


def delete_memories_batch(memory_ids: list[int]) -> None:
    """Delete multiple memory entries in one transaction (used by compressor)."""
    if not memory_ids:
        return
    placeholders = ",".join("?" * len(memory_ids))
    conn = _get_connection()
    # sqlite3 requires a tuple or list — convert explicitly
    conn.execute(f"DELETE FROM memories WHERE id IN ({placeholders})", tuple(memory_ids))
    conn.commit()
    conn.close()


def get_memory_count() -> int:
    """Return total number of active memories in the store."""
    conn = _get_connection()
    count = conn.execute("SELECT COUNT(*) FROM memories").fetchone()[0]
    conn.close()
    return count


def get_embeddings_and_ids() -> tuple[np.ndarray, list[int]]:
    """
    Load all embeddings and their row ids for clustering or FAISS rebuild.

    Returns:
        embeddings : numpy array of shape (N, 384)
        ids        : list of memory table primary keys
    """
    conn = _get_connection()
    rows = conn.execute("SELECT id, embedding FROM memories").fetchall()
    conn.close()

    if not rows:
        return np.empty((0, CONFIG["embedding"]["dimension"]), dtype=np.float32), []

    ids = [r["id"] for r in rows]
    embeddings = np.stack([_blob_to_ndarray(r["embedding"]) for r in rows])
    return embeddings.astype(np.float32), ids


# ---------------------------------------------------------------------------
# Session Management
# ---------------------------------------------------------------------------

def create_session(session_id: str) -> None:
    """Insert a new session record."""
    conn = _get_connection()
    conn.execute(
        "INSERT OR IGNORE INTO sessions (id) VALUES (?)",
        (session_id,)
    )
    conn.commit()
    conn.close()


def get_session(session_id: str) -> Optional[dict]:
    """Return a session record by its UUID."""
    conn = _get_connection()
    row = conn.execute(
        "SELECT * FROM sessions WHERE id = ?", (session_id,)
    ).fetchone()
    conn.close()
    return dict(row) if row else None


def increment_session_queries(session_id: str) -> None:
    """Increment the query counter for a session."""
    conn = _get_connection()
    conn.execute(
        "UPDATE sessions SET total_queries = total_queries + 1 WHERE id = ?",
        (session_id,)
    )
    conn.commit()
    conn.close()


def increment_session_stored(session_id: str) -> None:
    """Increment memories_stored counter for a session."""
    conn = _get_connection()
    conn.execute(
        "UPDATE sessions SET memories_stored = memories_stored + 1 WHERE id = ?",
        (session_id,)
    )
    conn.commit()
    conn.close()


def increment_session_compressed(session_id: str, count: int) -> None:
    """Add count to memories_compressed for a session."""
    conn = _get_connection()
    conn.execute(
        "UPDATE sessions SET memories_compressed = memories_compressed + ? WHERE id = ?",
        (count, session_id)
    )
    conn.commit()
    conn.close()


def increment_session_forgotten(session_id: str, count: int) -> None:
    """Add count to memories_forgotten for a session."""
    conn = _get_connection()
    conn.execute(
        "UPDATE sessions SET memories_forgotten = memories_forgotten + ? WHERE id = ?",
        (count, session_id)
    )
    conn.commit()
    conn.close()


def close_session(session_id: str, hit_rate: float) -> dict:
    """
    Mark a session as closed and record its final hit rate.

    Returns the full session summary dict.
    """
    conn = _get_connection()
    conn.execute("""
        UPDATE sessions
        SET closed_at       = datetime('now'),
            memory_hit_rate = ?
        WHERE id = ?
    """, (hit_rate, session_id))
    conn.commit()
    row = conn.execute(
        "SELECT * FROM sessions WHERE id = ?", (session_id,)
    ).fetchone()
    conn.close()
    return dict(row) if row else {}


# ---------------------------------------------------------------------------
# CSV Logging
# ---------------------------------------------------------------------------

def log_importance_decision(
    session_id: str,
    text: str,
    score: float,
    decision: str        # "stored" | "rejected"
) -> None:
    """Append one row to evaluation_log.csv (SRS §3.1.3)."""
    with open(EVAL_LOG_PATH, "a", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=[
            "timestamp", "session_id", "text_snippet",
            "importance_score", "decision"
        ])
        writer.writerow({
            "timestamp":       datetime.utcnow().isoformat(),
            "session_id":      session_id,
            "text_snippet":    text[:120],          # truncate for readability
            "importance_score": round(score, 4),
            "decision":        decision,
        })


def log_forgotten_memory(
    memory_id: int,
    text: str,
    last_score: float,
    reason: str = "decay_below_threshold"
) -> None:
    """Append one row to forgetting_log.csv (SRS §3.1.6)."""
    with open(FORGET_LOG_PATH, "a", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=[
            "timestamp", "memory_id", "text_snippet",
            "last_score", "reason"
        ])
        writer.writerow({
            "timestamp":    datetime.utcnow().isoformat(),
            "memory_id":    memory_id,
            "text_snippet": text[:120],
            "last_score":   round(last_score, 4),
            "reason":       reason,
        })


# ---------------------------------------------------------------------------
# Embedding serialisation helpers
# ---------------------------------------------------------------------------

def _ndarray_to_blob(arr: np.ndarray) -> bytes:
    """Convert a numpy float32 array to raw bytes for SQLite BLOB storage."""
    return arr.astype(np.float32).tobytes()


def _blob_to_ndarray(blob: bytes) -> np.ndarray:
    """Restore a numpy float32 array from a SQLite BLOB."""
    return np.frombuffer(blob, dtype=np.float32)
