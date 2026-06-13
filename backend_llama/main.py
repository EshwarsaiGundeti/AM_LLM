"""
main.py
=======
AM-LLM — FastAPI Application Server

Exposes the AM-LLM backend as a REST API.
All heavy lifting is done by the LangGraph agent and memory_manager.
This file wires them together with HTTP endpoints and handles
session lifecycle across multiple requests.

Endpoints:
    POST  /session/start   — Create a new session
    POST  /query           — Send a query, receive a memory-augmented response
    POST  /session/close   — Close session, flush STM, persist FAISS
    GET   /memories        — List all LTM memories (for dashboard)
    GET   /stats           — Live memory store statistics
    GET   /settings        — LLM model info (no API key exposed)
    GET   /health          — Health check

CORS is pre-configured for the React dev server (localhost:5173).
"""

from __future__ import annotations

import os
import uuid
from contextlib import asynccontextmanager
from typing import Any

import yaml
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import database
import llm
from agent import AgentState, build_graph, make_initial_state
from memory_manager import AdaptiveMemoryManager


# ---------------------------------------------------------------------------
# Config (CORS origins)
# ---------------------------------------------------------------------------

def _load_config() -> dict:
    config_path = os.path.join(os.path.dirname(__file__), "config.yaml")
    with open(config_path, "r") as f:
        return yaml.safe_load(f)

_CONFIG      = _load_config()
_CORS_ORIGINS = _CONFIG["server"]["cors_origins"]


# ---------------------------------------------------------------------------
# Application globals — initialised in lifespan
# ---------------------------------------------------------------------------

_mm:    AdaptiveMemoryManager | None = None
_graph: Any                          = None

# In-memory session tracker: {session_id → {"query_count": int, "hits": int}}
# Lightweight — no DB round-trip needed for counters between requests.
_sessions: dict[str, dict] = {}


# ---------------------------------------------------------------------------
# Lifespan — startup + graceful shutdown
# ---------------------------------------------------------------------------

