import express from 'express';
import * as balloonController from '../controllers/balloonController';
const router = express.Router();

router.get('/get/all', balloonController.getBalloons);
router.get('/get/one', balloonController.getBalloonById);
router.put('/put/one', balloonController.updateBalloon);
router.delete('/del/one', balloonController.deleteBalloon);
router.post('/post/one', balloonController.createBalloon);

export default router;
