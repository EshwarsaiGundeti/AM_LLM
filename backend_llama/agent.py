"""
agent.py
========
AM-LLM — LangGraph Orchestration Agent

Implements the full query pipeline as a LangGraph StateGraph with 7 nodes
(SRS §3.1 and §6.2 — System Architecture):

  START
    │
    ▼
  [1] receive_input    — embed query, add to STM
    │
    ▼
  [2] retrieve_memories — FAISS top-k search against LTM
    │
    ▼
  [3] build_context    — merge STM + memories → augmented context string
    │
    ▼
  [4] generate_response — ChatGPT via LangChain
    │
    ▼
  [5] ingest_memories  — score + store memory candidates from the exchange
    │
    ▼
  [6] run_maintenance  — trigger compression / forgetting on schedule
    │
    ▼
  [7] update_session   — increment counters, add assistant reply to STM
    │
    ▼
  END

Usage:
    graph = build_graph(memory_manager_instance)
    result = graph.invoke(initial_state)

The graph is built via build_graph() which closes over the
AdaptiveMemoryManager instance, making it accessible to all nodes
without passing it through the state (which would break serialisation).
"""

from __future__ import annotations

from typing import Any, TypedDict

import numpy as np
from langgraph.graph import END, START, StateGraph

import database
import embedder
import llm
from memory_manager import AdaptiveMemoryManager


# ---------------------------------------------------------------------------
# Agent State
# ---------------------------------------------------------------------------

class AgentState(TypedDict, total=False):
    """
    Shared state passed between all LangGraph nodes.

    total=False means all keys are optional so nodes only need to return
    the keys they update — LangGraph merges them into the full state.

    Notes:
        query_vec is stored as list[float] (not np.ndarray) because
        LangGraph state must be serialisable. Each node converts back
        to np.ndarray when needed.
    """
    session_id:         str          # UUID of the current session
    query:              str          # Raw user query string
    query_count:        int          # Total queries in this session so far
    hits:               int          # Queries where ≥1 memory was retrieved
    query_vec:          list         # Unit-normalised query embedding as list
    memories:           list         # Retrieved LTM memory dicts
    augmented_context:  str          # STM + memories + query prompt string
    response:           str          # LLM generated response
    ingestion_actions:  list         # Dicts from memory ingestion step
    maintenance_report: dict         # Report from compression/forgetting


# ---------------------------------------------------------------------------
# Graph factory
# ---------------------------------------------------------------------------

