import { apiGet } from './client';
import {
  ApiItemResponse,
  ApiListResponse,
  CommentaryResponse,
  Match,
  MatchStatus,
  Scorecard,
} from '../types/match';

export async function fetchMatches(status?: MatchStatus | 'ALL'): Promise<Match[]> {
  const query =
    status && status !== 'ALL'
      ? `?status=${encodeURIComponent(status)}`
      : '';
  const response = await apiGet<ApiListResponse<Match>>(`/api/matches${query}`);
  return response.data;
}

export async function fetchMatch(matchId: string): Promise<Match> {
  const response = await apiGet<ApiItemResponse<Match>>(
    `/api/matches/${encodeURIComponent(matchId)}`,
  );
  return response.data;
}

export async function fetchScorecard(matchId: string): Promise<Scorecard> {
  const response = await apiGet<ApiItemResponse<Scorecard>>(
    `/api/matches/${encodeURIComponent(matchId)}/scorecard`,
  );
  return response.data;
}

export async function fetchCommentary(
  matchId: string,
): Promise<CommentaryResponse> {
  const response = await apiGet<ApiItemResponse<CommentaryResponse>>(
    `/api/matches/${encodeURIComponent(matchId)}/commentary`,
  );
  return response.data;
}
