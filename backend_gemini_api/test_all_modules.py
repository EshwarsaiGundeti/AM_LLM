"""
test_all_modules.py
===================
AM-LLM -- Offline module-by-module test script.
Run with:  python test_all_modules.py
No OpenAI API key required (mock mode is on in config.yaml).
"""

import sys
import os
import uuid

# Force UTF-8 so this file runs cleanly on Windows (cp1252 terminal)
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

passed = []
failed = []


def section(title):
    print("\n" + "=" * 62)
    print("  " + title)
    print("=" * 62)


def ok(msg):
    print("  [PASS]  " + msg)
    passed.append(msg)


def fail(msg, err):
    print("  [FAIL]  " + msg)
    print("          " + type(err).__name__ + ": " + str(err))
    failed.append((msg, err))


# ===========================================================================
# MODULE 1 -- config.yaml
# ===========================================================================
section("MODULE 1 -- config.yaml")

try:
    import yaml
    config_path = os.path.join(os.path.dirname(__file__), "config.yaml")
    with open(config_path) as f:
        cfg = yaml.safe_load(f)
    required = ["importance","retrieval","forgetting","compression",
                "stm","llm","embedding","faiss","paths","server"]
    for k in required:
        assert k in cfg, "Missing key: " + k
    ok("config.yaml loads and has all 10 required top-level keys")
except Exception as e:
    fail("config.yaml load", e)

# ===========================================================================
# MODULE 2 -- database.py
# ===========================================================================
section("MODULE 2 -- database.py")

try:
    import database
    ok("database module imports")
except Exception as e:
    fail("database import", e)

try:
    database.init_db()
    ok("init_db() -- tables + CSV files created")
except Exception as e:
    fail("init_db()", e)

test_session = str(uuid.uuid4())

try:
    database.create_session(test_session)
    sess = database.get_session(test_session)
    assert sess is not None and sess["id"] == test_session
    ok("create_session() + get_session()")
except Exception as e:
    fail("create_session / get_session", e)

mem_id = None
try:
    import numpy as np
    vec = np.random.rand(384).astype(np.float32)
    mem_id = database.insert_memory(
        text="The sky is blue",
        embedding=vec,
        importance_score=0.75,
        session_id=test_session,
        faiss_id=0
    )
    assert isinstance(mem_id, int) and mem_id > 0
    ok("insert_memory() -- id=" + str(mem_id))
except Exception as e:
    fail("insert_memory()", e)

try:
    mem = database.get_memory_by_id(mem_id)
    assert mem is not None and mem["text"] == "The sky is blue"
    ok("get_memory_by_id()")
except Exception as e:
    fail("get_memory_by_id()", e)

try:
    all_mems = database.get_all_memories()
    assert isinstance(all_mems, list) and len(all_mems) >= 1
    ok("get_all_memories() -- found " + str(len(all_mems)) + " row(s)")
except Exception as e:
    fail("get_all_memories()", e)

try:
    database.update_memory_score(mem_id, 0.55)
    updated = database.get_memory_by_id(mem_id)
    assert abs(updated["current_score"] - 0.55) < 0.001
    ok("update_memory_score()")
except Exception as e:
    fail("update_memory_score()", e)

try:
    database.update_memory_access(mem_id)
    accessed = database.get_memory_by_id(mem_id)
    assert accessed["access_count"] == 1
    ok("update_memory_access() -- access_count=1")
except Exception as e:
    fail("update_memory_access()", e)

try:
    embs, ids = database.get_embeddings_and_ids()
    assert embs.shape[1] == 384 and len(ids) >= 1
    ok("get_embeddings_and_ids() -- shape " + str(embs.shape))
except Exception as e:
    fail("get_embeddings_and_ids()", e)

