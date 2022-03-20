import express from 'express';
import * as userController from '../controllers/userController';
import { authHandler } from '../middleware/authHandler';
import joiMiddleware from "../middleware/joiMiddleware";
import { loginSchema } from "../middleware//userValidator";
const router = express.Router();

router.get('/one/:uid', userController.getUserById);
router.get('/check-token',authHandler)
router.put('/:uid', userController.updateUser);
router.delete('/:uid', userController.deleteUser);
router.post('/register', userController.createUser);
router.post('/login',[joiMiddleware(loginSchema)], userController.loginUser);

export default router;
