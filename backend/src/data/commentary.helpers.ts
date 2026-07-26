import { CommentaryItem } from '../types/match.types';

export type CommentaryLineInput = {
  over: string;
  ball: number;
  text: string;
  isWicket?: boolean;
  isBoundary?: boolean;
};

/** Build typed commentary rows with stable ids and timestamps. */
export function makeCommentary(
  matchId: string,
  lines: CommentaryLineInput[],
): CommentaryItem[] {
  return lines.map((line, index) => ({
    id: `${matchId}-c${index + 1}`,
    over: line.over,
    ball: line.ball,
    text: line.text,
    timestamp: new Date(Date.UTC(2026, 6, 24, 14, 30 + index)).toISOString(),
    isWicket: line.isWicket,
    isBoundary: line.isBoundary,
  }));
}
