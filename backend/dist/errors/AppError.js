"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
const errorMessages_1 = require("./errorMessages");
/** Domain/HTTP error with a stable status code for the error middleware. */
class AppError extends Error {
    statusCode;
    code;
    constructor(code, statusCode, ...messageArgs) {
        super((0, errorMessages_1.getErrorMessage)(code, ...messageArgs));
        this.statusCode = statusCode;
        this.code = code;
        this.name = 'AppError';
    }
}
exports.AppError = AppError;
