/**
 * Loads match detail + optional scorecard/commentary.
 *
 * 404 on scorecard/commentary → "unavailable" (upcoming fixtures).
 * Other failures → section error message (not empty copy).
 * Refresh failures keep the last good match payload on screen.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  fetchCommentary,
  fetchMatch,
  fetchScorecard,
} from '../api/matchesApi';
import { ApiError } from '../api/client';
import { ClientErrorCode } from '../constants/errorCodes';
import { getClientMessage } from '../constants/errorMessages';
import {
  CommentaryItem,
  Match,
  Scorecard,
} from '../types/match';

interface UseMatchDetailResult {
  match: Match | null;
  scorecard: Scorecard | null;
  commentary: CommentaryItem[];
  scorecardUnavailable: boolean;
  commentaryUnavailable: boolean;
  scorecardError: string | null;
  commentaryError: string | null;
  loading: boolean;
  refreshing: boolean;
  error: string | null;
  reload: () => Promise<void>;
  refresh: () => Promise<void>;
}

function errorMessage(reason: unknown, fallback: string): string {
  return reason instanceof Error ? reason.message : fallback;
}

export function useMatchDetail(matchId: string): UseMatchDetailResult {
  const [match, setMatch] = useState<Match | null>(null);
  const [scorecard, setScorecard] = useState<Scorecard | null>(null);
  const [commentary, setCommentary] = useState<CommentaryItem[]>([]);
  const [scorecardUnavailable, setScorecardUnavailable] = useState(false);
  const [commentaryUnavailable, setCommentaryUnavailable] = useState(false);
  const [scorecardError, setScorecardError] = useState<string | null>(null);
  const [commentaryError, setCommentaryError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const requestIdRef = useRef(0);
  const hasMatchRef = useRef(false);

  const load = useCallback(
    async (mode: 'initial' | 'refresh' | 'retry') => {
      const requestId = ++requestIdRef.current;
      const keepExisting = mode === 'refresh' || hasMatchRef.current;

      if (mode === 'refresh' || keepExisting) {
        setRefreshing(true);
        if (!keepExisting) {
          setLoading(true);
        }
      } else {
        setLoading(true);
      }

      setError(null);

      try {
        const matchData = await fetchMatch(matchId);
        if (requestId !== requestIdRef.current) {
          return;
        }
        setMatch(matchData);
        hasMatchRef.current = true;

        const [scorecardResult, commentaryResult] = await Promise.allSettled([
          fetchScorecard(matchId),
          fetchCommentary(matchId),
        ]);

        if (requestId !== requestIdRef.current) {
          return;
        }

        if (scorecardResult.status === 'fulfilled') {
          setScorecard(scorecardResult.value);
          setScorecardUnavailable(false);
          setScorecardError(null);
        } else {
          const reason = scorecardResult.reason;
          const is404 = reason instanceof ApiError && reason.status === 404;
          setScorecard(null);
          setScorecardUnavailable(is404);
          setScorecardError(
            is404
              ? null
              : errorMessage(
                  reason,
                  getClientMessage(ClientErrorCode.LOAD_SCORECARD),
                ),
          );
        }

        if (commentaryResult.status === 'fulfilled') {
          setCommentary(commentaryResult.value.items);
          setCommentaryUnavailable(false);
          setCommentaryError(null);
        } else {
          const reason = commentaryResult.reason;
          const is404 = reason instanceof ApiError && reason.status === 404;
          setCommentary([]);
          setCommentaryUnavailable(is404);
          setCommentaryError(
            is404
              ? null
              : errorMessage(
                  reason,
                  getClientMessage(ClientErrorCode.LOAD_COMMENTARY),
                ),
          );
        }
      } catch (err) {
        if (requestId !== requestIdRef.current) {
          return;
        }
        if (!keepExisting) {
          setMatch(null);
          setScorecard(null);
          setCommentary([]);
          hasMatchRef.current = false;
        }
        setError(
          err instanceof Error
            ? err.message
            : getClientMessage(ClientErrorCode.LOAD_MATCH_DETAILS),
        );
      } finally {
        if (requestId === requestIdRef.current) {
          setLoading(false);
          setRefreshing(false);
        }
      }
    },
    [matchId],
  );

  useEffect(() => {
    hasMatchRef.current = false;
    void load('initial');
  }, [load]);

  return {
    match,
    scorecard,
    commentary,
    scorecardUnavailable,
    commentaryUnavailable,
    scorecardError,
    commentaryError,
    loading,
    refreshing,
    error,
    reload: () => load('retry'),
    refresh: () => load('refresh'),
  };
}
