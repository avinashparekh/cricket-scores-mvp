import { Request, Response, NextFunction } from 'express';
export { AppError } from '../errors';
export declare function notFoundHandler(_req: Request, res: Response): void;
/**
 * Central error sink so controllers can `next(err)` and always return `{ message }`.
 */
export declare function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction): void;
