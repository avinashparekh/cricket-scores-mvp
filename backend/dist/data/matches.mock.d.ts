import { CommentaryItem, Match, Scorecard } from '../types/match.types';
/**
 * In-memory cricket fixtures for the MVP.
 * LIVE / COMPLETED matches also appear in `scorecards` + `commentaries`.
 * UPCOMING matches intentionally omit those maps so the API returns 404.
 */
export declare const matches: Match[];
/** Scorecards for LIVE and COMPLETED matches only (keys match `matches[].id`). */
export declare const scorecards: Record<string, Scorecard>;
/** Ball-by-ball lines for LIVE and COMPLETED matches only. */
export declare const commentaries: Record<string, CommentaryItem[]>;
