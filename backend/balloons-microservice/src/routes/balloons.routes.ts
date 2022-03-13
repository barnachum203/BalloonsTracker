import express from 'express';
import * as balloonController from '../controllers/balloonController';
const router = express.Router();

router.get('/:uid', balloonController.getBalloons);
router.get('/one/:bid', balloonController.getBalloonById);
router.put('/:bid', balloonController.updateBalloon);
router.delete('/:bid', balloonController.deleteBalloon);
router.post('/:uid', balloonController.createBalloon); //create balloon for user id

export default router;
