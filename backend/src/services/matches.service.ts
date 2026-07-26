import { commentaries, matches, scorecards } from '../data';
import { AppError, ErrorCode, VALID_STATUSES } from '../errors';
import {
  CommentaryResponse,
  Match,
  MatchStatus,
  Scorecard,
} from '../types/match.types';

/**
 * Business rules for match lookups.
 * Controllers stay thin; all validation and filtering lives here.
 */
export function getMatches(status?: string): Match[] {
  if (!status) {
    return matches;
  }

  const normalized = status.toUpperCase();
  if (!VALID_STATUSES.includes(normalized as MatchStatus)) {
    throw new AppError(ErrorCode.INVALID_STATUS, 400);
  }

  const matchStatus = normalized as MatchStatus;
  return matches.filter((match) => match.status === matchStatus);
}

export function getMatchById(matchId: string): Match {
  const match = matches.find((item) => item.id === matchId);
  if (!match) {
    throw new AppError(ErrorCode.MATCH_NOT_FOUND, 404, matchId);
  }
  return match;
}

export function getScorecard(matchId: string): Scorecard {
  getMatchById(matchId);
  const scorecard = scorecards[matchId];
  if (!scorecard) {
    throw new AppError(ErrorCode.SCORECARD_NOT_AVAILABLE, 404, matchId);
  }
  return scorecard;
}

export function getCommentary(matchId: string): CommentaryResponse {
  getMatchById(matchId);
  const items = commentaries[matchId];
  // Missing key or empty list both mean "not available" for the MVP.
  if (!items || items.length === 0) {
    throw new AppError(ErrorCode.COMMENTARY_NOT_AVAILABLE, 404, matchId);
  }
  return { matchId, items };
}