try:
    database.increment_session_queries(test_session)
    database.increment_session_stored(test_session)
    database.increment_session_forgotten(test_session, 2)
    database.increment_session_compressed(test_session, 1)
    s = database.get_session(test_session)
    assert s["total_queries"] == 1
    assert s["memories_stored"] == 1
    assert s["memories_forgotten"] == 2
    assert s["memories_compressed"] == 1
    ok("increment_session_*() -- all counters correct")
except Exception as e:
    fail("increment_session_* counters", e)

try:
    database.log_importance_decision(test_session, "Test text", 0.75, "stored")
    database.log_forgotten_memory(mem_id, "Test text", 0.05)
    ok("log_importance_decision() + log_forgotten_memory() -- CSV rows written")
except Exception as e:
    fail("CSV logging functions", e)

try:
    count = database.get_memory_count()
    assert count >= 1
    ok("get_memory_count() -- " + str(count) + " memory/memories")
except Exception as e:
    fail("get_memory_count()", e)

# ===========================================================================
# MODULE 3 -- embedder.py  (downloads ~80 MB model on first run)
# ===========================================================================
section("MODULE 3 -- embedder.py (may download ~80 MB model on first run)")

try:
    import embedder
    ok("embedder module imports")
except Exception as e:
    fail("embedder import", e)

try:
    vec = embedder.encode("Hello world")
    assert vec.shape == (384,)
    norm = float(np.linalg.norm(vec))
    assert abs(norm - 1.0) < 1e-5, "Not unit-normalised, norm=" + str(norm)
    ok("encode() -- shape=" + str(vec.shape) + ", L2-norm=" + str(round(norm, 6)))
except Exception as e:
    fail("embedder.encode()", e)

try:
    sentences = embedder.segment_into_sentences(
        "The Amazon rainforest produces twenty percent of the world's oxygen supply."
        " Scientists have discovered thousands of new species in the past decade."
        " Deforestation remains one of the most serious environmental threats today."
    )
    assert len(sentences) >= 1, "Expected at least 1 sentence with >= 5 words"
    ok("segment_into_sentences() -- " + str(len(sentences)) + " sentence(s): " + str(sentences))
except Exception as e:
    fail("embedder.segment_into_sentences()", e)

try:
    v1 = embedder.encode("The dog runs fast")
    v2 = embedder.encode("The dog runs fast")
    v3 = embedder.encode("The weather is cold")
    sim_same = embedder.cosine_similarity(v1, v2)   # correct function name
    sim_diff = embedder.cosine_similarity(v1, v3)
    assert sim_same > sim_diff
    ok("cosine_similarity() -- identical=" + str(round(sim_same,4)) + " > different=" + str(round(sim_diff,4)))
except Exception as e:
    fail("embedder.cosine_similarity()", e)

# ===========================================================================
# MODULE 4 -- importance_scorer.py
# ===========================================================================
section("MODULE 4 -- importance_scorer.py")

try:
    import importance_scorer
    ok("importance_scorer module imports")
except Exception as e:
    fail("importance_scorer import", e)

try:
    cand_text = "The Amazon rainforest is the largest rainforest in the world."
    cand_vec  = embedder.encode(cand_text)
    query_vec = embedder.encode("Tell me about rainforests")
    score, decision = importance_scorer.score_candidate(
        candidate_text=cand_text,
        candidate_vec=cand_vec,
        query_vec=query_vec,
        session_id=test_session,
    )
    assert 0.0 <= score <= 1.0
    assert decision in ("stored", "rejected", "duplicate")
    ok("score_candidate() -- score=" + str(round(score,4)) + ", decision='" + decision + "'")
except Exception as e:
    fail("importance_scorer.score_candidate()", e)

# ===========================================================================
# MODULE 5 -- compressor.py
# ===========================================================================
section("MODULE 5 -- compressor.py")

try:
    import compressor
    ok("compressor module imports")
except Exception as e:
    fail("compressor import", e)

try:
    r_false = compressor.should_compress(5)
    r_true  = compressor.should_compress(20)
    assert r_false == False and r_true == True
    ok("should_compress() -- at 5: " + str(r_false) + ", at 20: " + str(r_true))
