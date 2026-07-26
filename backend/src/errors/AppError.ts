import { ErrorCode } from './errorCodes';
import { getErrorMessage } from './errorMessages';

/** Domain/HTTP error with a stable status code for the error middleware. */
export class AppError extends Error {
  statusCode: number;
  code: ErrorCode;

  constructor(code: ErrorCode, statusCode: number, ...messageArgs: string[]) {
    super(getErrorMessage(code, ...messageArgs));
    this.statusCode = statusCode;
    this.code = code;
    this.name = 'AppError';
  }
}
