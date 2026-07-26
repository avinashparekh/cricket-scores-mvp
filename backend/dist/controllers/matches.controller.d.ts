import { Request, Response, NextFunction } from 'express';
/**
 * GET /api/matches
 * Optional query: ?status=LIVE|UPCOMING|COMPLETED
 */
export declare function listMatches(req: Request, res: Response, next: NextFunction): void;
/** GET /api/matches/:matchId */
export declare function getMatch(req: Request, res: Response, next: NextFunction): void;
/** GET /api/matches/:matchId/scorecard */
export declare function getScorecard(req: Request, res: Response, next: NextFunction): void;
/** GET /api/matches/:matchId/commentary */
export declare function getCommentary(req: Request, res: Response, next: NextFunction): void;
