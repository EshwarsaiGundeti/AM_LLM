import { useState, useEffect, useCallback, useRef } from 'react';
import { getMemories } from '../api/client';
import MemoryCard from './MemoryCard';

export default function MemoryPanel({ highlighted }) {
  const [memories, setMemories] = useState([]);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const panelRef = useRef(null);

  const fetchMemories = useCallback(async (isManual = false) => {
    if (isManual) setIsRefreshing(true);
    setError(null);
    try {
      const data = await getMemories();
      setMemories(data.memories || []);
      setCount(data.count ?? (data.memories || []).length);
    } catch (err) {
      setError(err.message || 'Failed to load memories');
    } finally {
      setIsLoading(false);
      if (isManual) setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchMemories();
    const interval = setInterval(() => fetchMemories(), 10000);
    return () => clearInterval(interval);
  }, [fetchMemories]);

  useEffect(() => {
    if (highlighted && panelRef.current) {
      panelRef.current.classList.add('panel-highlight');
      setTimeout(() => panelRef.current?.classList.remove('panel-highlight'), 1200);
    }
  }, [highlighted]);

  return (
    <div className="memory-panel" ref={panelRef}>
      <div className="memory-panel-header">
        <div className="memory-panel-title">
          <span className="memory-panel-icon">💾</span>
          <span>Long-Term Memory</span>
          <span className="memory-count-badge">{count}</span>
        </div>
        <button
          className={`memory-refresh-btn ${isRefreshing ? 'spinning' : ''}`}
          onClick={() => fetchMemories(true)}
          title="Refresh memories"
          disabled={isRefreshing}
          aria-label="Refresh memories"
        >
          ↻
        </button>
      </div>

      <div className="memory-panel-body">
        {isLoading && (
          <div className="memory-loading">
            <div className="loading-dots">
              <span /><span /><span />
            </div>
            <p>Loading memories…</p>
          </div>
        )}

        {!isLoading && error && (
          <div className="memory-error">
            <span className="memory-error-icon">⚠️</span>
            <p>{error}</p>
            <button onClick={() => fetchMemories(true)}>Retry</button>
          </div>
        )}

        {!isLoading && !error && memories.length === 0 && (
          <div className="memory-empty">
            <div className="memory-empty-icon">🌱</div>
            <p className="memory-empty-title">No memories yet</p>
            <p className="memory-empty-sub">
              Memories will form as you have more conversations. Keep chatting!
            </p>
          </div>
        )}

        {!isLoading && !error && memories.length > 0 && (
          <div className="memory-list">
            {memories.map((memory) => (
              <MemoryCard key={memory.id ?? memory.faiss_id} memory={memory} />
            ))}
          </div>
        )}
      </div>

      <style>{`
        .memory-panel {
          display: flex;
          flex-direction: column;
          height: 100%;
          background: var(--bg-secondary);
          overflow: hidden;
          transition: box-shadow 0.3s ease-in-out;
        }

        .memory-panel.panel-highlight {
          box-shadow: inset 0 0 0 2px var(--accent-primary);
          animation: glow 0.6s ease-in-out 2;
        }

        .memory-panel-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 16px 12px;
          border-bottom: 1px solid var(--border);
          flex-shrink: 0;
          background: rgba(17, 17, 24, 0.8);
        }

        .memory-panel-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--text-primary);
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }

        .memory-panel-icon {
          font-size: 0.9rem;
        }

        .memory-count-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 22px;
          height: 18px;
          padding: 0 6px;
          background: rgba(108, 99, 255, 0.2);
          border: 1px solid var(--border-accent);
          border-radius: 9px;
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--accent-secondary);
          font-variant-numeric: tabular-nums;
        }

        .memory-refresh-btn {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: var(--bg-card);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          color: var(--text-secondary);
          transition: all 0.2s ease-in-out;
          line-height: 1;
        }

        .memory-refresh-btn:hover:not(:disabled) {
          background: var(--bg-card-hover);
          color: var(--accent-secondary);
          border-color: var(--border-accent);
        }

        .memory-refresh-btn.spinning {
          animation: spin 0.8s linear infinite;
        }

        .memory-panel-body {
          flex: 1;
          overflow-y: auto;
          padding: 12px;
        }

        .memory-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 40px 20px;
          color: var(--text-muted);
          font-size: 0.8rem;
        }

        .loading-dots {
          display: flex;
          gap: 6px;
        }

        .loading-dots span {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--accent-primary);
          animation: bounce 1.2s ease-in-out infinite;
        }

        .loading-dots span:nth-child(2) {
          animation-delay: 160ms;
        }

        .loading-dots span:nth-child(3) {
          animation-delay: 320ms;
        }

        .memory-error {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          padding: 32px 16px;
          text-align: center;
        }

        .memory-error-icon {
          font-size: 1.8rem;
        }

        .memory-error p {
          font-size: 0.78rem;
          color: var(--danger);
          line-height: 1.5;
        }

        .memory-error button {
          padding: 6px 16px;
          background: rgba(248, 113, 113, 0.1);
          border: 1px solid rgba(248, 113, 113, 0.3);
          border-radius: 20px;
          font-size: 0.75rem;
          color: var(--danger);
          cursor: pointer;
          transition: all 0.2s ease-in-out;
        }

        .memory-error button:hover {
          background: rgba(248, 113, 113, 0.2);
        }

        .memory-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 48px 20px;
          text-align: center;
          animation: fadeIn 0.3s ease-in-out;
        }

        .memory-empty-icon {
          font-size: 2.5rem;
          margin-bottom: 4px;
        }

        .memory-empty-title {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .memory-empty-sub {
          font-size: 0.75rem;
          color: var(--text-muted);
          line-height: 1.6;
          max-width: 200px;
        }

        .memory-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
          animation: fadeIn 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}
