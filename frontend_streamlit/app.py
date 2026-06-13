"""
app.py — AM-LLM Streamlit Frontend
Exact replica of the Vite/React frontend (frontend/ folder).
Only change: Long-Term Memory moved from sidebar panel → separate Tab.

Tabs:
  Tab 1: Chat   — full-width, identical to original React chat panel
  Tab 2: Memory — identical to original MemoryPanel component
"""

import time
import requests
import streamlit as st

# ── Config ───────────────────────────────────────────────────────────────────
API = "http://127.0.0.1:8000"

# ── Page setup ────────────────────────────────────────────────────────────────
st.set_page_config(
    page_title="AM-LLM · Adaptive Memory AI",
    page_icon="🧠",
    layout="wide",
    initial_sidebar_state="collapsed",
)

# ── Global CSS — exact match of index.css + all component styles ──────────────
st.markdown("""
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

:root {
  --bg-primary:      #0a0a0f;
  --bg-secondary:    #111118;
  --bg-card:         rgba(255,255,255,0.04);
  --bg-card-hover:   rgba(255,255,255,0.07);
  --accent-primary:  #6c63ff;
  --accent-secondary:#a78bfa;
  --accent-gradient: linear-gradient(135deg,#6c63ff,#a78bfa);
  --text-primary:    #f0f0f5;
  --text-secondary:  #8888aa;
  --text-muted:      #555566;
  --border:          rgba(255,255,255,0.08);
  --border-accent:   rgba(108,99,255,0.3);
  --glass:           rgba(255,255,255,0.04);
  --glass-border:    rgba(255,255,255,0.1);
  --success:         #4ade80;
  --warning:         #fbbf24;
  --danger:          #f87171;
  --shadow:          0 8px 32px rgba(0,0,0,0.4);
  --radius:          12px;
  --radius-sm:       8px;
  --radius-lg:       20px;
  --font:            'Inter', sans-serif;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html, body, [class*="css"] {
  font-family: var(--font);
  background-color: var(--bg-primary);
  color: var(--text-primary);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

/* Hide Streamlit chrome */
#MainMenu, footer, header { visibility: hidden; }
.block-container { padding: 0 !important; max-width: 100% !important; }
[data-testid="stSidebar"] { display: none; }

/* Scrollbar */
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: var(--bg-secondary); }
::-webkit-scrollbar-thumb { background: rgba(108,99,255,0.4); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: rgba(108,99,255,0.7); }

/* ── Animations ── */
@keyframes fadeIn      { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
@keyframes slideInLeft { from{opacity:0;transform:translateX(-20px)} to{opacity:1;transform:translateX(0)} }
@keyframes slideInRight{ from{opacity:0;transform:translateX(20px)} to{opacity:1;transform:translateX(0)} }
@keyframes pulse       { 0%,100%{opacity:1} 50%{opacity:0.5} }
@keyframes bounce      { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-8px)} }
@keyframes spin        { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
@keyframes glow        { 0%,100%{box-shadow:0 0 5px rgba(108,99,255,0.3)} 50%{box-shadow:0 0 20px rgba(108,99,255,0.6),0 0 40px rgba(108,99,255,0.2)} }

/* ── HEADER ── */
.am-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  height: 64px;
  background: rgba(17,17,24,0.9);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
}
.header-brand { display:flex; align-items:center; gap:12px; }
.header-brain-icon {
  font-size: 28px;
  filter: drop-shadow(0 0 8px rgba(108,99,255,0.6));
  animation: glow 3s ease-in-out infinite;
}
.header-title {
  font-size: 1.25rem;
  font-weight: 800;
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.5px;
  line-height: 1.2;
  margin: 0;
}
.header-subtitle {
  font-size: 0.68rem;
  color: var(--text-muted);
  font-weight: 400;
  letter-spacing: 0.3px;
  line-height: 1;
}
.header-right { display:flex; align-items:center; gap:12px; }
.header-model-badge {
  display:flex; align-items:center; gap:6px;
  padding: 5px 12px;
  background: rgba(108,99,255,0.12);
  border: 1px solid var(--border-accent);
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--accent-secondary);
}
.health-indicator {
  display:flex; align-items:center; gap:6px;
  padding: 5px 12px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 20px;
  font-size: 0.72rem;
  font-weight: 500;
  color: var(--text-secondary);
}
.health-dot {
  width:8px; height:8px; border-radius:50%; flex-shrink:0;
}
.health-dot.healthy {
  background: var(--success);
  box-shadow: 0 0 6px var(--success);
  animation: pulse 2s ease-in-out infinite;
}
.health-dot.unhealthy { background: var(--danger); box-shadow: 0 0 6px var(--danger); }

/* ── TABS ── */
.stTabs [data-baseweb="tab-list"] {
  background: rgba(17,17,24,0.95);
  border-bottom: 1px solid var(--border);
  gap: 0;
  padding: 0 24px;
}
.stTabs [data-baseweb="tab"] {
  background: transparent;
  border: none;
  color: var(--text-muted);
  font-weight: 600;
  font-size: 0.82rem;
  letter-spacing: 0.04em;
  padding: 14px 20px;
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
  font-family: var(--font);
  text-transform: uppercase;
}
.stTabs [aria-selected="true"] {
  color: var(--accent-secondary) !important;
  border-bottom: 2px solid var(--accent-primary) !important;
  background: transparent !important;
}
.stTabs [data-baseweb="tab-panel"] {
  padding: 0;
  background: var(--bg-primary);
}

/* ── CHAT AREA ── */
.chat-area {
  height: calc(100vh - 64px - 48px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--bg-primary);
}
.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
}

/* Empty state */
.chat-empty-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 40px 20px;
  animation: fadeIn 0.5s ease-in-out;
}
.empty-brain {
  font-size: 4rem;
  margin-bottom: 20px;
  filter: drop-shadow(0 0 20px rgba(108,99,255,0.5));
  animation: glow 3s ease-in-out infinite;
}
.empty-title { font-size:1.5rem; font-weight:700; color:var(--text-primary); margin-bottom:10px; }
.empty-subtitle { font-size:0.9rem; color:var(--text-secondary); max-width:400px; line-height:1.6; margin-bottom:32px; }
.example-label { font-size:0.75rem; color:var(--text-muted); margin-bottom:12px; text-transform:uppercase; letter-spacing:0.8px; font-weight:500; }
.example-list { display:flex; flex-direction:column; gap:8px; max-width:520px; margin:0 auto; }
.example-chip {
  padding: 10px 16px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--text-secondary);
  font-size: 0.83rem;
  text-align: left;
  cursor: pointer;
  width: 100%;
  font-family: var(--font);
  transition: all 0.2s;
}
.example-chip:hover {
  background: var(--bg-card-hover);
  border-color: var(--border-accent);
  color: var(--text-primary);
  transform: translateX(4px);
}

/* Messages */
.messages-list { display:flex; flex-direction:column; gap:16px; width:100%; }
.message-row   { display:flex; flex-direction:column; gap:4px; }

.message-wrapper {
  display:flex; align-items:flex-end; gap:10px;
  animation: fadeIn 0.35s ease-in-out;
  max-width:100%;
}
.message-wrapper.user      { flex-direction:row-reverse; }
.message-wrapper.assistant { flex-direction:row; }

.message-avatar {
  width:32px; height:32px; border-radius:50%;
  background: rgba(108,99,255,0.15);
  border: 1px solid var(--border-accent);
  display:flex; align-items:center; justify-content:center;
  font-size:0.85rem; flex-shrink:0; margin-bottom:22px;
}
.user-avatar { background:rgba(167,139,250,0.15); border-color:rgba(167,139,250,0.3); }

.message-content-group { display:flex; flex-direction:column; gap:6px; max-width:calc(100% - 80px); }

.message-bubble {
  padding:12px 16px; border-radius:var(--radius-lg);
  line-height:1.65; font-size:0.9rem; word-break:break-word; white-space:pre-wrap;
}
.user-bubble {
  background: var(--accent-gradient);
  color:#fff; border-bottom-right-radius:4px;
  box-shadow: 0 4px 16px rgba(108,99,255,0.3);
  animation: slideInRight 0.3s ease-in-out;
}
.assistant-bubble {
  background: var(--glass);
  backdrop-filter: blur(12px);
  border: 1px solid var(--glass-border);
  color: var(--text-primary); border-bottom-left-radius:4px;
  box-shadow: var(--shadow);
  animation: slideInLeft 0.3s ease-in-out;
}

.message-meta { display:flex; align-items:center; gap:8px; flex-wrap:wrap; }
.meta-right { justify-content:flex-end; }
.meta-left  { justify-content:flex-start; }
.message-timestamp { font-size:0.68rem; color:var(--text-muted); }

.memory-chip {
  display:inline-flex; align-items:center; gap:4px;
  padding: 2px 10px;
  background: rgba(108,99,255,0.1);
  border: 1px solid var(--border-accent);
  border-radius:12px; font-size:0.7rem;
  color:var(--accent-secondary); font-weight:500;
}

/* Memories collapsed */
.memories-collapse {
  background:rgba(108,99,255,0.06); border:1px solid var(--border-accent);
  border-radius:var(--radius-sm); overflow:hidden;
  animation:fadeIn 0.2s ease-in-out;
}
.memories-collapse-header {
  padding:7px 12px; font-size:0.7rem; font-weight:600;
  color:var(--accent-secondary); border-bottom:1px solid var(--border-accent);
  text-transform:uppercase; letter-spacing:0.5px;
}
.memory-snippet {
  display:flex; align-items:flex-start; gap:8px;
  padding:8px 12px; border-bottom:1px solid rgba(255,255,255,0.04);
}
.memory-snippet:last-child { border-bottom:none; }
.memory-snippet-score {
  font-size:0.65rem; font-weight:700; color:var(--accent-primary);
  background:rgba(108,99,255,0.15); padding:2px 6px; border-radius:6px;
  flex-shrink:0; margin-top:1px;
}
.memory-snippet-text { font-size:0.75rem; color:var(--text-secondary); line-height:1.5; }

/* Typing indicator */
.typing-indicator {
  display:flex; align-items:flex-end; gap:10px;
  animation:fadeIn 0.35s ease-in-out;
}
.typing-bubble {
  background:var(--glass); backdrop-filter:blur(12px);
  border:1px solid var(--glass-border);
  border-radius:var(--radius-lg); border-bottom-left-radius:4px;
  padding:14px 18px; display:flex; gap:5px; align-items:center;
  box-shadow:var(--shadow);
}
.typing-dot {
  width:7px; height:7px; border-radius:50%;
  background:var(--accent-primary);
  animation:bounce 1.2s ease-in-out infinite;
}
.typing-dot:nth-child(2){animation-delay:160ms;}
.typing-dot:nth-child(3){animation-delay:320ms;}

/* ── INPUT AREA ── */
.chat-input-area {
  padding:16px 20px;
  background:rgba(17,17,24,0.95);
  border-top:1px solid var(--border);
  flex-shrink:0;
}
.chat-input-row {
  display:flex; align-items:flex-end; gap:12px;
  background:var(--bg-card);
  border:1px solid var(--border);
  border-radius:var(--radius-lg);
  padding:8px 8px 8px 16px;
  transition:border-color 0.2s, box-shadow 0.2s;
}
.chat-input-row:focus-within {
  border-color:var(--border-accent);
  box-shadow:0 0 0 3px rgba(108,99,255,0.1);
}
.chat-footer-hint {
  margin-top:8px; font-size:0.67rem; color:var(--text-muted);
  text-align:center; letter-spacing:0.3px;
}

/* Streamlit widget overrides */
.stTextArea > div > div > textarea {
  flex:1; background:transparent !important;
  color:var(--text-primary) !important;
  font-size:0.9rem !important;
  font-family:var(--font) !important;
  line-height:1.6 !important;
  resize:none !important;
  border:none !important;
  outline:none !important;
  box-shadow:none !important;
  padding:4px 0 !important;
}
.stTextArea label { display:none !important; }
.stTextArea > div { border:none !important; background:transparent !important; padding:0 !important; }
.stTextArea > div > div { border:none !important; background:transparent !important; }

/* Send button */
.send-btn-wrap > button {
  width:40px !important; height:40px !important;
  border-radius:50% !important;
  background: var(--accent-gradient) !important;
  border:none !important;
  color:#fff !important;
  font-size:1rem !important;
  box-shadow: 0 2px 12px rgba(108,99,255,0.4) !important;
  transition:all 0.2s !important;
  display:flex !important; align-items:center !important; justify-content:center !important;
  padding:0 !important;
}
.send-btn-wrap > button:hover:not(:disabled) {
  transform:scale(1.08) !important;
  box-shadow:0 4px 20px rgba(108,99,255,0.6) !important;
}
.send-btn-wrap > button:disabled {
  opacity:0.4 !important; cursor:not-allowed !important; box-shadow:none !important;
}

/* Session/close button row */
.session-btn > button {
  padding:8px 20px !important;
  background:rgba(108,99,255,0.15) !important;
  border:1px solid var(--border-accent) !important;
  border-radius:var(--radius-sm) !important;
  color:var(--accent-secondary) !important;
  font-weight:600 !important; font-size:0.82rem !important;
  transition:all 0.2s !important;
  font-family:var(--font) !important;
}
.session-btn > button:hover { background:rgba(108,99,255,0.25) !important; }

.close-btn > button {
  padding:8px 20px !important;
  background:rgba(248,113,113,0.1) !important;
  border:1px solid rgba(248,113,113,0.3) !important;
  border-radius:var(--radius-sm) !important;
  color:var(--danger) !important;
  font-weight:600 !important; font-size:0.82rem !important;
  transition:all 0.2s !important;
  font-family:var(--font) !important;
}
.close-btn > button:hover { background:rgba(248,113,113,0.2) !important; }

/* ── MEMORY PANEL ── */
.memory-panel-page {
  height: calc(100vh - 64px - 48px);
  display:flex; flex-direction:column;
  background:var(--bg-secondary);
  overflow:hidden;
}
.memory-panel-header {
  display:flex; align-items:center; justify-content:space-between;
  padding:16px 16px 12px;
  border-bottom:1px solid var(--border);
  flex-shrink:0;
  background:rgba(17,17,24,0.8);
}
.memory-panel-title {
  display:flex; align-items:center; gap:8px;
  font-size:0.82rem; font-weight:700; color:var(--text-primary);
  text-transform:uppercase; letter-spacing:0.8px;
}
.memory-count-badge {
  display:inline-flex; align-items:center; justify-content:center;
  min-width:22px; height:18px; padding:0 6px;
  background:rgba(108,99,255,0.2); border:1px solid var(--border-accent);
  border-radius:9px; font-size:0.65rem; font-weight:700;
  color:var(--accent-secondary);
}
.refresh-btn > button {
  width:28px !important; height:28px !important; border-radius:50% !important;
  background:var(--bg-card) !important; border:1px solid var(--border) !important;
  color:var(--text-secondary) !important; font-size:1.1rem !important;
  display:flex !important; align-items:center !important; justify-content:center !important;
  transition:all 0.2s !important; padding:0 !important;
}
.refresh-btn > button:hover { background:var(--bg-card-hover) !important; border-color:var(--border-accent) !important; color:var(--accent-secondary) !important; }

.memory-panel-body { flex:1; overflow-y:auto; padding:12px; }
.memory-list { display:flex; flex-direction:column; gap:8px; animation:fadeIn 0.3s ease-in-out; }

/* Memory card */
.memory-card {
  background:var(--bg-card); border:1px solid var(--border);
  border-radius:var(--radius); padding:12px 14px;
  transition:all 0.2s; cursor:default;
  position:relative; overflow:hidden;
  margin-bottom:0;
}
.memory-card::before {
  content:''; position:absolute; left:0; top:0; bottom:0; width:3px;
  border-radius:3px 0 0 3px;
}
.memory-card:hover {
  background:var(--bg-card-hover);
  border-color:rgba(255,255,255,0.12);
  transform:translateY(-1px);
  box-shadow:0 4px 16px rgba(0,0,0,0.3);
}
.memory-card-header {
  display:flex; align-items:center; justify-content:space-between; margin-bottom:8px;
}
.memory-id-badge {
  font-size:0.65rem; color:var(--text-muted); letter-spacing:0.5px; font-weight:600;
}
.memory-card-score-info { display:flex; align-items:center; gap:6px; }
.score-label-badge {
  font-size:0.63rem; font-weight:700; padding:2px 7px;
  border-radius:10px; border:1px solid; text-transform:uppercase; letter-spacing:0.5px;
}
.score-number { font-size:0.7rem; color:var(--text-muted); font-weight:600; }
.memory-card-text { font-size:0.8rem; color:var(--text-secondary); line-height:1.55; margin-bottom:10px; }
.memory-score-bar-container {
  height:3px; background:rgba(255,255,255,0.06); border-radius:2px; margin-bottom:10px; overflow:hidden;
}
.memory-score-bar { height:100%; border-radius:2px; opacity:0.8; transition:width 0.6s; }
.memory-card-footer { display:flex; align-items:center; justify-content:space-between; gap:8px; }
.memory-stat { display:flex; align-items:center; gap:4px; }
.memory-stat-icon { font-size:0.7rem; }
.memory-stat-value { font-size:0.67rem; color:var(--text-muted); }

.memory-empty {
  display:flex; flex-direction:column; align-items:center; justify-content:center;
  gap:10px; padding:48px 20px; text-align:center;
  animation:fadeIn 0.3s ease-in-out;
}
.memory-empty-icon { font-size:2.5rem; margin-bottom:4px; }
.memory-empty-title { font-size:0.85rem; font-weight:600; color:var(--text-secondary); }
.memory-empty-sub { font-size:0.75rem; color:var(--text-muted); line-height:1.6; max-width:200px; }

/* Metrics */
[data-testid="stMetric"] {
  background:var(--bg-card); border:1px solid var(--border);
  border-radius:var(--radius); padding:14px 16px;
}
[data-testid="stMetricLabel"] p { font-size:0.7rem !important; color:var(--text-muted) !important; text-transform:uppercase; letter-spacing:0.5px; }
[data-testid="stMetricValue"] { font-size:1.4rem !important; color:var(--accent-secondary) !important; font-weight:700 !important; }
</style>
""", unsafe_allow_html=True)

