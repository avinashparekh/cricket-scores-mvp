"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.listMatches = listMatches;
exports.getMatch = getMatch;
exports.getScorecard = getScorecard;
exports.getCommentary = getCommentary;
const matchesService = __importStar(require("../services/matches.service"));
const errors_1 = require("../errors");
/**
 * GET /api/matches
 * Optional query: ?status=LIVE|UPCOMING|COMPLETED
 */
function listMatches(req, res, next) {
    try {
        const rawStatus = req.query.status;
        // Express turns repeated keys into an array (?status=a&status=b).
        if (Array.isArray(rawStatus)) {
            throw new errors_1.AppError(errors_1.ErrorCode.INVALID_STATUS_QUERY, 400);
        }
        const status = typeof rawStatus === 'string' ? rawStatus : undefined;
        const data = matchesService.getMatches(status);
        res.json({ data });
    }
    catch (error) {
        next(error);
    }
}
/** GET /api/matches/:matchId */
function getMatch(req, res, next) {
    try {
        const data = matchesService.getMatchById(req.params.matchId);
        res.json({ data });
    }
    catch (error) {
        next(error);
    }
}
/** GET /api/matches/:matchId/scorecard */
function getScorecard(req, res, next) {
    try {
        const data = matchesService.getScorecard(req.params.matchId);
        res.json({ data });
    }
    catch (error) {
        next(error);
    }
}
/** GET /api/matches/:matchId/commentary */
function getCommentary(req, res, next) {
    try {
        const data = matchesService.getCommentary(req.params.matchId);
        res.json({ data });
    }
    catch (error) {
        next(error);
    }
}
