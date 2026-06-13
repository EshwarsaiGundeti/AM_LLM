import { useState, useEffect } from 'react';
import { checkHealth, getSettings } from '../api/client';

export default function Header({ onSettingsOpen }) {
  const [health, setHealth] = useState(null);
  const [modelName, setModelName] = useState(null);
  const [healthError, setHealthError] = useState(false);

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const data = await checkHealth();
        setHealth(data);
        setHealthError(false);
      } catch {
        setHealthError(true);
      }
    };

    const fetchSettings = async () => {
      try {
        const data = await getSettings();
        setModelName(data.model_name || 'Unknown model');
      } catch {
        setModelName('Unknown model');
      }
    };

    fetchHealth();
    fetchSettings();

    const interval = setInterval(fetchHealth, 15000);
    return () => clearInterval(interval);
  }, []);

  const isHealthy = health && (health.status === 'healthy' || health.status === 'ok') && !healthError;

  return (
    <header className="header">
      <div className="header-left">
        <div className="header-brand">
          <span className="header-brain-icon">🧠</span>
          <div className="header-titles">
            <h1 className="header-title">AM-LLM</h1>
            <p className="header-subtitle">Adaptive Memory-Augmented Language Model</p>
          </div>
        </div>
      </div>

      <div className="header-right">
        {modelName && (
          <div className="header-model-badge">
            <span className="model-icon">⚡</span>
            <span className="model-name">{modelName}</span>
          </div>
        )}

        <div className="health-indicator" title={isHealthy ? `Backend healthy — ${health?.faiss_vectors ?? 0} vectors, ${health?.db_memories ?? 0} memories` : 'Backend unavailable'}>
          <span className={`health-dot ${isHealthy ? 'healthy' : 'unhealthy'}`} />
          <span className="health-label">{isHealthy ? 'Online' : 'Offline'}</span>
        </div>

        <button className="settings-btn" onClick={onSettingsOpen} title="Open Settings" aria-label="Open Settings">
          <span className="settings-icon">⚙️</span>
        </button>
      </div>

      <style>{`
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
          height: 64px;
          background: rgba(17, 17, 24, 0.9);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border);
          position: sticky;
          top: 0;
          z-index: 100;
          flex-shrink: 0;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .header-brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .header-brain-icon {
          font-size: 28px;
          filter: drop-shadow(0 0 8px rgba(108, 99, 255, 0.6));
          animation: glow 3s ease-in-out infinite;
        }

        .header-titles {
          display: flex;
          flex-direction: column;
          gap: 1px;
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
        }

        .header-subtitle {
          font-size: 0.68rem;
          color: var(--text-muted);
          font-weight: 400;
          letter-spacing: 0.3px;
          line-height: 1;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .header-model-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 5px 12px;
          background: rgba(108, 99, 255, 0.12);
          border: 1px solid var(--border-accent);
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--accent-secondary);
        }

        .model-icon {
          font-size: 0.8rem;
        }

        .model-name {
          font-family: 'Inter', monospace;
          letter-spacing: 0.2px;
        }

        .health-indicator {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 5px 12px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 20px;
          cursor: default;
          transition: background 0.2s ease-in-out;
        }

        .health-indicator:hover {
          background: var(--bg-card-hover);
        }

        .health-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .health-dot.healthy {
          background: var(--success);
          box-shadow: 0 0 6px var(--success);
          animation: pulse 2s ease-in-out infinite;
        }

        .health-dot.unhealthy {
          background: var(--danger);
          box-shadow: 0 0 6px var(--danger);
        }

        .health-label {
          font-size: 0.72rem;
          font-weight: 500;
          color: var(--text-secondary);
        }

        .settings-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--bg-card);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          transition: all 0.2s ease-in-out;
        }

        .settings-btn:hover {
          background: var(--bg-card-hover);
          border-color: var(--border-accent);
          transform: rotate(30deg);
        }

        .settings-btn:active {
          transform: rotate(60deg) scale(0.95);
        }

        .settings-icon {
          line-height: 1;
        }
      `}</style>
    </header>
  );
}
