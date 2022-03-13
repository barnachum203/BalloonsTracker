import express from 'express';
import * as userController from '../controllers/userController';
const router = express.Router();

router.get('/one/:uid', userController.getUserById);
router.put('/:uid', userController.updateUser);
router.delete('/:uid', userController.deleteUser);
router.post('/register', userController.createUser);
router.post('/login', userController.loginUser);

export default router;
