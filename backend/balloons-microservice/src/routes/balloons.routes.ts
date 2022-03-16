import express from 'express';
import * as balloonController from '../controllers/balloonController';
const router = express.Router();
import joiMiddleware from "../middleware/joiMiddleware";
import { balloonSchema } from "../middleware/balloonValidator";

router.get('/:uid', balloonController.getBalloonsForUser);
router.get('/one/:bid', balloonController.getBalloonById);
router.put('/:bid', [joiMiddleware(balloonSchema)], balloonController.updateBalloon);
router.delete('/:bid', balloonController.deleteBalloon);
router.post('/:uid', [joiMiddleware(balloonSchema)],  balloonController.createBalloon); //create balloon for user id

export default router;
