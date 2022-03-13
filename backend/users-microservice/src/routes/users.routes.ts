import express from 'express';
import * as userController from '../controllers/userController';
const router = express.Router();

router.get('/:uid', userController.getUsers);
router.get('/one/:bid', userController.getUserById);
router.put('/:bid', userController.updateUser);
router.delete('/:bid', userController.deleteUser);
router.post('/:uid', userController.createUser); //create user for user id

export default router;
