import { ErrorCode } from './errorCodes';
import { MatchStatus } from '../types/match.types';
declare const VALID_STATUSES: MatchStatus[];
/**
 * Single source of truth for API error messages (DRY).
 * Use with AppError so controllers/services never hardcode strings.
 */
export declare const ErrorMessages: Record<ErrorCode, string | ((...args: string[]) => string)>;
/** Resolve a code to a concrete message string. */
export declare function getErrorMessage(code: ErrorCode, ...args: string[]): string;
export { VALID_STATUSES };
