"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VALID_STATUSES = exports.ErrorMessages = void 0;
exports.getErrorMessage = getErrorMessage;
const errorCodes_1 = require("./errorCodes");
const VALID_STATUSES = ['LIVE', 'UPCOMING', 'COMPLETED'];
exports.VALID_STATUSES = VALID_STATUSES;
/**
 * Single source of truth for API error messages (DRY).
 * Use with AppError so controllers/services never hardcode strings.
 */
exports.ErrorMessages = {
    [errorCodes_1.ErrorCode.INVALID_STATUS]: () => `Invalid status. Allowed values: ${VALID_STATUSES.join(', ')}`,
    [errorCodes_1.ErrorCode.INVALID_STATUS_QUERY]: 'Invalid status query. Provide a single status value.',
    [errorCodes_1.ErrorCode.MATCH_NOT_FOUND]: (matchId) => `Match not found: ${matchId}`,
    [errorCodes_1.ErrorCode.SCORECARD_NOT_AVAILABLE]: (matchId) => `Scorecard not available for match: ${matchId}`,
    [errorCodes_1.ErrorCode.COMMENTARY_NOT_AVAILABLE]: (matchId) => `Commentary not available for match: ${matchId}`,
    [errorCodes_1.ErrorCode.ROUTE_NOT_FOUND]: 'Route not found',
    [errorCodes_1.ErrorCode.INTERNAL_SERVER_ERROR]: 'Internal server error',
};
/** Resolve a code to a concrete message string. */
function getErrorMessage(code, ...args) {
    const entry = exports.ErrorMessages[code];
    if (typeof entry === 'function') {
        return entry(...args);
    }
    return entry;
}
