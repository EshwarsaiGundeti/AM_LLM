import { useState } from 'react';

function formatTimestamp(date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function MemorySnippet({ memory }) {
  return (
    <div className="memory-snippet">
      <span className="memory-snippet-score" title="Current score">
        {(memory.current_score ?? memory.importance_score ?? 0).toFixed(2)}
      </span>
      <span className="memory-snippet-text">
        {memory.text?.slice(0, 120)}{memory.text?.length > 120 ? '…' : ''}
      </span>
    </div>
  );
}

export default function MessageBubble({ role, content, memoriesUsed = [], timestamp }) {
  const [memoriesExpanded, setMemoriesExpanded] = useState(false);
  const isUser = role === 'user';
  const hasMemories = memoriesUsed && memoriesUsed.length > 0;

  return (
    <div className={`message-wrapper ${isUser ? 'user' : 'assistant'}`}>
      {!isUser && (
        <div className="message-avatar">🧠</div>
      )}

      <div className="message-content-group">
        <div className={`message-bubble ${isUser ? 'user-bubble' : 'assistant-bubble'}`}>
          <div className="message-text">{content}</div>
        </div>

        <div className={`message-meta ${isUser ? 'meta-right' : 'meta-left'}`}>
          <span className="message-timestamp">{formatTimestamp(timestamp)}</span>

          {hasMemories && !isUser && (
            <button
              className="memory-chip"
              onClick={() => setMemoriesExpanded(!memoriesExpanded)}
              title="Click to see memories used"
            >
              🧠 {memoriesUsed.length} {memoriesUsed.length === 1 ? 'memory' : 'memories'} used
              <span className="memory-chip-arrow">{memoriesExpanded ? '▲' : '▼'}</span>
            </button>
          )}
        </div>

        {hasMemories && !isUser && memoriesExpanded && (
          <div className="memories-collapse">
            <div className="memories-collapse-header">
              <span>Referenced Memories</span>
            </div>
            <div className="memories-collapse-list">
              {memoriesUsed.map((m, i) => (
                <MemorySnippet key={m.id || i} memory={m} />
              ))}
            </div>
          </div>
        )}
      </div>

      {isUser && (
        <div className="message-avatar user-avatar">👤</div>
      )}

      <style>{`
        .message-wrapper {
          display: flex;
          align-items: flex-end;
          gap: 10px;
          animation: fadeIn 0.35s ease-in-out;
          max-width: 100%;
        }

        .message-wrapper.user {
          flex-direction: row-reverse;
        }

        .message-wrapper.assistant {
          flex-direction: row;
        }

        .message-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(108, 99, 255, 0.15);
          border: 1px solid var(--border-accent);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.85rem;
          flex-shrink: 0;
          margin-bottom: 22px;
        }

        .user-avatar {
          background: rgba(167, 139, 250, 0.15);
          border-color: rgba(167, 139, 250, 0.3);
        }

        .message-content-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
          max-width: calc(100% - 80px);
        }

        .message-bubble {
          padding: 12px 16px;
          border-radius: var(--radius-lg);
          line-height: 1.65;
          font-size: 0.9rem;
          word-break: break-word;
          white-space: pre-wrap;
        }

        .user-bubble {
          background: var(--accent-gradient);
          color: #fff;
          border-bottom-right-radius: 4px;
          box-shadow: 0 4px 16px rgba(108, 99, 255, 0.3);
          animation: slideInRight 0.3s ease-in-out;
        }

        .assistant-bubble {
          background: var(--glass);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid var(--glass-border);
          color: var(--text-primary);
          border-bottom-left-radius: 4px;
          box-shadow: var(--shadow);
          animation: slideInLeft 0.3s ease-in-out;
        }

        .message-text {
          line-height: 1.7;
        }

        .message-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .meta-right {
          justify-content: flex-end;
        }

        .meta-left {
          justify-content: flex-start;
        }

        .message-timestamp {
          font-size: 0.68rem;
          color: var(--text-muted);
        }

        .memory-chip {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 2px 10px;
          background: rgba(108, 99, 255, 0.1);
          border: 1px solid var(--border-accent);
          border-radius: 12px;
          font-size: 0.7rem;
          color: var(--accent-secondary);
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
        }

        .memory-chip:hover {
          background: rgba(108, 99, 255, 0.2);
          border-color: var(--accent-primary);
        }

        .memory-chip-arrow {
          font-size: 0.55rem;
          opacity: 0.7;
        }

        .memories-collapse {
          background: rgba(108, 99, 255, 0.06);
          border: 1px solid var(--border-accent);
          border-radius: var(--radius-sm);
          overflow: hidden;
          animation: fadeIn 0.2s ease-in-out;
        }

        .memories-collapse-header {
          padding: 7px 12px;
          font-size: 0.7rem;
          font-weight: 600;
          color: var(--accent-secondary);
          border-bottom: 1px solid var(--border-accent);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .memories-collapse-list {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .memory-snippet {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          padding: 8px 12px;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          transition: background 0.15s ease-in-out;
        }

        .memory-snippet:last-child {
          border-bottom: none;
        }

        .memory-snippet:hover {
          background: rgba(108, 99, 255, 0.08);
        }

        .memory-snippet-score {
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--accent-primary);
          background: rgba(108, 99, 255, 0.15);
          padding: 2px 6px;
          border-radius: 6px;
          flex-shrink: 0;
          margin-top: 1px;
          font-variant-numeric: tabular-nums;
        }

        .memory-snippet-text {
          font-size: 0.75rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }
      `}</style>
    </div>
  );
}