# ── Session state ─────────────────────────────────────────────────────────────
for k, v in {
    "session_id": None,
    "messages": [],        # {role, content, mems, timestamp}
    "query_count": 0,
    "model_name": None,
    "mem_expanded": {},    # msg_index -> bool
}.items():
    if k not in st.session_state:
        st.session_state[k] = v

# ── API helpers ───────────────────────────────────────────────────────────────
def api_health():
    try:
        r = requests.get(f"{API}/health", timeout=3)
        return r.ok, r.json() if r.ok else {}
    except:
        return False, {}

def api_settings():
    try:
        r = requests.get(f"{API}/settings", timeout=3)
        return r.json() if r.ok else {}
    except:
        return {}

def api_start():
    try:
        r = requests.post(f"{API}/session/start", json={}, timeout=5)
        r.raise_for_status()
        return r.json().get("session_id")
    except:
        return None

def api_close(sid):
    try:
        requests.post(f"{API}/session/close", json={"session_id": sid}, timeout=5)
    except:
        pass

def api_query(sid, query):
    try:
        r = requests.post(f"{API}/query", json={"session_id": sid, "query": query}, timeout=60)
        r.raise_for_status()
        return r.json()
    except Exception as e:
        return {"error": str(e)}

def api_memories():
    try:
        r = requests.get(f"{API}/memories", timeout=4)
        r.raise_for_status()
        return r.json()
    except:
        return {"memories": [], "count": 0}

