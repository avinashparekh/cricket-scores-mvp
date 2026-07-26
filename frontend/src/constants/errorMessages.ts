import { ClientErrorCode } from './errorCodes';

/**
 * Single source of truth for mobile user-facing strings.
 */
export const ClientErrorMessages: Record<ClientErrorCode, string> = {
  [ClientErrorCode.LOAD_MATCHES]: 'Failed to load matches',
  [ClientErrorCode.LOAD_MATCH_DETAILS]: 'Failed to load match details',
  [ClientErrorCode.LOAD_SCORECARD]: 'Failed to load scorecard',
  [ClientErrorCode.LOAD_COMMENTARY]: 'Failed to load commentary',
  [ClientErrorCode.REQUEST_TIMEOUT]: 'Request timed out. Please try again.',
  [ClientErrorCode.NETWORK_UNREACHABLE]:
    'Unable to reach the server. Check that the API is running.',
  [ClientErrorCode.REQUEST_FAILED]: 'Request failed',
  [ClientErrorCode.GENERIC_TITLE]: 'Something went wrong',
  [ClientErrorCode.MATCH_NOT_FOUND]: 'Match not found',
  [ClientErrorCode.FETCHING_MATCHES]: 'Fetching matches…',
  [ClientErrorCode.LOADING_MATCH_DETAILS]: 'Loading match details…',
  [ClientErrorCode.NO_MATCHES_TITLE]: 'No matches',
  [ClientErrorCode.SCORECARD_UNAVAILABLE_TITLE]: 'Scorecard unavailable',
  [ClientErrorCode.SCORECARD_UNAVAILABLE_BODY]:
    'This match does not have a scorecard yet.',
  [ClientErrorCode.SCORECARD_EMPTY_TITLE]: 'No scorecard',
  [ClientErrorCode.SCORECARD_EMPTY_BODY]:
    'Scorecard data is not available for this match.',
  [ClientErrorCode.COMMENTARY_UNAVAILABLE_TITLE]: 'Commentary unavailable',
  [ClientErrorCode.COMMENTARY_UNAVAILABLE_BODY]:
    'Ball-by-ball commentary is not available for this match yet.',
  [ClientErrorCode.COMMENTARY_EMPTY_TITLE]: 'No commentary',
  [ClientErrorCode.COMMENTARY_EMPTY_BODY]:
    'There is no commentary for this match.',
  [ClientErrorCode.REFRESH_HINT]: ' — pull or tap Refresh to retry.',
  [ClientErrorCode.YET_TO_BAT]: 'Yet to bat',
};

export function getClientMessage(code: ClientErrorCode): string {
  return ClientErrorMessages[code];
}

/** Empty-list copy that includes the active filter label. */
export function noMatchesMessage(filterLabel: string): string {
  const prefix = filterLabel ? `${filterLabel} ` : '';
  return `No ${prefix}matches found. Pull to refresh or try another filter.`;
}
