"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCommentary = makeCommentary;
/** Build typed commentary rows with stable ids and timestamps. */
function makeCommentary(matchId, lines) {
    return lines.map((line, index) => ({
        id: `${matchId}-c${index + 1}`,
        over: line.over,
        ball: line.ball,
        text: line.text,
        timestamp: new Date(Date.UTC(2026, 6, 24, 14, 30 + index)).toISOString(),
        isWicket: line.isWicket,
        isBoundary: line.isBoundary,
    }));
}