def api_stats():
    try:
        r = requests.get(f"{API}/stats", timeout=4)
        return r.json() if r.ok else {}
    except:
        return {}

# ── Runtime checks ────────────────────────────────────────────────────────────
is_healthy, health_data = api_health()
if not st.session_state["model_name"]:
    settings = api_settings()
    st.session_state["model_name"] = settings.get("model_name", "")

model_name = st.session_state["model_name"] or ""

# ── HEADER ────────────────────────────────────────────────────────────────────
dot_class   = "healthy" if is_healthy else "unhealthy"
dot_label   = "Online"  if is_healthy else "Offline"
model_badge = f'<div class="header-model-badge"><span>⚡</span><span>{model_name}</span></div>' if model_name else ""

st.markdown(f"""
<div class="am-header">
  <div class="header-brand">
    <span class="header-brain-icon">🧠</span>
    <div>
      <div class="header-title">AM-LLM</div>
      <div class="header-subtitle">Adaptive Memory-Augmented Language Model</div>
    </div>
  </div>
  <div class="header-right">
    {model_badge}
    <div class="health-indicator">
      <span class="health-dot {dot_class}"></span>
      <span>{dot_label}</span>
    </div>
  </div>
</div>
""", unsafe_allow_html=True)

# ── TABS ──────────────────────────────────────────────────────────────────────
tab_chat, tab_memory = st.tabs(["💬  Chat", "💾  Long-Term Memory"])