@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    FastAPI lifespan context manager.
    Startup : initialise DB, load FAISS, build LangGraph.
    Shutdown: persist FAISS index to disk.
    """
    global _mm, _graph

    # Startup
    _mm    = AdaptiveMemoryManager()    # inits DB, loads or creates FAISS
    _graph = build_graph(_mm)           # compile LangGraph StateGraph

    yield   # application runs

    # Shutdown — flush FAISS to disk
    if _mm is not None:
        _mm.persist_faiss()


# ---------------------------------------------------------------------------
# FastAPI app
# ---------------------------------------------------------------------------

app = FastAPI(
    title       = "AM-LLM API",
    description = "Adaptive Memory-Augmented Language Model backend",
    version     = "1.0.0",
    lifespan    = lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins     = _CORS_ORIGINS,
    allow_credentials = True,
    allow_methods     = ["*"],
    allow_headers     = ["*"],
)


# ---------------------------------------------------------------------------
# Pydantic request / response models
# ---------------------------------------------------------------------------

class StartSessionRequest(BaseModel):
    session_id: str | None = None   # caller may supply their own UUID

class StartSessionResponse(BaseModel):
    session_id: str
    message:    str

class QueryRequest(BaseModel):
    session_id: str
    query:      str

class MemorySummary(BaseModel):
    id:               int
    text:             str
    importance_score: float
    current_score:    float
    access_count:     int
    created_at:       str
    last_accessed:    str
    similarity_score: float | None = None

class QueryResponse(BaseModel):
    session_id:        str
    query:             str
    response:          str
    memories_used:     list[MemorySummary]
    query_count:       int
    maintenance_report: dict

class CloseSessionRequest(BaseModel):
    session_id: str

class CloseSessionResponse(BaseModel):
    session_id:          str
    summary:             dict
    message:             str


# ---------------------------------------------------------------------------
# Helper — get or 404
# ---------------------------------------------------------------------------

def _require_session(session_id: str) -> dict:
    """Return session tracker dict or raise 404."""
    if session_id not in _sessions:
        raise HTTPException(
            status_code = status.HTTP_404_NOT_FOUND,
            detail      = f"Session '{session_id}' not found. Call POST /session/start first.",
        )
    return _sessions[session_id]


# ---------------------------------------------------------------------------
# Endpoints
# ---------------------------------------------------------------------------

@app.post(
    "/session/start",
    response_model = StartSessionResponse,
    status_code    = status.HTTP_201_CREATED,
    summary        = "Start a new chat session",
    tags           = ["Session"],
)
async def start_session(request: StartSessionRequest) -> StartSessionResponse:
    """
    Create a new session record in SQLite and initialise the
    in-memory query counter.

    Returns a session_id (UUID) to use in all subsequent requests.
    """
    session_id = request.session_id or str(uuid.uuid4())

    if session_id in _sessions:
        raise HTTPException(
            status_code = status.HTTP_409_CONFLICT,
            detail      = f"Session '{session_id}' already exists.",
        )

    _mm.start_session(session_id)
    _sessions[session_id] = {"query_count": 0, "hits": 0}

    return StartSessionResponse(
        session_id = session_id,
        message    = "Session started successfully.",
    )


@app.post(
    "/query",
    response_model = QueryResponse,
    summary        = "Send a query and receive a memory-augmented response",
    tags           = ["Chat"],
)
async def query(request: QueryRequest) -> QueryResponse:
    """
    Run the full 7-node LangGraph pipeline:
      1. Embed query
      2. Retrieve memories
      3. Build augmented context
      4. Generate LLM response
      5. Ingest new memories
      6. Run maintenance (compression / forgetting)
      7. Update session counters
    """
    sess = _require_session(request.session_id)

    # Build initial state and invoke the graph
    initial_state: AgentState = make_initial_state(
        query       = request.query,
        session_id  = request.session_id,
        query_count = sess["query_count"],
        hits        = sess["hits"],
    )

    try:
        final_state: AgentState = _graph.invoke(initial_state)
    except Exception as e:
        raise HTTPException(
            status_code = status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail      = f"Graph execution failed: {type(e).__name__}: {e}",
        ) from e

    # Sync updated counters back to session tracker
    sess["query_count"] = int(final_state.get("query_count", sess["query_count"] + 1))
    sess["hits"]        = int(final_state.get("hits", sess["hits"]))

    # Build memory summaries for the response (only retrieved memories)
    memories_used = [
        MemorySummary(
            id               = m["id"],
            text             = m["text"],
            importance_score = m["importance_score"],
            current_score    = m["current_score"],
            access_count     = m["access_count"],
            created_at       = m["created_at"],
            last_accessed    = m["last_accessed"],
            similarity_score = m.get("similarity_score"),
        )
        for m in final_state.get("memories", [])
    ]

    return QueryResponse(
        session_id         = request.session_id,
        query              = request.query,
        response           = final_state.get("response", ""),
        memories_used      = memories_used,
        query_count        = sess["query_count"],
        maintenance_report = final_state.get("maintenance_report", {}),
    )


@app.post(
    "/session/close",
    response_model = CloseSessionResponse,
    summary        = "Close session and flush STM to LTM",
    tags           = ["Session"],
)
async def close_session(request: CloseSessionRequest) -> CloseSessionResponse:
    """
    Flush STM through importance scoring, persist FAISS index,
    and return the final session summary (hit rate, total queries, etc.).
    """
    sess = _require_session(request.session_id)

    summary = _mm.close_session(
        session_id  = request.session_id,
        query_count = sess["query_count"],
        hits        = sess["hits"],
    )

    # Remove from in-memory tracker
    del _sessions[request.session_id]

    return CloseSessionResponse(
        session_id = request.session_id,
        summary    = summary,
        message    = "Session closed and FAISS index persisted.",
    )


@app.get(
    "/memories",
    summary = "List all LTM memories",
    tags    = ["Memory"],
)
async def list_memories() -> dict:
    """
    Return all memories in the LTM store, sorted by current_score descending.
    Used by the memory dashboard in the frontend.
    """
    memories = database.get_all_memories()

    # Strip the raw 'embedding' bytes field — it is a SQLite BLOB that
    # cannot be JSON-serialised by FastAPI and is not needed by the frontend.
    safe_memories = [
        {k: v for k, v in m.items() if k != "embedding"}
        for m in memories
    ]

    return {
        "count":    len(safe_memories),
        "memories": safe_memories,
    }


@app.get(
    "/stats",
    summary = "Get live memory store statistics",
    tags    = ["Memory"],
)
async def get_stats() -> dict:
    """
    Return real-time statistics from the memory manager and SQLite.
    Used by the metrics dashboard in the frontend.
    """
    stats = _mm.get_memory_stats()
    stats["active_sessions"] = len(_sessions)
    return stats


@app.get(
    "/settings",
    summary = "Get current LLM configuration",
    tags    = ["Settings"],
)
async def get_settings() -> dict:
    """
    Return the active LLM configuration.
    The API key is NEVER included in this response.
    """
    return llm.get_model_info()


@app.get(
    "/health",
    summary = "Health check",
    tags    = ["Health"],
)
async def health_check() -> dict:
    """
    Simple liveness probe. Returns 200 if the server is running.
    Includes FAISS vector count as a basic sanity check.
    """
    return {
        "status":       "ok",
        "faiss_vectors": _mm.get_memory_stats()["faiss_vectors"],
        "db_memories":   database.get_memory_count(),
    }