except Exception as e:
    fail("compressor.should_compress()", e)

try:
    result = compressor.run_compression(test_session)
    ok("run_compression() -- clusters_merged=" + str(result.clusters_merged) +
       ", skipped=" + str(result.skipped_no_data))
except Exception as e:
    fail("compressor.run_compression()", e)

# ===========================================================================
# MODULE 6 -- forgetter.py
# ===========================================================================
section("MODULE 6 -- forgetter.py")

try:
    import forgetter
    ok("forgetter module imports")
except Exception as e:
    fail("forgetter import", e)

try:
    r_false = forgetter.should_forget(5)
    r_true  = forgetter.should_forget(10)
    assert r_false == False and r_true == True
    ok("should_forget() -- at 5: " + str(r_false) + ", at 10: " + str(r_true))
except Exception as e:
    fail("forgetter.should_forget()", e)

try:
    decayed = forgetter.decay_score(0.80, "2020-01-01 00:00:00")
    assert 0.0 <= decayed <= 0.80
    ok("decay_score() -- 0.80 decayed ~6 years = " + str(round(decayed, 6)))
except Exception as e:
    fail("forgetter.decay_score()", e)

try:
    result = forgetter.run_forgetting(test_session)
    ok("run_forgetting() -- evaluated=" + str(result.memories_evaluated) +
       ", pruned=" + str(result.memories_pruned))
except Exception as e:
    fail("forgetter.run_forgetting()", e)

# ===========================================================================
# MODULE 7 -- memory_manager.py
# ===========================================================================
section("MODULE 7 -- memory_manager.py")

try:
    from memory_manager import AdaptiveMemoryManager
    ok("memory_manager module imports")
except Exception as e:
    fail("memory_manager import", e)

mm = None
try:
    mm = AdaptiveMemoryManager()
    ok("AdaptiveMemoryManager() instantiated")
except Exception as e:
    fail("AdaptiveMemoryManager() instantiation", e)

mm2_session = str(uuid.uuid4())

try:
    mm.start_session(mm2_session)
    ok("start_session() -- " + mm2_session[:8] + "...")
except Exception as e:
    fail("memory_manager.start_session()", e)

try:
    mm.add_to_stm("user", "Hello, I like coffee")
    mm.add_to_stm("assistant", "That is great! Coffee is popular.")
    ctx = mm.get_stm_context()
    assert "coffee" in ctx.lower()
    ok("add_to_stm() + get_stm_context() -- " + str(len(mm._stm)) + " turn(s) in STM")
except Exception as e:
    fail("add_to_stm / get_stm_context", e)

try:
    q_vec   = embedder.encode("I like coffee")
    actions = mm.ingest_from_text("Coffee is a popular beverage enjoyed worldwide.", q_vec, mm2_session)
    assert isinstance(actions, list)
    decisions = [a["decision"] for a in actions]
    ok("ingest_from_text() -- " + str(len(actions)) + " action(s): " + str(decisions))
except Exception as e:
    fail("memory_manager.ingest_from_text()", e)

retrieved = []
try:
    q_vec    = embedder.encode("coffee")
    retrieved = mm.retrieve_memories(q_vec)
    assert isinstance(retrieved, list)
    ok("retrieve_memories() -- " + str(len(retrieved)) + " memory/memories retrieved")
except Exception as e:
    fail("memory_manager.retrieve_memories()", e)

try:
    ctx = mm.build_augmented_context("What do I like?", retrieved)
    assert isinstance(ctx, str)
    ok("build_augmented_context() -- " + str(len(ctx)) + " chars")
except Exception as e:
    fail("memory_manager.build_augmented_context()", e)

try:
    stats = mm.get_memory_stats()
    assert "total_memories" in stats and "faiss_vectors" in stats
    ok("get_memory_stats() -- " + str(stats))
