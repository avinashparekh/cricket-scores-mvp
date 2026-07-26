"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorCode = void 0;
/**
 * Stable error codes used across services, controllers, and middleware.
 */
var ErrorCode;
(function (ErrorCode) {
    ErrorCode["INVALID_STATUS"] = "INVALID_STATUS";
    ErrorCode["INVALID_STATUS_QUERY"] = "INVALID_STATUS_QUERY";
    ErrorCode["MATCH_NOT_FOUND"] = "MATCH_NOT_FOUND";
    ErrorCode["SCORECARD_NOT_AVAILABLE"] = "SCORECARD_NOT_AVAILABLE";
    ErrorCode["COMMENTARY_NOT_AVAILABLE"] = "COMMENTARY_NOT_AVAILABLE";
    ErrorCode["ROUTE_NOT_FOUND"] = "ROUTE_NOT_FOUND";
    ErrorCode["INTERNAL_SERVER_ERROR"] = "INTERNAL_SERVER_ERROR";
})(ErrorCode || (exports.ErrorCode = ErrorCode = {}));
