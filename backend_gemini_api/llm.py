"""
llm.py
======
AM-LLM — Language Model Wrapper (Google Gemini)

Wraps Google Gemini 1.5 Flash via LangChain (langchain-google-genai).
All model settings are driven by config.yaml so swapping models
requires only a config change, not code changes (SRS §3.3.5).

Setup:
  1. Get a FREE API key at: https://aistudio.google.com/app/apikey
  2. Copy .env.example → .env
  3. Set GOOGLE_API_KEY=AIza-your-key-here in the .env file
  4. Run the backend — the key is loaded automatically.

Free tier limits (Gemini 1.5 Flash):
  - 15 requests per minute (RPM)
  - 1,000,000 tokens per minute (TPM)
  - 1,500 requests per day (RPD)
  This is more than enough for a student project.

Mock mode (config.yaml → llm.use_mock: true):
  Returns a deterministic canned response without making any API call.
  Useful for offline testing and CI pipelines.
"""

from __future__ import annotations

import os

import yaml
from dotenv import load_dotenv
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_google_genai import ChatGoogleGenerativeAI


# ---------------------------------------------------------------------------
# Config + environment
# ---------------------------------------------------------------------------

def _load_config() -> dict:
    config_path = os.path.join(os.path.dirname(__file__), "config.yaml")
    with open(config_path, "r") as f:
        return yaml.safe_load(f)


# Load .env file so GOOGLE_API_KEY is available as an environment variable.
# IMPORTANT: load_dotenv() must be called BEFORE _load_config() and before
# any Gemini client is created, so the key is in os.environ when needed.
# override=False means we never clobber a key already set in the shell.
_env_path = os.path.join(os.path.dirname(__file__), ".env")
load_dotenv(dotenv_path=_env_path, override=False)

CONFIG  = _load_config()
_LLM    = CONFIG["llm"]

_PROVIDER    = str(_LLM["provider"])          # "gemini" | "mock"
_MODEL_NAME  = str(_LLM["model_name"])        # e.g. "gemini-1.5-flash"
_TEMPERATURE = float(_LLM["temperature"])     # 0.0 – 1.0
_MAX_TOKENS  = int(_LLM["max_tokens"])        # max output tokens in response
# Explicit bool cast: handles both YAML native bool (false) and
# accidental string values ("false", "no") safely.
_USE_MOCK    = str(_LLM.get("use_mock", False)).lower() in ("true", "1", "yes")


# ---------------------------------------------------------------------------
# System prompt — guides Gemini on how to use the injected memory context
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

_CHAT_MODEL: ChatGoogleGenerativeAI | None = None


def _get_model() -> ChatGoogleGenerativeAI:
    """
    Return the ChatGoogleGenerativeAI model, initialising it on first call.
    Uses a module-level singleton so the client is created only once.
    """
    global _CHAT_MODEL
    if _CHAT_MODEL is None:
        api_key = os.environ.get("GOOGLE_API_KEY", "")
        if not api_key:
            raise EnvironmentError(
                "GOOGLE_API_KEY is not set.\n"
                "Steps to fix:\n"
                "  1. Get your FREE key at: https://aistudio.google.com/app/apikey\n"
                "  2. Create a .env file in the backend/ directory:\n"
                "       GOOGLE_API_KEY=AIza-your-key-here\n"
                "  3. Restart the server.\n"
                "Or set it directly in PowerShell:\n"
                "  $env:GOOGLE_API_KEY = \"AIza-your-key-here\""
            )
        _CHAT_MODEL = ChatGoogleGenerativeAI(
            model              = _MODEL_NAME,
            temperature        = _TEMPERATURE,
            max_output_tokens  = _MAX_TOKENS,   # Gemini uses max_output_tokens, not max_tokens
            google_api_key     = api_key,        # Explicit pass — avoids env var lookup inconsistencies
        )
    return _CHAT_MODEL


# ---------------------------------------------------------------------------
# Public API
# ---------------------------------------------------------------------------

def generate_response(augmented_context: str) -> str:
    """
    Generate a response from Gemini given the augmented context string
    produced by memory_manager.build_augmented_context().

    The augmented context already contains:
      - Retrieved LTM memories
      - Recent STM turns
      - The current user query

    Args:
        augmented_context: Full prompt context assembled by memory_manager.

    Returns:
        The LLM's response as a plain string.
        Falls back to an error message string if the API call fails,
        so the application always returns something to the user.
    """
    # -- Mock mode: return canned response without API call ------------------
    if _USE_MOCK or _PROVIDER == "mock":
        return _mock_response(augmented_context)

    # -- Real API call -------------------------------------------------------
    try:
        model    = _get_model()
        messages = [
            SystemMessage(content=_SYSTEM_PROMPT),
            HumanMessage(content=augmented_context),
        ]
        result = model.invoke(messages)

        # Gemini may return an empty string if the safety filter blocked the
        # content. We detect this and return a graceful fallback.
        text = str(result.content).strip()
        if not text:
            return (
                "[LLM Error] Gemini returned an empty response. "
                "This may be due to a safety filter. Try rephrasing your query."
            )
        return text

    except EnvironmentError as e:
        # API key missing — surface a clear actionable message
        return f"[Configuration Error] {e}"

    except Exception as e:  # noqa: BLE001
        # Network error, quota exceeded, rate limit, invalid key, etc.
        err_type = type(e).__name__
        err_msg  = str(e)

        # Provide a specific, friendly message for common Gemini errors
        if "API_KEY_INVALID" in err_msg or "API key not valid" in err_msg:
            return (
                "[Configuration Error] Your GOOGLE_API_KEY is invalid. "
                "Get a free key at: https://aistudio.google.com/app/apikey"
            )
        if "RATE_LIMIT" in err_msg or "429" in err_msg:
            return (
                "[LLM Error] Gemini rate limit hit (15 requests/minute on free tier). "
                "Please wait a moment and try again."
            )
        if "QUOTA" in err_msg or "quota" in err_msg.lower():
            return (
                "[LLM Error] Gemini daily quota exceeded (1,500 requests/day on free tier). "
                "Quota resets at midnight Pacific Time."
            )

        return (
            f"[LLM Error] Could not generate a response at this time. "
            f"Reason: {err_type}: {err_msg}"
        )


def get_model_info() -> dict:
    """
    Return current LLM configuration for the settings API endpoint.
    Does NOT expose the API key.
    """
    return {
        "provider":    _PROVIDER,
        "model_name":  _MODEL_NAME,
        "temperature": _TEMPERATURE,
        "max_tokens":  _MAX_TOKENS,
        "mock_mode":   _USE_MOCK or _PROVIDER == "mock",
        "free_tier":   True,       # Gemini 1.5 Flash free tier
        "rate_limit":  "15 RPM / 1,500 RPD (free tier)",
    }


# ---------------------------------------------------------------------------
# Internal helpers
# ---------------------------------------------------------------------------

def _mock_response(context: str) -> str:
    """
    Return a deterministic mock response for testing without API calls.
    Echoes back a snippet of the context so tests can verify it was received.
    """
    snippet = context[-200:].replace("\n", " ").strip()
    return (
        f"[MOCK RESPONSE] This is a test reply. "
        f"Context received (last 200 chars): ...{snippet}"
    )
