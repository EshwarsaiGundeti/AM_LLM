const BASE_URL = 'http://127.0.0.1:8001';

async function request(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
    try {
      const errorJson = JSON.parse(errorText);
      errorMessage = errorJson.detail || errorJson.message || errorMessage;
    } catch {
      errorMessage = errorText || errorMessage;
    }
    throw new Error(errorMessage);
  }

  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }
  return response.text();
}

/**
 * Start a new session
 * @returns {Promise<{session_id: string, message: string}>}
 */
export async function startSession() {
  return request('/session/start', {
    method: 'POST',
    body: JSON.stringify({}),
  });
}

/**
 * Send a query within a session
 * @param {string} sessionId
 * @param {string} query
 * @returns {Promise<{session_id, query, response, memories_used, query_count, maintenance_report}>}
 */
export async function sendQuery(sessionId, query) {
  return request('/query', {
    method: 'POST',
    body: JSON.stringify({ session_id: sessionId, query }),
  });
}

/**
 * Close a session
 * @param {string} sessionId
 * @returns {Promise<{session_id, summary, message}>}
 */
export async function closeSession(sessionId) {
  return request('/session/close', {
    method: 'POST',
    body: JSON.stringify({ session_id: sessionId }),
  });
}

/**
 * Get all memories
 * @returns {Promise<{count: number, memories: Array}>}
 */
export async function getMemories() {
  return request('/memories');
}

/**
 * Get system stats
 * @returns {Promise<{total_memories, faiss_vectors, stm_turns, staging_pending, active_sessions}>}
 */
export async function getStats() {
  return request('/stats');
}

/**
 * Get settings
 * @returns {Promise<{provider, model_name, temperature, max_tokens, mock_mode, free_tier, rate_limit}>}
 */
export async function getSettings() {
  return request('/settings');
}

/**
 * Check backend health
 * @returns {Promise<{status, faiss_vectors, db_memories}>}
 */
export async function checkHealth() {
  return request('/health');
}
