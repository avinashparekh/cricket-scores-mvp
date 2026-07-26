import { Request, Response, NextFunction } from 'express';
import { AppError, ErrorCode, getErrorMessage } from '../errors';

export { AppError } from '../errors';

export function notFoundHandler(_req: Request, res: Response): void {
  res.status(404).json({ message: getErrorMessage(ErrorCode.ROUTE_NOT_FOUND) });
}

/**
 * Central error sink so controllers can `next(err)` and always return `{ message }`.
 */
export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ message: err.message });
    return;
  }

  console.error(err);
  res.status(500).json({
    message: getErrorMessage(ErrorCode.INTERNAL_SERVER_ERROR),
  });
}
