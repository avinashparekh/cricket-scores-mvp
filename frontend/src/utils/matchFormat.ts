import { MatchStatus } from '../types/match';
import { colors } from '../theme/colors';
import { ClientErrorCode } from '../constants/errorCodes';
import { getClientMessage } from '../constants/errorMessages';

/** Format runs/wickets for list cards and detail header. */
export function formatScore(
  runs: number | null,
  wickets: number | null,
  emptyLabel = getClientMessage(ClientErrorCode.YET_TO_BAT),
): string {
  if (runs === null || wickets === null) {
    return emptyLabel;
  }
  return `${runs}/${wickets}`;
}

export function formatMatchDate(iso: string): string {
  return new Date(iso).toLocaleString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function statusColor(status: MatchStatus): string {
  switch (status) {
    case 'LIVE':
      return colors.live;
    case 'UPCOMING':
      return colors.upcoming;
    case 'COMPLETED':
      return colors.completed;
  }
}

export function statusBadgeColors(status: MatchStatus): {
  bg: string;
  fg: string;
} {
  switch (status) {
    case 'LIVE':
      return { bg: colors.liveSoft, fg: colors.live };
    case 'UPCOMING':
      return { bg: colors.upcomingSoft, fg: colors.upcoming };
    case 'COMPLETED':
      return { bg: colors.completedSoft, fg: colors.completed };
  }
}