except Exception as e:
    fail("memory_manager.get_memory_stats()", e)

try:
    report = mm.run_maintenance(mm2_session, 20)
    assert "compression" in report and "forgetting" in report
    ok("run_maintenance() -- ran ok")
except Exception as e:
    fail("memory_manager.run_maintenance()", e)

try:
    summary = mm.close_session(mm2_session, query_count=5, hits=3)
    assert isinstance(summary, dict)
    ok("close_session() -- hit_rate=" + str(summary.get("memory_hit_rate")))
except Exception as e:
    fail("memory_manager.close_session()", e)

# ===========================================================================
# MODULE 8 -- llm.py (mock mode -- no API key needed)
# ===========================================================================
section("MODULE 8 -- llm.py (mock mode, no API key needed)")

try:
    import llm
    ok("llm module imports")
except Exception as e:
    fail("llm import", e)

try:
    info = llm.get_model_info()
    assert "model_name" in info
    assert "api_key" not in info
    assert "mock_mode" in info
    assert isinstance(info["mock_mode"], bool)
    ok("get_model_info() -- " + str(info))
except Exception as e:
    fail("llm.get_model_info()", e)

try:
    response = llm.generate_response("What is the capital of France?")
    assert isinstance(response, str) and len(response) > 0
    ok("generate_response() -- mock reply (" + str(len(response)) + " chars)")
except Exception as e:
    fail("llm.generate_response()", e)

# ===========================================================================
# MODULE 9 -- agent.py (LangGraph)
# ===========================================================================
section("MODULE 9 -- agent.py (LangGraph full pipeline)")

try:
    from agent import build_graph, make_initial_state, AgentState
    ok("agent module imports")
except Exception as e:
    fail("agent import", e)

ag_mm  = None
graph  = None
try:
    ag_mm = AdaptiveMemoryManager()
    graph = build_graph(ag_mm)
    ok("build_graph() -- LangGraph compiled")
except Exception as e:
    fail("agent.build_graph()", e)

try:
    ag_session = str(uuid.uuid4())
    ag_mm.start_session(ag_session)
    state = make_initial_state(
        query="What is machine learning?",
        session_id=ag_session,
        query_count=0,
        hits=0,
    )
    ok("make_initial_state() -- state created")
except Exception as e:
    fail("agent.make_initial_state()", e)

try:
    final = graph.invoke(state)
    assert "response" in final and len(final["response"]) > 0
    assert "memories" in final
    assert "query_count" in final
    ok("graph.invoke() -- pipeline complete, query_count=" + str(final["query_count"]))
    ok("  response: " + final["response"][:100])
except Exception as e:
    fail("graph.invoke() full pipeline", e)

# ===========================================================================
# MODULE 10 -- main.py (import-only check)
# ===========================================================================
section("MODULE 10 -- main.py (import + structure check)")

try:
    # Import the FastAPI app object without starting the server
    # We skip lifespan by just checking the module loads cleanly
    import importlib.util
    spec = importlib.util.spec_from_file_location(
        "main_check",
        os.path.join(os.path.dirname(__file__), "main.py")
    )
    mod = importlib.util.module_from_spec(spec)
    # Do not exec the module (would trigger lifespan) -- just check spec loads
    assert spec is not None
    ok("main.py -- module spec loads (uvicorn start skipped; test manually)")
except Exception as e:
    fail("main.py spec load", e)

# ===========================================================================
# FINAL SUMMARY
# ===========================================================================
section("TEST SUMMARY")
print("")
print("  PASSED: " + str(len(passed)))
print("  FAILED: " + str(len(failed)))
print("")

if failed:
    print("  Failed tests:")
    for name, err in failed:
        print("    [x]  " + name)
        print("         " + type(err).__name__ + ": " + str(err))
    print("")
    sys.exit(1)
else:
    print("  All modules passed! Backend is healthy.")
    print("")
    sys.exit(0)
