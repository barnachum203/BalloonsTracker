import express from 'express';
import * as userController from '../controllers/userController';

const router = express.Router();

router.put('/put/one', userController.updateUser);
router.delete('/del/one', userController.deleteUser);
router.post('/register', userController.createUser);
router.post('/login', userController.loginUser);

export default router;
