"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCommentary = exports.commentaries = exports.scorecards = exports.matches = void 0;
/**
 * Mock cricket data barrel — keep datasets in separate files for DRY / maintainability.
 */
var matches_data_1 = require("./matches.data");
Object.defineProperty(exports, "matches", { enumerable: true, get: function () { return matches_data_1.matches; } });
var scorecards_data_1 = require("./scorecards.data");
Object.defineProperty(exports, "scorecards", { enumerable: true, get: function () { return scorecards_data_1.scorecards; } });
var commentaries_data_1 = require("./commentaries.data");
Object.defineProperty(exports, "commentaries", { enumerable: true, get: function () { return commentaries_data_1.commentaries; } });
var commentary_helpers_1 = require("./commentary.helpers");
Object.defineProperty(exports, "makeCommentary", { enumerable: true, get: function () { return commentary_helpers_1.makeCommentary; } });
