import express from 'express';
import userController from '../controllers/usercontroller';
import { adminAuth } from '../middleware/middleware';

const router = express.Router();

router.post('/signup', adminAuth, userController.createAccount);
router.post('/login', userController.logIn);
router.get('/users', /*adminAuth,*/ userController.getAllUsers);

export default router;