# ═══════════════════════════════════════════════════════════════════════
# TAB 1 — CHAT
# ═══════════════════════════════════════════════════════════════════════
with tab_chat:
    sid = st.session_state["session_id"]

    # ── Session control row ──────────────────────────────────────────
    ctrl_cols = st.columns([1, 1, 6])
    with ctrl_cols[0]:
        st.markdown('<div class="session-btn">', unsafe_allow_html=True)
        if st.button("Start Session", key="btn_start",
                     disabled=(sid is not None or not is_healthy)):
            new_sid = api_start()
            if new_sid:
                st.session_state["session_id"] = new_sid
                st.session_state["messages"]   = []
                st.session_state["query_count"] = 0
                st.rerun()
        st.markdown("</div>", unsafe_allow_html=True)

    with ctrl_cols[1]:
        st.markdown('<div class="close-btn">', unsafe_allow_html=True)
        if st.button("Close Session", key="btn_close", disabled=(sid is None)):
            api_close(sid)
            st.session_state["session_id"]  = None
            st.session_state["messages"]    = []
            st.session_state["query_count"] = 0
            st.rerun()
        st.markdown("</div>", unsafe_allow_html=True)

    st.markdown('<div class="chat-area">', unsafe_allow_html=True)

    # ── Build messages HTML ──────────────────────────────────────────
    msgs_html = ""

    if not sid and not st.session_state["messages"]:
        # Empty / welcome state
        EXAMPLES = [
            "What is adaptive memory in AI systems?",
            "Explain how FAISS vector search works",
            "What makes a memory important in this system?",
            "How does long-term memory differ from short-term memory here?",
        ]
        ex_chips = "".join(f'<button class="example-chip">{q}</button>' for q in EXAMPLES)
        ready_sub = ("Your session is active. Ask me anything — I remember across conversations."
                     if sid else "Start a session to begin chatting.")
        msgs_html = f"""
        <div class="chat-empty-state">
          <div class="empty-brain">🧠</div>
          <h2 class="empty-title">AM-LLM is ready</h2>
          <p class="empty-subtitle">{ready_sub}</p>
          {'<div><p class="example-label">Try asking:</p><div class="example-list">' + ex_chips + '</div></div>' if sid else ''}
        </div>
        """
    else:
        msgs_html += '<div class="messages-list">'
        for i, msg in enumerate(st.session_state["messages"]):
            role    = msg["role"]
            content = msg.get("content", "")
            mems    = msg.get("mems", [])
            ts      = msg.get("timestamp", "")
            is_user = (role == "user")

            avatar_class = "user-avatar" if is_user else ""
            avatar_icon  = "👤" if is_user else "🧠"
            bubble_class = "user-bubble" if is_user else "assistant-bubble"
            wrapper_cls  = "user" if is_user else "assistant"
            meta_cls     = "meta-right" if is_user else "meta-left"

            left_avatar  = f'<div class="message-avatar">{avatar_icon}</div>' if not is_user else ""
            right_avatar = f'<div class="message-avatar user-avatar">{avatar_icon}</div>' if is_user else ""

            # Memory chip
            mem_chip = ""
            mem_expand = ""
            if mems and not is_user:
                n = len(mems)
                mem_chip = f'<span class="memory-chip">🧠 {n} {"memory" if n==1 else "memories"} used</span>'
                snippets = "".join(
                    f'<div class="memory-snippet">'
                    f'<span class="memory-snippet-score">'
                    f'{(m.get("current_score") or m.get("importance_score") or 0):.2f}'
                    f'</span>'
                    f'<span class="memory-snippet-text">{(m.get("text",""))[:120]}{"…" if len(m.get("text",""))>120 else ""}</span>'
                    f'</div>'
                    for m in mems
                )
                mem_expand = f"""
                <div class="memories-collapse">
                  <div class="memories-collapse-header">Referenced Memories</div>
                  {snippets}
                </div>"""

            msgs_html += f"""
            <div class="message-row">
              <div class="message-wrapper {wrapper_cls}">
                {left_avatar}
                <div class="message-content-group">
                  <div class="message-bubble {bubble_class}">{content}</div>
                  <div class="message-meta {meta_cls}">
                    <span class="message-timestamp">{ts}</span>
                    {mem_chip}
                  </div>
                  {mem_expand}
                </div>
                {right_avatar}
              </div>
            </div>"""
        msgs_html += "</div>"

    st.markdown(
        f'<div class="chat-messages">{msgs_html}</div>',
        unsafe_allow_html=True,
    )
    st.markdown("</div>", unsafe_allow_html=True)  # close .chat-area

    # ── Input area ───────────────────────────────────────────────────
    st.markdown('<div class="chat-input-area">', unsafe_allow_html=True)
    st.markdown('<div class="chat-input-row">', unsafe_allow_html=True)

    with st.form("chat_form", clear_on_submit=True):
        in_col, btn_col = st.columns([11, 1])
        with in_col:
            user_input = st.text_area(
                "msg", placeholder="Ask anything… (Submit to send)",
                height=44, label_visibility="collapsed", key="chat_input",
            )
        with btn_col:
            st.markdown('<div class="send-btn-wrap">', unsafe_allow_html=True)
            submitted = st.form_submit_button("➤", disabled=(not sid or not is_healthy))
            st.markdown("</div>", unsafe_allow_html=True)

    st.markdown("</div>", unsafe_allow_html=True)  # close .chat-input-row
    st.markdown(
        f'<div class="chat-footer-hint">{"Session active • Press Submit to send" if sid else "Start a session to chat"}</div>',
        unsafe_allow_html=True,
    )
    st.markdown("</div>", unsafe_allow_html=True)  # close .chat-input-area

    # ── Handle send ──────────────────────────────────────────────────
    if submitted and user_input and user_input.strip() and sid:
        query = user_input.strip()
        now   = time.strftime("%H:%M")
        st.session_state["messages"].append({
            "role": "user", "content": query, "mems": [], "timestamp": now,
        })
        with st.spinner(""):
            result = api_query(sid, query)
        if result and "error" not in result:
            st.session_state["messages"].append({
                "role": "assistant",
                "content": result.get("response", ""),
                "mems":    result.get("memories_used", []),
                "timestamp": time.strftime("%H:%M"),
            })
            st.session_state["query_count"] = result.get("query_count", st.session_state["query_count"])
        else:
            err = (result or {}).get("error", "Backend unreachable.")
            st.session_state["messages"].append({
                "role": "assistant",
                "content": f"Error: {err}",
                "mems": [], "timestamp": time.strftime("%H:%M"),
            })
        st.rerun()

