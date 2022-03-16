import express from 'express';
import * as balloonController from '../controllers/balloonController';
const router = express.Router();

router.get('/', balloonController.getBalloons); //Get balloons by user id
router.get('/:bid', balloonController.getBalloonById);// get balloon by balloon id
router.put('/', balloonController.updateBalloon);// update by balloon id
router.delete('/', balloonController.deleteBalloon);// delete by balloon id
router.post('/', balloonController.createBalloon);// create balloon for user id
// /{id}
export default router;
