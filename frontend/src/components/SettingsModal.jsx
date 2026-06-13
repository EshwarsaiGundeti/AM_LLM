import { useState, useEffect, useRef, useCallback } from 'react';
import { getSettings } from '../api/client';

const SETTINGS_META = [
  { key: 'provider', label: 'Provider', icon: '🏭', type: 'text' },
  { key: 'model_name', label: 'Model Name', icon: '🤖', type: 'text' },
  { key: 'temperature', label: 'Temperature', icon: '🌡️', type: 'number' },
  { key: 'max_tokens', label: 'Max Tokens', icon: '📝', type: 'number' },
  { key: 'mock_mode', label: 'Mock Mode', icon: '🎭', type: 'boolean' },
  { key: 'free_tier', label: 'Free Tier', icon: '🆓', type: 'boolean' },
  { key: 'rate_limit', label: 'Rate Limit', icon: '⏱️', type: 'text' },
];

export default function SettingsModal({ isOpen, onClose }) {
  const [settings, setSettings] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const overlayRef = useRef(null);

  const fetchSettings = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getSettings();
      setSettings(data);
    } catch (err) {
      setError(err.message || 'Failed to load settings');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      fetchSettings();
    }
  }, [isOpen, fetchSettings]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  const renderValue = (key, value, type) => {
    if (type === 'boolean') {
      return (
        <span
          className={`settings-badge ${value ? 'badge-on' : 'badge-off'}`}
        >
          {value ? '✓ Enabled' : '✗ Disabled'}
        </span>
      );
    }
    if (value === null || value === undefined) return <span className="settings-val-null">—</span>;
    return <span className="settings-val">{String(value)}</span>;
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      ref={overlayRef}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label="Settings"
    >
      <div className="modal-container">
        <div className="modal-header">
          <div className="modal-title">
            <span className="modal-title-icon">⚙️</span>
            <span>System Settings</span>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close settings">
            ✕
          </button>
        </div>

        <div className="modal-body">
          {isLoading && (
            <div className="modal-loading">
              <div className="modal-spinner" />
              <p>Loading settings…</p>
            </div>
          )}

          {!isLoading && error && (
            <div className="modal-error">
              <span>⚠️</span>
              <p>{error}</p>
              <button onClick={fetchSettings}>Retry</button>
            </div>
          )}

          {!isLoading && !error && settings && (
            <div className="settings-list">
              {SETTINGS_META.map(({ key, label, icon, type }) => (
                <div className="settings-row" key={key}>
                  <div className="settings-row-label">
                    <span className="settings-row-icon">{icon}</span>
                    <span>{label}</span>
                  </div>
                  <div className="settings-row-value">
                    {renderValue(key, settings[key], type)}
                  </div>
                </div>
              ))}

              {Object.keys(settings).filter(
                (k) => !SETTINGS_META.map((m) => m.key).includes(k)
              ).length > 0 && (
                <div className="settings-extra">
                  <div className="settings-extra-label">Additional Configuration</div>
                  {Object.keys(settings)
                    .filter((k) => !SETTINGS_META.map((m) => m.key).includes(k))
                    .map((k) => (
                      <div className="settings-row" key={k}>
                        <div className="settings-row-label">
                          <span className="settings-row-icon">🔧</span>
                          <span>{k}</span>
                        </div>
                        <div className="settings-row-value">
                          <span className="settings-val">{String(settings[k])}</span>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="modal-footer">
          <p className="modal-footer-note">
            ℹ️ Settings are read-only. Configure via backend environment variables.
          </p>
          <button className="modal-close-footer-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>

      <style>{`
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.2s ease-in-out;
          padding: 20px;
        }

        .modal-container {
          width: 100%;
          max-width: 460px;
          background: #15151e;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-lg);
          box-shadow: 0 24px 64px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(108, 99, 255, 0.1);
          display: flex;
          flex-direction: column;
          max-height: 80vh;
          animation: fadeIn 0.25s ease-in-out;
          overflow: hidden;
        }

        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 24px 16px;
          border-bottom: 1px solid var(--border);
          flex-shrink: 0;
        }

        .modal-title {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .modal-title-icon {
          font-size: 1.1rem;
        }

        .modal-close-btn {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: var(--bg-card);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          color: var(--text-secondary);
          transition: all 0.2s ease-in-out;
        }

        .modal-close-btn:hover {
          background: rgba(248, 113, 113, 0.1);
          border-color: rgba(248, 113, 113, 0.3);
          color: var(--danger);
        }

        .modal-body {
          flex: 1;
          overflow-y: auto;
          padding: 16px 24px;
        }

        .modal-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          padding: 40px 20px;
          color: var(--text-muted);
          font-size: 0.85rem;
        }

        .modal-spinner {
          width: 32px;
          height: 32px;
          border: 3px solid var(--border);
          border-top-color: var(--accent-primary);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        .modal-error {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          padding: 32px 16px;
          text-align: center;
        }

        .modal-error p {
          font-size: 0.82rem;
          color: var(--danger);
        }

        .modal-error button {
          padding: 6px 20px;
          background: rgba(248, 113, 113, 0.1);
          border: 1px solid rgba(248, 113, 113, 0.3);
          border-radius: 20px;
          font-size: 0.78rem;
          color: var(--danger);
          cursor: pointer;
          transition: all 0.2s ease-in-out;
        }

        .settings-list {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .settings-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 12px;
          border-radius: var(--radius-sm);
          transition: background 0.15s ease-in-out;
          gap: 12px;
        }

        .settings-row:hover {
          background: var(--bg-card);
        }

        .settings-row-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.82rem;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .settings-row-icon {
          font-size: 0.85rem;
          width: 20px;
          text-align: center;
          flex-shrink: 0;
        }

        .settings-row-value {
          flex-shrink: 0;
        }

        .settings-val {
          font-size: 0.82rem;
          color: var(--text-primary);
          font-weight: 500;
          font-variant-numeric: tabular-nums;
        }

        .settings-val-null {
          font-size: 0.82rem;
          color: var(--text-muted);
        }

        .settings-badge {
          font-size: 0.72rem;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 12px;
          letter-spacing: 0.3px;
        }

        .badge-on {
          background: rgba(74, 222, 128, 0.12);
          color: var(--success);
          border: 1px solid rgba(74, 222, 128, 0.3);
        }

        .badge-off {
          background: rgba(85, 85, 102, 0.2);
          color: var(--text-muted);
          border: 1px solid var(--border);
        }

        .settings-extra {
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px solid var(--border);
        }

        .settings-extra-label {
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          color: var(--text-muted);
          font-weight: 600;
          margin-bottom: 8px;
          padding: 0 12px;
        }

        .modal-footer {
          padding: 14px 24px 20px;
          border-top: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          flex-shrink: 0;
        }

        .modal-footer-note {
          font-size: 0.7rem;
          color: var(--text-muted);
          line-height: 1.4;
          flex: 1;
        }

        .modal-close-footer-btn {
          padding: 8px 20px;
          background: var(--accent-gradient);
          border-radius: 20px;
          font-size: 0.82rem;
          font-weight: 600;
          color: white;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
          flex-shrink: 0;
          box-shadow: 0 2px 12px rgba(108, 99, 255, 0.3);
        }

        .modal-close-footer-btn:hover {
          box-shadow: 0 4px 20px rgba(108, 99, 255, 0.5);
          transform: translateY(-1px);
        }
      `}</style>
    </div>
  );
}