def build_graph(mm: AdaptiveMemoryManager) -> Any:
    """
    Build and compile the LangGraph StateGraph, closing over the
    AdaptiveMemoryManager instance so all nodes share the same state.

    Args:
        mm: Initialised AdaptiveMemoryManager instance.

    Returns:
        A compiled LangGraph graph ready to call .invoke() on.
    """

    # -----------------------------------------------------------------------
    # Node 1 — receive_input
    # -----------------------------------------------------------------------

    def receive_input(state: AgentState) -> dict:
        """
        Embed the user query and add it to STM.
        Returns query_vec (as list) for downstream nodes.
        """
        query = state["query"]

        # Encode query → unit-normalised 384-dim vector
        vec   = embedder.encode(query)

        # Add user turn to Short-Term Memory buffer
        mm.add_to_stm("user", query)

        return {
            "query_vec": vec.tolist(),   # store as list for state serialisation
        }

    # -----------------------------------------------------------------------
    # Node 2 — retrieve_memories
    # -----------------------------------------------------------------------

    def retrieve_memories(state: AgentState) -> dict:
        """
        Search FAISS for memories relevant to the query.
        Updates hit counter if at least one memory is found.
        """
        query_vec = np.array(state["query_vec"], dtype=np.float32)
        memories  = mm.retrieve_memories(query_vec)

        current_hits = int(state.get("hits", 0))
        if memories:
            current_hits += 1

        return {
            "memories": memories,
            "hits":     current_hits,
        }

    # -----------------------------------------------------------------------
    # Node 3 — build_context
    # -----------------------------------------------------------------------

    def build_context(state: AgentState) -> dict:
        """
        Merge retrieved memories + STM turns + current query into
        a single augmented context string for the LLM.
        """
        context = mm.build_augmented_context(
            query    = state["query"],
            memories = state.get("memories", []),
        )
        return {"augmented_context": context}

    # -----------------------------------------------------------------------
    # Node 4 — generate_response
    # -----------------------------------------------------------------------

    def generate_response(state: AgentState) -> dict:
        """
        Call the LLM with the augmented context and return its response.
        """
        response = llm.generate_response(state["augmented_context"])
        return {"response": response}

    # -----------------------------------------------------------------------
    # Node 5 — ingest_memories
    # -----------------------------------------------------------------------

    def ingest_memories(state: AgentState) -> dict:
        """
        Run the memory ingestion pipeline on both the user query and
        the assistant response.

        Both are scored against the query vector so relevance is computed
        relative to the user's intent, not self-relevance.
        """
        query_vec   = np.array(state["query_vec"], dtype=np.float32)
        session_id  = state["session_id"]
        response    = state.get("response", "")
        actions: list[dict] = []

        # Ingest user query as memory candidate
        actions += mm.ingest_from_text(
            text       = state["query"],
            query_vec  = query_vec,
            session_id = session_id,
        )

        # Only ingest the response if it is a real LLM reply,
        # not an error string generated by llm.py's fallback handler.
        _error_prefixes = ("[LLM Error]", "[Configuration Error]", "[MOCK RESPONSE]")
        if response and not any(response.startswith(p) for p in _error_prefixes):
            actions += mm.ingest_from_text(
                text       = response,
                query_vec  = query_vec,
                session_id = session_id,
            )

        return {"ingestion_actions": actions}

    # -----------------------------------------------------------------------
    # Node 6 — run_maintenance
    # -----------------------------------------------------------------------

    def run_maintenance(state: AgentState) -> dict:
        """
        Check intervals and trigger compression / forgetting if due.
        FAISS index is rebuilt inside memory_manager if needed.
        """
        report = mm.run_maintenance(
            session_id  = state["session_id"],
            query_count = state.get("query_count", 0),
        )
        return {"maintenance_report": report}

    # -----------------------------------------------------------------------
    # Node 7 — update_session
    # -----------------------------------------------------------------------

    def update_session(state: AgentState) -> dict:
        """
        Increment query counter, add assistant reply to STM,
        and update session query count in SQLite.
        """
        # Add assistant reply to STM so next turn sees it in context
        mm.add_to_stm("assistant", state.get("response", ""))

        # Increment query counter
        new_count = int(state.get("query_count", 0)) + 1
        database_update_session(state["session_id"])

        return {"query_count": new_count}

    # -----------------------------------------------------------------------
    # Build the graph
    # -----------------------------------------------------------------------

    graph = StateGraph(AgentState)

    # Register all nodes
    graph.add_node("receive_input",    receive_input)
    graph.add_node("retrieve_memories", retrieve_memories)
    graph.add_node("build_context",    build_context)
    graph.add_node("generate_response", generate_response)
    graph.add_node("ingest_memories",  ingest_memories)
    graph.add_node("run_maintenance",  run_maintenance)
    graph.add_node("update_session",   update_session)

    # Wire edges: linear pipeline
    # Use START constant (langgraph>=0.2 recommended API, set_entry_point is deprecated)
    graph.add_edge(START,                  "receive_input")
    graph.add_edge("receive_input",     "retrieve_memories")
    graph.add_edge("retrieve_memories", "build_context")
    graph.add_edge("build_context",     "generate_response")
    graph.add_edge("generate_response", "ingest_memories")
    graph.add_edge("ingest_memories",   "run_maintenance")
    graph.add_edge("run_maintenance",   "update_session")
    graph.add_edge("update_session",    END)

    return graph.compile()


# ---------------------------------------------------------------------------
# Session counter helper (avoids circular import with database)
# ---------------------------------------------------------------------------

def database_update_session(session_id: str) -> None:
    """Increment session query counter in SQLite."""
    database.increment_session_queries(session_id)


# ---------------------------------------------------------------------------
# Convenience wrapper used by main.py
# ---------------------------------------------------------------------------

def make_initial_state(
    query:       str,
    session_id:  str,
    query_count: int = 0,
    hits:        int = 0,
) -> AgentState:
    """
    Build the initial AgentState dict for a new query invocation.

    Args:
        query       : The user's raw query string.
        session_id  : Active session UUID.
        query_count : Queries made before this one in the session.
        hits        : Memory hits recorded before this query.

    Returns:
        AgentState dict ready to pass to graph.invoke().
    """
    return AgentState(
        session_id         = session_id,
        query              = query,
        query_count        = query_count,
        hits               = hits,
        query_vec          = [],
        memories           = [],
        augmented_context  = "",
        response           = "",
        ingestion_actions  = [],
        maintenance_report = {},
    )