# ═══════════════════════════════════════════════════════════════════════
# TAB 2 — LONG-TERM MEMORY  (exact MemoryPanel replica)
# ═══════════════════════════════════════════════════════════════════════
with tab_memory:
    mem_data  = api_memories()
    memories  = mem_data.get("memories", [])
    mem_count = mem_data.get("count", len(memories))
    stats     = api_stats()

    # Panel header row
    hdr_c1, hdr_c2 = st.columns([8, 1])
    with hdr_c1:
        st.markdown(f"""
        <div class="memory-panel-header">
          <div class="memory-panel-title">
            <span>💾</span>
            <span>Long-Term Memory</span>
            <span class="memory-count-badge">{mem_count}</span>
          </div>
        </div>
        """, unsafe_allow_html=True)
    with hdr_c2:
        st.markdown('<div class="refresh-btn">', unsafe_allow_html=True)
        if st.button("↻", key="btn_refresh_mem"):
            st.rerun()
        st.markdown("</div>", unsafe_allow_html=True)

    # Stats row
    if stats:
        sc1, sc2, sc3, sc4 = st.columns(4)
        sc1.metric("Total Memories", stats.get("total_memories", 0))
        sc2.metric("FAISS Vectors",  stats.get("faiss_vectors", 0))
        sc3.metric("STM Turns",      stats.get("stm_turns", 0))
        sc4.metric("Queries",        st.session_state["query_count"])

    st.markdown("<hr style='border-color:rgba(255,255,255,0.08);margin:12px 0'>", unsafe_allow_html=True)

    # Memory cards
    if not memories:
        st.markdown("""
        <div class="memory-empty">
          <div class="memory-empty-icon">🌱</div>
          <p class="memory-empty-title">No memories yet</p>
          <p class="memory-empty-sub">Memories will form as you have more conversations. Keep chatting!</p>
        </div>
        """, unsafe_allow_html=True)
    else:
        cards_html = '<div class="memory-list">'
        for m in memories:
            score = m.get("current_score") or m.get("importance_score") or 0.0
            score = max(0.0, min(1.0, score))
            pct   = score * 100

            if score >= 0.7:
                score_color = "var(--success)"; score_label = "High"
            elif score >= 0.4:
                score_color = "var(--warning)"; score_label = "Medium"
            else:
                score_color = "var(--danger)";  score_label = "Low"

            text = m.get("text", "")
            display_text = text[:100] + ("…" if len(text) > 100 else "")
            mem_id = str(m.get("id") or m.get("faiss_id") or "?")
            mem_id_display = f"#{mem_id[-4:] if len(mem_id) > 4 else mem_id}"
            access = m.get("access_count", 0)

            created_raw = str(m.get("created_at", ""))
            try:
                from datetime import datetime
                d = datetime.fromisoformat(created_raw)
                created = d.strftime("%b %d, %H:%M")
            except:
                created = created_raw[:16] if created_raw else "Unknown"

            cards_html += f"""
            <div class="memory-card" style="--score-color:{score_color}">
              <div class="memory-card-header">
                <span class="memory-id-badge">{mem_id_display}</span>
                <div class="memory-card-score-info">
                  <span class="score-label-badge"
                    style="color:{score_color};border-color:{score_color};background:{score_color}18">
                    {score_label}
                  </span>
                  <span class="score-number">{score:.3f}</span>
                </div>
              </div>
              <div class="memory-card-text" title="{text}">{display_text}</div>
              <div class="memory-score-bar-container">
                <div class="memory-score-bar" style="width:{pct:.1f}%;background:{score_color}"></div>
              </div>
              <div class="memory-card-footer">
                <div class="memory-stat"><span class="memory-stat-icon">👁️</span><span class="memory-stat-value">{access}</span></div>
                <div class="memory-stat"><span class="memory-stat-icon">🕐</span><span class="memory-stat-value">{created}</span></div>
              </div>
            </div>"""
        cards_html += "</div>"

        st.markdown(
            f'<div class="memory-panel-body">{cards_html}</div>',
            unsafe_allow_html=True,
        )
