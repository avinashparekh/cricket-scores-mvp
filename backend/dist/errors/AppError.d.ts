import { ErrorCode } from './errorCodes';
/** Domain/HTTP error with a stable status code for the error middleware. */
export declare class AppError extends Error {
    statusCode: number;
    code: ErrorCode;
    constructor(code: ErrorCode, statusCode: number, ...messageArgs: string[]);
}
