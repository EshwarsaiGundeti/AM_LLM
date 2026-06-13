import { useState, useEffect, useRef, useCallback } from 'react';
import { sendQuery } from '../api/client';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

const EXAMPLE_QUERIES = [
  'What is adaptive memory in AI systems?',
  'Explain how FAISS vector search works',
  'What makes a memory important in this system?',
  'How does long-term memory differ from short-term memory here?',
];

export default function ChatInterface({ sessionId, isReady, onMemoryHighlight }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  const handleSend = useCallback(async (queryText) => {
    const query = (queryText || inputValue).trim();
    if (!query || !sessionId || isLoading) return;

    setInputValue('');
    setError(null);

    const userMsg = {
      id: Date.now(),
      role: 'user',
      content: query,
      memoriesUsed: [],
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const data = await sendQuery(sessionId, query);
      const assistantMsg = {
        id: Date.now() + 1,
        role: 'assistant',
        content: data.response,
        memoriesUsed: data.memories_used || [],
        timestamp: new Date(),
        queryCount: data.query_count,
        maintenanceReport: data.maintenance_report,
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      setError(err.message || 'Failed to get response');
      const errorMsg = {
        id: Date.now() + 1,
        role: 'assistant',
        content: `⚠️ Error: ${err.message || 'Failed to get response. Please check if the backend is running.'}`,
        memoriesUsed: [],
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [inputValue, sessionId, isLoading]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  const handleExampleClick = (q) => {
    setInputValue(q);
    inputRef.current?.focus();
  };

  const isEmpty = messages.length === 0;

  return (
    <div className="chat-interface">
      <div className="chat-messages">
        {isEmpty && !isLoading && (
          <div className="chat-empty-state">
            <div className="empty-brain">🧠</div>
            <h2 className="empty-title">AM-LLM is ready</h2>
            <p className="empty-subtitle">
              {isReady
                ? 'Your session is active. Ask me anything — I remember across conversations.'
                : 'Connecting to backend…'}
            </p>
            {isReady && (
              <div className="example-queries">
                <p className="example-label">Try asking:</p>
                <div className="example-list">
                  {EXAMPLE_QUERIES.map((q) => (
                    <button
                      key={q}
                      className="example-chip"
                      onClick={() => handleExampleClick(q)}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="messages-list">
          {messages.map((msg) => (
            <div key={msg.id} className="message-row">
              <MessageBubble
                role={msg.role}
                content={msg.content}
                memoriesUsed={msg.memoriesUsed}
                timestamp={msg.timestamp}
              />
              {msg.memoriesUsed?.length > 0 && (
                <button
                  className="highlight-memory-btn"
                  onClick={onMemoryHighlight}
                  title="View in Memory Panel"
                  style={{ alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', marginLeft: msg.role === 'user' ? 0 : '42px' }}
                >
                  View in Memory Panel →
                </button>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="message-row">
              <TypingIndicator />
            </div>
          )}
        </div>

        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-area">
        {error && (
          <div className="chat-error">
            <span>⚠️ {error}</span>
            <button onClick={() => setError(null)}>✕</button>
          </div>
        )}
        <div className={`chat-input-row ${!isReady ? 'disabled' : ''}`}>
          <textarea
            ref={inputRef}
            className="chat-textarea"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isReady ? 'Ask anything… (Enter to send, Shift+Enter for newline)' : 'Starting session…'}
            disabled={!isReady || isLoading}
            rows={1}
          />
          <button
            className="send-btn"
            onClick={() => handleSend()}
            disabled={!isReady || isLoading || !inputValue.trim()}
            title="Send message"
            aria-label="Send message"
          >
            {isLoading ? (
              <span className="send-spinner">⟳</span>
            ) : (
              <span className="send-icon">➤</span>
            )}
          </button>
        </div>
        <div className="chat-footer-hint">
          {isReady ? `Session active • Press Enter to send` : 'Initializing session…'}
        </div>
      </div>

      <style>{`
        .chat-interface {
          display: flex;
          flex-direction: column;
          height: 100%;
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
          filter: drop-shadow(0 0 20px rgba(108, 99, 255, 0.5));
          animation: glow 3s ease-in-out infinite;
        }

        .empty-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 10px;
        }

        .empty-subtitle {
          font-size: 0.9rem;
          color: var(--text-secondary);
          max-width: 400px;
          line-height: 1.6;
          margin-bottom: 32px;
        }

        .example-queries {
          width: 100%;
          max-width: 520px;
        }

        .example-label {
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-bottom: 12px;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          font-weight: 500;
        }

        .example-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .example-chip {
          padding: 10px 16px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
          font-size: 0.83rem;
          text-align: left;
          transition: all 0.2s ease-in-out;
          cursor: pointer;
        }

        .example-chip:hover {
          background: var(--bg-card-hover);
          border-color: var(--border-accent);
          color: var(--text-primary);
          transform: translateX(4px);
        }

        .messages-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          width: 100%;
        }

        .message-row {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .highlight-memory-btn {
          font-size: 0.68rem;
          color: var(--accent-secondary);
          background: none;
          border: none;
          cursor: pointer;
          opacity: 0.6;
          transition: opacity 0.2s ease-in-out;
          padding: 0 4px;
        }

        .highlight-memory-btn:hover {
          opacity: 1;
          text-decoration: underline;
        }

        .chat-input-area {
          padding: 16px 20px;
          background: rgba(17, 17, 24, 0.95);
          border-top: 1px solid var(--border);
          flex-shrink: 0;
        }

        .chat-error {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 14px;
          background: rgba(248, 113, 113, 0.1);
          border: 1px solid rgba(248, 113, 113, 0.3);
          border-radius: var(--radius-sm);
          font-size: 0.8rem;
          color: var(--danger);
          margin-bottom: 10px;
          animation: fadeIn 0.2s ease-in-out;
        }

        .chat-error button {
          color: var(--danger);
          font-size: 0.85rem;
          opacity: 0.7;
          transition: opacity 0.2s;
        }

        .chat-error button:hover {
          opacity: 1;
        }

        .chat-input-row {
          display: flex;
          align-items: flex-end;
          gap: 12px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 8px 8px 8px 16px;
          transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
        }

        .chat-input-row:focus-within {
          border-color: var(--border-accent);
          box-shadow: 0 0 0 3px rgba(108, 99, 255, 0.1);
        }

        .chat-input-row.disabled {
          opacity: 0.5;
        }

        .chat-textarea {
          flex: 1;
          background: transparent;
          color: var(--text-primary);
          font-size: 0.9rem;
          line-height: 1.6;
          resize: none;
          max-height: 160px;
          overflow-y: auto;
          padding: 4px 0;
          border: none;
          outline: none;
        }

        .chat-textarea::placeholder {
          color: var(--text-muted);
        }

        .send-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--accent-gradient);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          flex-shrink: 0;
          transition: all 0.2s ease-in-out;
          box-shadow: 0 2px 12px rgba(108, 99, 255, 0.4);
        }

        .send-btn:hover:not(:disabled) {
          transform: scale(1.08);
          box-shadow: 0 4px 20px rgba(108, 99, 255, 0.6);
        }

        .send-btn:active:not(:disabled) {
          transform: scale(0.95);
        }

        .send-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
          box-shadow: none;
        }

        .send-icon {
          color: white;
          font-size: 0.9rem;
          transform: translateX(1px);
        }

        .send-spinner {
          color: white;
          font-size: 1.1rem;
          animation: spin 1s linear infinite;
          display: inline-block;
        }

        .chat-footer-hint {
          margin-top: 8px;
          font-size: 0.67rem;
          color: var(--text-muted);
          text-align: center;
          letter-spacing: 0.3px;
        }
      `}</style>
    </div>
  );
}
