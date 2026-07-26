"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
exports.notFoundHandler = notFoundHandler;
exports.errorHandler = errorHandler;
const errors_1 = require("../errors");
var errors_2 = require("../errors");
Object.defineProperty(exports, "AppError", { enumerable: true, get: function () { return errors_2.AppError; } });
function notFoundHandler(_req, res) {
    res.status(404).json({ message: (0, errors_1.getErrorMessage)(errors_1.ErrorCode.ROUTE_NOT_FOUND) });
}
/**
 * Central error sink so controllers can `next(err)` and always return `{ message }`.
 */
function errorHandler(err, _req, res, _next) {
    if (err instanceof errors_1.AppError) {
        res.status(err.statusCode).json({ message: err.message });
        return;
    }
    console.error(err);
    res.status(500).json({
        message: (0, errors_1.getErrorMessage)(errors_1.ErrorCode.INTERNAL_SERVER_ERROR),
    });
}
