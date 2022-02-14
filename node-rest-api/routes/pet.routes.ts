import express from "express";
import * as petController from '../controllers/petController';
import joiMiddleware  from '../middleware/joiMiddleware';
import  requireUser   from '../middleware/auth';
import  {createSchema, updateSchema}  from '../middleware/petValidators';
const router = express.Router();

router.get('/',requireUser, petController.getAll);
router.get('/under3',requireUser, petController.getAllUnder3);
router.post('/create', [joiMiddleware(createSchema),requireUser],petController.create);
router.put('/update/:id', [joiMiddleware(updateSchema),requireUser], petController.update);
router.delete('/delete/:id',requireUser, petController.deletePet);
router.get('/pet/:id', requireUser,petController.getPetById);

export default router;