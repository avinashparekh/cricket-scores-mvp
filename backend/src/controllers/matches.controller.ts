import { Request, Response, NextFunction } from 'express';
import * as matchesService from '../services/matches.service';
import { AppError, ErrorCode } from '../errors';

/**
 * GET /api/matches
 * Optional query: ?status=LIVE|UPCOMING|COMPLETED
 */
export function listMatches(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  try {
    const rawStatus = req.query.status;

    // Express turns repeated keys into an array (?status=a&status=b).
    if (Array.isArray(rawStatus)) {
      throw new AppError(ErrorCode.INVALID_STATUS_QUERY, 400);
    }

    const status =
      typeof rawStatus === 'string' ? rawStatus : undefined;
    const data = matchesService.getMatches(status);
    res.json({ data });
  } catch (error) {
    next(error);
  }
}

/** GET /api/matches/:matchId */
export function getMatch(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  try {
    const data = matchesService.getMatchById(req.params.matchId);
    res.json({ data });
  } catch (error) {
    next(error);
  }
}

/** GET /api/matches/:matchId/scorecard */
export function getScorecard(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  try {
    const data = matchesService.getScorecard(req.params.matchId);
    res.json({ data });
  } catch (error) {
    next(error);
  }
}

/** GET /api/matches/:matchId/commentary */
export function getCommentary(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  try {
    const data = matchesService.getCommentary(req.params.matchId);
    res.json({ data });
  } catch (error) {
    next(error);
  }
}
