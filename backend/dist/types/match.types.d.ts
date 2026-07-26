export type MatchStatus = 'LIVE' | 'UPCOMING' | 'COMPLETED';
export interface TeamScore {
    name: string;
    shortName: string;
    runs: number | null;
    wickets: number | null;
    overs: number | null;
}
export interface Match {
    id: string;
    teamA: TeamScore;
    teamB: TeamScore;
    status: MatchStatus;
    venue: string;
    startTime: string;
    summary: string;
    format: string;
}
export interface BatterRow {
    name: string;
    runs: number;
    balls: number;
    fours: number;
    sixes: number;
    strikeRate: number;
    dismissal: string;
}
export interface BowlerRow {
    name: string;
    overs: number;
    maidens: number;
    runs: number;
    wickets: number;
    economy: number;
}
export interface InningsScorecard {
    battingTeam: string;
    bowlingTeam: string;
    totalRuns: number;
    wickets: number;
    overs: number;
    extras: number;
    batters: BatterRow[];
    bowlers: BowlerRow[];
}
export interface Scorecard {
    matchId: string;
    innings: InningsScorecard[];
}
export interface CommentaryItem {
    id: string;
    over: string;
    ball: number;
    text: string;
    timestamp: string;
    isWicket?: boolean;
    isBoundary?: boolean;
}
export interface CommentaryResponse {
    matchId: string;
    items: CommentaryItem[];
}
