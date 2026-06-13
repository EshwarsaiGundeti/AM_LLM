import { useState, useCallback } from 'react';
import { useSession } from './hooks/useSession';
import Header from './components/Header';
import ChatInterface from './components/ChatInterface';
import MemoryPanel from './components/MemoryPanel';
import StatsBar from './components/StatsBar';
import SettingsModal from './components/SettingsModal';

export default function App() {
  const { sessionId, isReady, error: sessionError, restartSession } = useSession();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [memoryHighlighted, setMemoryHighlighted] = useState(0);
  const [activeTab, setActiveTab] = useState('chat');

  const handleMemoryHighlight = useCallback(() => {
    setMemoryHighlighted((prev) => prev + 1);
  }, []);

  return (
    <div className="app-root">
      <Header onSettingsOpen={() => setIsSettingsOpen(true)} />

      {sessionError && (
        <div className="session-error-banner">
          <span>⚠️ Session error: {sessionError}</span>
          <button onClick={restartSession}>Reconnect</button>
        </div>
      )}

      {/* Tab bar */}
      <div className="app-tabs">
        <button
          className={`app-tab ${activeTab === 'chat' ? 'active' : ''}`}
          onClick={() => setActiveTab('chat')}
        >
          💬 Chat
        </button>
        <button
          className={`app-tab ${activeTab === 'memory' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('memory');
            setMemoryHighlighted((prev) => prev + 1);
          }}
        >
          💾 Long-Term Memory
        </button>
      </div>

      {/* Tab panels */}
      <div className="app-body">
        <div className={`app-tab-panel ${activeTab === 'chat' ? 'visible' : ''}`}>
          <ChatInterface
            sessionId={sessionId}
            isReady={isReady}
            onMemoryHighlight={() => {
              handleMemoryHighlight();
              setActiveTab('memory');
            }}
          />
        </div>
        <div className={`app-tab-panel ${activeTab === 'memory' ? 'visible' : ''}`}>
          <MemoryPanel highlighted={memoryHighlighted} />
        </div>
      </div>

      <StatsBar />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      <style>{`
        .app-root {
          display: flex;
          flex-direction: column;
          height: 100vh;
          overflow: hidden;
        }

        .session-error-banner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          padding: 8px 20px;
          background: rgba(248, 113, 113, 0.1);
          border-bottom: 1px solid rgba(248, 113, 113, 0.2);
          font-size: 0.8rem;
          color: var(--danger);
          animation: fadeIn 0.3s ease-in-out;
          flex-shrink: 0;
        }

        .session-error-banner button {
          padding: 4px 14px;
          background: rgba(248, 113, 113, 0.15);
          border: 1px solid rgba(248, 113, 113, 0.3);
          border-radius: 14px;
          font-size: 0.75rem;
          color: var(--danger);
          cursor: pointer;
          transition: all 0.2s ease-in-out;
        }

        .session-error-banner button:hover {
          background: rgba(248, 113, 113, 0.25);
        }

        /* ── Tab bar ── */
        .app-tabs {
          display: flex;
          align-items: center;
          background: rgba(17, 17, 24, 0.95);
          border-bottom: 1px solid var(--border);
          padding: 0 24px;
          flex-shrink: 0;
          gap: 4px;
        }

        .app-tab {
          padding: 12px 20px;
          background: none;
          border: none;
          border-bottom: 2px solid transparent;
          color: var(--text-muted);
          font-size: 0.82rem;
          font-weight: 600;
          font-family: var(--font);
          letter-spacing: 0.04em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
          white-space: nowrap;
          margin-bottom: -1px;
        }

        .app-tab:hover {
          color: var(--text-secondary);
        }

        .app-tab.active {
          color: var(--accent-secondary);
          border-bottom-color: var(--accent-primary);
        }

        /* ── Body / panels ── */
        .app-body {
          flex: 1;
          overflow: hidden;
          min-height: 0;
          position: relative;
        }

        .app-tab-panel {
          display: none;
          height: 100%;
          flex-direction: column;
          overflow: hidden;
        }

        .app-tab-panel.visible {
          display: flex;
        }
      `}</style>
    </div>
  );
}
