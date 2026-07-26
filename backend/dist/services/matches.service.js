"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMatches = getMatches;
exports.getMatchById = getMatchById;
exports.getScorecard = getScorecard;
exports.getCommentary = getCommentary;
const data_1 = require("../data");
const errors_1 = require("../errors");
/**
 * Business rules for match lookups.
 * Controllers stay thin; all validation and filtering lives here.
 */
function getMatches(status) {
    if (!status) {
        return data_1.matches;
    }
    const normalized = status.toUpperCase();
    if (!errors_1.VALID_STATUSES.includes(normalized)) {
        throw new errors_1.AppError(errors_1.ErrorCode.INVALID_STATUS, 400);
    }
    const matchStatus = normalized;
    return data_1.matches.filter((match) => match.status === matchStatus);
}
function getMatchById(matchId) {
    const match = data_1.matches.find((item) => item.id === matchId);
    if (!match) {
        throw new errors_1.AppError(errors_1.ErrorCode.MATCH_NOT_FOUND, 404, matchId);
    }
    return match;
}
function getScorecard(matchId) {
    getMatchById(matchId);
    const scorecard = data_1.scorecards[matchId];
    if (!scorecard) {
        throw new errors_1.AppError(errors_1.ErrorCode.SCORECARD_NOT_AVAILABLE, 404, matchId);
    }
    return scorecard;
}
function getCommentary(matchId) {
    getMatchById(matchId);
    const items = data_1.commentaries[matchId];
    // Missing key or empty list both mean "not available" for the MVP.
    if (!items || items.length === 0) {
        throw new errors_1.AppError(errors_1.ErrorCode.COMMENTARY_NOT_AVAILABLE, 404, matchId);
    }
    return { matchId, items };
}
