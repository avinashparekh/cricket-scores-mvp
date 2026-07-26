import { CommentaryResponse, Match, Scorecard } from '../types/match.types';
/**
 * Business rules for match lookups.
 * Controllers stay thin; all validation and filtering lives here.
 */
export declare function getMatches(status?: string): Match[];
export declare function getMatchById(matchId: string): Match;
export declare function getScorecard(matchId: string): Scorecard;
export declare function getCommentary(matchId: string): CommentaryResponse;
