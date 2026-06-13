export default function TypingIndicator() {
  return (
    <div className="typing-indicator-wrapper">
      <div className="typing-avatar">🧠</div>
      <div className="typing-bubble">
        <span className="dot" style={{ animationDelay: '0ms' }} />
        <span className="dot" style={{ animationDelay: '160ms' }} />
        <span className="dot" style={{ animationDelay: '320ms' }} />
      </div>

      <style>{`
        .typing-indicator-wrapper {
          display: flex;
          align-items: flex-end;
          gap: 10px;
          animation: fadeIn 0.3s ease-in-out;
          padding: 4px 0;
        }

        .typing-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(108, 99, 255, 0.15);
          border: 1px solid var(--border-accent);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
          flex-shrink: 0;
        }

        .typing-bubble {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 12px 16px;
          background: var(--glass);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-lg);
          border-bottom-left-radius: 4px;
        }

        .dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--accent-secondary);
          opacity: 0.7;
          display: inline-block;
          animation: bounce 1.2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
