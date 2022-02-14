import express from "express";
import * as userController  from '../controllers/userController';
import joiMiddleware  from '../middleware/joiMiddleware';
import { registerSchema, loginSchema }  from '../middleware/userValidators';
import  requireUser   from '../middleware/auth';
const router = express.Router();

router.get('/',requireUser, userController.getAll);
router.post('/register', [joiMiddleware(registerSchema)],userController.register);
router.put('/update/:id', requireUser, userController.update);
router.post('/login',[joiMiddleware(loginSchema)], userController.login);
router.delete('/delete/:id',requireUser, userController.deleteUser);
router.get('/user/:id', requireUser,userController.getUserById);

export default router;