/**
 * Loads the match list for the current filter.
 *
 * Race policy: each request gets an id; only the latest response may update state.
 * Refresh policy: failures keep previous rows so a blip does not blank the list.
 * Soft loading: when we already have rows (e.g. filter change), avoid full-screen spinner.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchMatches } from '../api/matchesApi';
import { ClientErrorCode } from '../constants/errorCodes';
import { getClientMessage } from '../constants/errorMessages';
import { Match, MatchStatus } from '../types/match';

export type MatchFilter = MatchStatus | 'ALL';

interface UseMatchesResult {
  matches: Match[];
  /** True only for the first load when there is nothing to show yet. */
  loading: boolean;
  refreshing: boolean;
  error: string | null;
  reload: () => Promise<void>;
  refresh: () => Promise<void>;
}

export function useMatches(filter: MatchFilter): UseMatchesResult {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const requestIdRef = useRef(0);
  const hasDataRef = useRef(false);

  const load = useCallback(
    async (mode: 'initial' | 'refresh' | 'retry') => {
      const requestId = ++requestIdRef.current;
      const keepExisting = mode === 'refresh' || hasDataRef.current;

      if (mode === 'refresh') {
        setRefreshing(true);
      } else if (!keepExisting) {
        setLoading(true);
      } else {
        // Filter change with prior data: subtle refresh, keep list visible.
        setRefreshing(true);
      }

      setError(null);

      try {
        const data = await fetchMatches(filter);
        if (requestId !== requestIdRef.current) {
          return;
        }
        setMatches(data);
        hasDataRef.current = true;
      } catch (err) {
        if (requestId !== requestIdRef.current) {
          return;
        }
        // Destructive clear only when we have nothing useful to keep on screen.
        if (!keepExisting) {
          setMatches([]);
          hasDataRef.current = false;
        }
        setError(
          err instanceof Error
            ? err.message
            : getClientMessage(ClientErrorCode.LOAD_MATCHES),
        );
      } finally {
        if (requestId === requestIdRef.current) {
          setLoading(false);
          setRefreshing(false);
        }
      }
    },
    [filter],
  );

  useEffect(() => {
    void load('initial');
  }, [load]);

  return {
    matches,
    loading,
    refreshing,
    error,
    reload: () => load('retry'),
    refresh: () => load('refresh'),
  };
}
