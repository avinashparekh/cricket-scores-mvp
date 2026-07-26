import { ErrorCode } from './errorCodes';
import { MatchStatus } from '../types/match.types';

const VALID_STATUSES: MatchStatus[] = ['LIVE', 'UPCOMING', 'COMPLETED'];

/**
 * Single source of truth for API error messages (DRY).
 * Use with AppError so controllers/services never hardcode strings.
 */
export const ErrorMessages: Record<ErrorCode, string | ((...args: string[]) => string)> = {
  [ErrorCode.INVALID_STATUS]: () =>
    `Invalid status. Allowed values: ${VALID_STATUSES.join(', ')}`,
  [ErrorCode.INVALID_STATUS_QUERY]:
    'Invalid status query. Provide a single status value.',
  [ErrorCode.MATCH_NOT_FOUND]: (matchId: string) =>
    `Match not found: ${matchId}`,
  [ErrorCode.SCORECARD_NOT_AVAILABLE]: (matchId: string) =>
    `Scorecard not available for match: ${matchId}`,
  [ErrorCode.COMMENTARY_NOT_AVAILABLE]: (matchId: string) =>
    `Commentary not available for match: ${matchId}`,
  [ErrorCode.ROUTE_NOT_FOUND]: 'Route not found',
  [ErrorCode.INTERNAL_SERVER_ERROR]: 'Internal server error',
};

/** Resolve a code to a concrete message string. */
export function getErrorMessage(
  code: ErrorCode,
  ...args: string[]
): string {
  const entry = ErrorMessages[code];
  if (typeof entry === 'function') {
    return entry(...args);
  }
  return entry;
}

export { VALID_STATUSES };
