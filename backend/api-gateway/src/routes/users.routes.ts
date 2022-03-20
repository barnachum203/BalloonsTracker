import express from 'express';
import * as userController from '../controllers/userController';
import requireUser from '../middleware/auth'
const router = express.Router();

router.put('/', userController.updateUser);
router.delete('/', userController.deleteUser);
router.post('/register', userController.createUser);
router.post('/login', userController.loginUser);

export default router;
