import { useState, useEffect, useCallback } from 'react';
import { startSession } from '../api/client';

/**
 * Custom hook to manage session lifecycle.
 * Auto-starts a session on mount.
 * @returns {{ sessionId: string|null, isReady: boolean, error: string|null, restartSession: Function }}
 */
export function useSession() {
  const [sessionId, setSessionId] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState(null);

  const initSession = useCallback(async () => {
    setIsReady(false);
    setError(null);
    setSessionId(null);
    try {
      const data = await startSession();
      setSessionId(data.session_id);
      setIsReady(true);
    } catch (err) {
      setError(err.message || 'Failed to start session');
      setIsReady(false);
    }
  }, []);

  useEffect(() => {
    initSession();
  }, [initSession]);

  return {
    sessionId,
    isReady,
    error,
    restartSession: initSession,
  };
}
