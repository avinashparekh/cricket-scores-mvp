import { CommentaryItem } from '../types/match.types';
export type CommentaryLineInput = {
    over: string;
    ball: number;
    text: string;
    isWicket?: boolean;
    isBoundary?: boolean;
};
/** Build typed commentary rows with stable ids and timestamps. */
export declare function makeCommentary(matchId: string, lines: CommentaryLineInput[]): CommentaryItem[];
