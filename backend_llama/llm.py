"""
llm.py
======
AM-LLM — Language Model Wrapper (Llama via Ollama)

Replaces the Gemini backend with a locally running Llama model served
through Ollama. No API key required. The model runs fully on your GPU
(RTX 3050 Ti — 4 GB VRAM).

Setup (one-time):
  1. Download and install Ollama from: https://ollama.com/download
  2. Open a terminal and pull the model:
       ollama pull llama3.2:3b
  3. Ollama starts automatically as a background service after install.
     If it is not running, start it with:
       ollama serve
  4. Start this backend normally:
       python -m uvicorn main:app --reload --port 8000

Model choice for RTX 3050 Ti (4 GB VRAM):
  llama3.2:3b   — 2.0 GB VRAM, fast, good quality  (RECOMMENDED)
  llama3.2:1b   — 1.3 GB VRAM, fastest, lower quality
  llama3.1:8b   — ~5 GB VRAM — may not fit 4 GB card, skip unless quantized

Mock mode (config.yaml -> llm.use_mock: true):
  Returns a deterministic canned response without any model call.
  Useful for offline testing.
"""

from __future__ import annotations

import os

import requests as _http
import yaml
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_ollama import ChatOllama


# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------

def _load_config() -> dict:
    config_path = os.path.join(os.path.dirname(__file__), "config.yaml")
    with open(config_path, "r") as f:
        return yaml.safe_load(f)


CONFIG      = _load_config()
_LLM        = CONFIG["llm"]

_PROVIDER    = str(_LLM["provider"])          # "ollama" | "mock"
_MODEL_NAME  = str(_LLM["model_name"])        # e.g. "llama3.2:3b"
_TEMPERATURE = float(_LLM["temperature"])     # 0.0 – 1.0
_MAX_TOKENS  = int(_LLM["max_tokens"])        # max output tokens
_OLLAMA_URL  = str(_LLM.get("ollama_base_url", "http://localhost:11434"))
_USE_MOCK    = str(_LLM.get("use_mock", False)).lower() in ("true", "1", "yes")


# ---------------------------------------------------------------------------
# System prompt
# ---------------------------------------------------------------------------

_SYSTEM_PROMPT = """You are a helpful, context-aware AI assistant with long-term memory.

You will be provided with:
  1. Relevant memories — facts and context retrieved from past conversations.
  2. Recent conversation — the last few turns of the current session.
  3. The user's latest message.

Instructions:
  - Use the provided memories and recent conversation to give accurate, personalised responses.
  - If the memories are relevant, incorporate them naturally — do not just repeat them.
  - If no memories are relevant, answer based on the recent conversation alone.
  - Be concise, helpful, and conversational.
  - Never fabricate information not present in the context or your knowledge.
"""


# ---------------------------------------------------------------------------
# Model singleton
# ---------------------------------------------------------------------------

_CHAT_MODEL: ChatOllama | None = None


def _check_ollama_running() -> bool:
    """Return True if the Ollama server is reachable."""
    try:
        resp = _http.get(f"{_OLLAMA_URL}/api/tags", timeout=3)
        return resp.ok
    except Exception:
        return False


def _check_model_pulled() -> bool:
    """Return True if the configured model is already pulled in Ollama."""
    try:
        resp = _http.get(f"{_OLLAMA_URL}/api/tags", timeout=3)
        if not resp.ok:
            return False
        models = [m["name"] for m in resp.json().get("models", [])]
        # Match on base name (e.g. "llama3.2:3b" or "llama3.2")
        return any(_MODEL_NAME in m for m in models)
    except Exception:
        return False


def _get_model() -> ChatOllama:
    """
    Return the ChatOllama model, initialising it on first call.
    Raises a clear EnvironmentError if Ollama is not running or the
    model has not been pulled yet.
    """
    global _CHAT_MODEL
    if _CHAT_MODEL is None:
        if not _check_ollama_running():
            raise EnvironmentError(
                "Ollama is not running.\n"
                "Steps to fix:\n"
                "  1. Download Ollama: https://ollama.com/download\n"
                "  2. Install it — it starts automatically as a service.\n"
                "  3. If still not running, open a terminal and run:  ollama serve\n"
                "  4. Restart this backend."
            )
        if not _check_model_pulled():
            raise EnvironmentError(
                f"Model '{_MODEL_NAME}' is not pulled yet.\n"
                "Steps to fix:\n"
                f"  1. Open a terminal and run:  ollama pull {_MODEL_NAME}\n"
                f"     This downloads ~2 GB — only needed once.\n"
                "  2. Wait for the download to finish, then try again."
            )
        _CHAT_MODEL = ChatOllama(
            model       = _MODEL_NAME,
            temperature = _TEMPERATURE,
            num_predict = _MAX_TOKENS,   # Ollama's equivalent of max_tokens
            base_url    = _OLLAMA_URL,
        )
    return _CHAT_MODEL


# ---------------------------------------------------------------------------
# Public API
# ---------------------------------------------------------------------------

def generate_response(augmented_context: str) -> str:
    """
    Generate a response from the local Llama model given the augmented
    context string produced by memory_manager.build_augmented_context().

    The augmented context already contains:
      - Retrieved LTM memories
      - Recent STM turns
      - The current user query

    Args:
        augmented_context: Full prompt context assembled by memory_manager.

    Returns:
        The LLM's response as a plain string.
        Falls back to a friendly error message string on failure so the
        application always returns something to the user.
    """
    # -- Mock mode -----------------------------------------------------------
    if _USE_MOCK or _PROVIDER == "mock":
        return _mock_response(augmented_context)

    # -- Real local call via Ollama ------------------------------------------
    try:
        model    = _get_model()
        messages = [
            SystemMessage(content=_SYSTEM_PROMPT),
            HumanMessage(content=augmented_context),
        ]
        result = model.invoke(messages)

        text = str(result.content).strip()
        if not text:
            return (
                "[LLM Error] The model returned an empty response. "
                "Try rephrasing your query."
            )
        return text

    except EnvironmentError as e:
        return f"[Configuration Error] {e}"

    except Exception as e:  # noqa: BLE001
        err_type = type(e).__name__
        err_msg  = str(e)

        if "connection refused" in err_msg.lower() or "connectionerror" in err_type.lower():
            return (
                "[LLM Error] Cannot connect to Ollama at "
                f"{_OLLAMA_URL}. "
                "Make sure Ollama is running: ollama serve"
            )

        return (
            f"[LLM Error] Could not generate a response. "
            f"Reason: {err_type}: {err_msg}"
        )


def get_model_info() -> dict:
    """
    Return current LLM configuration for the settings API endpoint.
    No API key to expose (local model).
    """
    return {
        "provider":    _PROVIDER,
        "model_name":  _MODEL_NAME,
        "temperature": _TEMPERATURE,
        "max_tokens":  _MAX_TOKENS,
        "mock_mode":   _USE_MOCK or _PROVIDER == "mock",
        "ollama_url":  _OLLAMA_URL,
        "free_tier":   True,   # 100% local — no API costs
        "rate_limit":  "None (local model)",
    }


# ---------------------------------------------------------------------------
# Internal helpers
# ---------------------------------------------------------------------------

def _mock_response(context: str) -> str:
    """
    Return a deterministic mock response for testing without model calls.
    Echoes back a snippet of the context so tests can verify it was received.
    """
    snippet = context[-200:].replace("\n", " ").strip()
    return (
        f"[MOCK RESPONSE] This is a test reply. "
        f"Context received (last 200 chars): ...{snippet}"
    )
