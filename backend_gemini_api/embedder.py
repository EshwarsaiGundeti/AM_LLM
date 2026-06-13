"""
embedder.py
===========
AM-LLM — Embedding & Text Preprocessing Module

Responsibilities (from SRS §3.1.2 and §6.3):
  - Sentence segmentation using NLTK (split dialogue turns into memory candidates)
  - Dense vector encoding using Sentence-BERT (all-MiniLM-L6-v2) → 384-dim embeddings
  - Unit-length normalisation of all vectors for cosine similarity computation
  - Cosine similarity helper used by scorer, compressor, and forgetter

The model is loaded once at module level (singleton) to avoid reloading on
every request — loading takes ~2s the first time, then stays in memory.
"""

from __future__ import annotations

import os
import numpy as np
import nltk
import yaml
from sentence_transformers import SentenceTransformer


# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------

def _load_config() -> dict:
    config_path = os.path.join(os.path.dirname(__file__), "config.yaml")
    with open(config_path, "r") as f:
        return yaml.safe_load(f)


CONFIG = _load_config()
_EMB_CFG = CONFIG["embedding"]

# ---------------------------------------------------------------------------
# NLTK setup — download punkt tokenizer if not already present
# ---------------------------------------------------------------------------

def _ensure_nltk_data() -> None:
    """
    Download NLTK sentence tokenizer data silently if missing.
    Handles both old name 'punkt' (NLTK 3.8.x) and new name
    'punkt_tab' (NLTK 3.9+) so the project works with nltk>=3.8.
    """
    for resource, package in [
        ("tokenizers/punkt_tab", "punkt_tab"),
        ("tokenizers/punkt",     "punkt"),
    ]:
        try:
            nltk.data.find(resource)
            break                          # found one — no download needed
        except LookupError:
            try:
                nltk.download(package, quiet=True)
                break                      # download succeeded
            except Exception:
                continue                  # try the other name

_ensure_nltk_data()

# ---------------------------------------------------------------------------
# Model singleton — loaded once, reused for every request
# ---------------------------------------------------------------------------

_MODEL: SentenceTransformer | None = None


def _get_model() -> SentenceTransformer:
    """
    Return the SentenceTransformer model, loading it on first call.
    Uses a module-level singleton so the model is only loaded once.
    """
    global _MODEL
    if _MODEL is None:
        _MODEL = SentenceTransformer(_EMB_CFG["model_name"])
    return _MODEL


# ---------------------------------------------------------------------------
# Public API
# ---------------------------------------------------------------------------

def encode(text: str) -> np.ndarray:
    """
    Encode a single text string into a unit-normalised 384-dim float32 vector.

    Args:
        text: Any natural language string.

    Returns:
        numpy float32 array of shape (384,), unit-normalised.
    """
    model = _get_model()
    vector = model.encode(text, convert_to_numpy=True, show_progress_bar=False)
    return _normalise(vector)


def encode_batch(texts: list[str]) -> np.ndarray:
    """
    Encode a list of texts in one efficient batch call.

    Args:
        texts: List of natural language strings.

    Returns:
        numpy float32 array of shape (N, 384), each row unit-normalised.
    """
    if not texts:
        return np.empty((0, _EMB_CFG["dimension"]), dtype=np.float32)

    # Filter out empty or whitespace-only strings — SentenceTransformer
    # raises an error if it receives an empty string
    texts = [t for t in texts if t and t.strip()]
    if not texts:
        return np.empty((0, _EMB_CFG["dimension"]), dtype=np.float32)

    model = _get_model()
    vectors = model.encode(
        texts,
        convert_to_numpy=True,
        show_progress_bar=False,
        batch_size=32,
    )
    # Normalise every row
    return np.array([_normalise(v) for v in vectors], dtype=np.float32)


def segment_into_sentences(text: str) -> list[str]:
    """
    Split a text block into individual sentences using NLTK sent_tokenize.
    Each sentence becomes a candidate memory fragment (SRS §6.3).

    Args:
        text: A paragraph or dialogue turn.

    Returns:
        List of non-empty sentence strings.
    """
    sentences = nltk.sent_tokenize(text.strip())
    # Filter out very short fragments (< 5 words) — not useful as memories
    return [s for s in sentences if len(s.split()) >= 5]


def cosine_similarity(vec_a: np.ndarray, vec_b: np.ndarray) -> float:
    """
    Compute cosine similarity between two unit-normalised vectors.

    Since both vectors are already unit-normalised (L2 norm = 1),
    cosine similarity reduces to a simple dot product — O(384) operation.

    Args:
        vec_a: Unit-normalised float32 array of shape (384,).
        vec_b: Unit-normalised float32 array of shape (384,).

    Returns:
        Float in range [-1.0, 1.0]. Higher = more similar.
    """
    return float(np.dot(vec_a, vec_b))


def cosine_similarity_matrix(query_vec: np.ndarray, matrix: np.ndarray) -> np.ndarray:
    """
    Compute cosine similarity between one query vector and a matrix of vectors.

    Args:
        query_vec : Unit-normalised float32 array of shape (384,).
        matrix    : Unit-normalised float32 array of shape (N, 384).

    Returns:
        float32 array of shape (N,) with similarity scores.
    """
    if matrix.shape[0] == 0:
        return np.array([], dtype=np.float32)
    return matrix @ query_vec  # dot product = cosine sim for unit vectors


def get_embedding_dimension() -> int:
    """Return the configured embedding dimension (384 for all-MiniLM-L6-v2)."""
    return int(_EMB_CFG["dimension"])


# ---------------------------------------------------------------------------
# Internal helpers
# ---------------------------------------------------------------------------

def _normalise(vec: np.ndarray) -> np.ndarray:
    """
    Normalise a vector to unit L2 length.
    If the vector is all zeros (degenerate case), return it unchanged.
    """
    vec = vec.astype(np.float32)
    norm = np.linalg.norm(vec)
    if norm == 0.0:
        return vec
    return vec / norm
