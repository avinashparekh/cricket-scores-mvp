import { Router } from 'express';
import * as matchesController from '../controllers/matches.controller';

const router = Router();

// Register concrete paths before `/:matchId` so Express does not swallow them.
router.get('/', matchesController.listMatches);
router.get('/:matchId/scorecard', matchesController.getScorecard);
router.get('/:matchId/commentary', matchesController.getCommentary);
router.get('/:matchId', matchesController.getMatch);

export default router;
