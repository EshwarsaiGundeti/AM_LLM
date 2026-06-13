import { useState, useEffect, useCallback } from 'react';
import { getStats } from '../api/client';

const STATS_CONFIG = [
  { key: 'total_memories', label: 'Memories', icon: '💾' },
  { key: 'faiss_vectors', label: 'FAISS Vectors', icon: '🔢' },
  { key: 'stm_turns', label: 'STM Turns', icon: '🔄' },
  { key: 'staging_pending', label: 'Staging', icon: '⏳' },
  { key: 'active_sessions', label: 'Sessions', icon: '🟢' },
];

export default function StatsBar() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(false);

  const fetchStats = useCallback(async () => {
    try {
      const data = await getStats();
      setStats(data);
      setError(false);
    } catch {
      setError(true);
    }
  }, []);

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, [fetchStats]);

  return (
    <div className="stats-bar">
      {error && (
        <div className="stats-error">
          <span>⚠️</span>
          <span>Stats unavailable</span>
        </div>
      )}

      {!error && (
        <div className="stats-list">
          {STATS_CONFIG.map(({ key, label, icon }) => (
            <div className="stat-pill" key={key}>
              <span className="stat-pill-icon">{icon}</span>
              <span className="stat-pill-value">
                {stats ? (stats[key] ?? 0) : '—'}
              </span>
              <span className="stat-pill-label">{label}</span>
            </div>
          ))}
        </div>
      )}

      <div className="stats-bar-brand">
        AM-LLM • Adaptive Memory AI
      </div>

      <style>{`
        .stats-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px;
          height: 40px;
          background: rgba(10, 10, 15, 0.98);
          border-top: 1px solid var(--border);
          flex-shrink: 0;
          gap: 12px;
        }

        .stats-list {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: nowrap;
          overflow-x: auto;
        }

        .stat-pill {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 3px 10px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 14px;
          white-space: nowrap;
          transition: all 0.2s ease-in-out;
          cursor: default;
        }

        .stat-pill:hover {
          background: var(--bg-card-hover);
          border-color: var(--border-accent);
        }

        .stat-pill-icon {
          font-size: 0.72rem;
          line-height: 1;
        }

        .stat-pill-value {
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--accent-secondary);
          font-variant-numeric: tabular-nums;
          min-width: 16px;
          text-align: center;
        }

        .stat-pill-label {
          font-size: 0.65rem;
          color: var(--text-muted);
          font-weight: 500;
          letter-spacing: 0.3px;
        }

        .stats-error {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.72rem;
          color: var(--warning);
          opacity: 0.7;
        }

        .stats-bar-brand {
          font-size: 0.63rem;
          color: var(--text-muted);
          letter-spacing: 0.8px;
          font-weight: 500;
          white-space: nowrap;
          opacity: 0.6;
        }
      `}</style>
    </div>
  );
}
