function getScoreColor(score) {
  if (score >= 0.7) return 'var(--success)';
  if (score >= 0.4) return 'var(--warning)';
  return 'var(--danger)';
}

function getScoreLabel(score) {
  if (score >= 0.7) return 'High';
  if (score >= 0.4) return 'Medium';
  return 'Low';
}

function formatDate(dateStr) {
  if (!dateStr) return 'Unknown';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export default function MemoryCard({ memory }) {
  const score = memory.current_score ?? memory.importance_score ?? 0;
  const scoreColor = getScoreColor(score);
  const scoreLabel = getScoreLabel(score);
  const text = memory.text || '';
  const displayText = text.length > 100 ? text.slice(0, 100) + '…' : text;

  return (
    <div className="memory-card" style={{ '--score-color': scoreColor }}>
      <div className="memory-card-header">
        <div className="memory-card-id">
          <span className="memory-id-badge">#{String(memory.id ?? memory.faiss_id ?? '?').slice(-4)}</span>
        </div>
        <div className="memory-card-score-info">
          <span className="score-label-badge" style={{ color: scoreColor, borderColor: scoreColor, background: `${scoreColor}18` }}>
            {scoreLabel}
          </span>
          <span className="score-number">{score.toFixed(3)}</span>
        </div>
      </div>

      <div className="memory-card-text" title={text}>
        {displayText}
      </div>

      <div className="memory-score-bar-container">
        <div
          className="memory-score-bar"
          style={{
            width: `${Math.min(100, Math.max(0, score * 100))}%`,
            background: scoreColor,
          }}
        />
      </div>

      <div className="memory-card-footer">
        <div className="memory-stat">
          <span className="memory-stat-icon">👁️</span>
          <span className="memory-stat-value">{memory.access_count ?? 0}</span>
        </div>

        <div className="memory-stat" title="Created at">
          <span className="memory-stat-icon">🕐</span>
          <span className="memory-stat-value">{formatDate(memory.created_at)}</span>
        </div>
      </div>

      <style>{`
        .memory-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 12px 14px;
          transition: all 0.2s ease-in-out;
          cursor: default;
          position: relative;
          overflow: hidden;
        }

        .memory-card::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: var(--score-color);
          border-radius: 3px 0 0 3px;
        }

        .memory-card:hover {
          background: var(--bg-card-hover);
          border-color: rgba(255, 255, 255, 0.12);
          transform: translateY(-1px);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
        }

        .memory-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .memory-id-badge {
          font-size: 0.65rem;
          color: var(--text-muted);
          font-variant-numeric: tabular-nums;
          letter-spacing: 0.5px;
          font-weight: 600;
        }

        .memory-card-score-info {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .score-label-badge {
          font-size: 0.63rem;
          font-weight: 700;
          padding: 2px 7px;
          border-radius: 10px;
          border: 1px solid;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .score-number {
          font-size: 0.7rem;
          color: var(--text-muted);
          font-variant-numeric: tabular-nums;
          font-weight: 600;
        }

        .memory-card-text {
          font-size: 0.8rem;
          color: var(--text-secondary);
          line-height: 1.55;
          margin-bottom: 10px;
        }

        .memory-score-bar-container {
          height: 3px;
          background: rgba(255, 255, 255, 0.06);
          border-radius: 2px;
          margin-bottom: 10px;
          overflow: hidden;
        }

        .memory-score-bar {
          height: 100%;
          border-radius: 2px;
          transition: width 0.6s ease-in-out;
          opacity: 0.8;
        }

        .memory-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }

        .memory-stat {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .memory-stat-icon {
          font-size: 0.7rem;
        }

        .memory-stat-value {
          font-size: 0.67rem;
          color: var(--text-muted);
          font-variant-numeric: tabular-nums;
        }
      `}</style>
    </div>
  );
}
