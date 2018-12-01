import express from 'express';
import userController from '../controllers/usercontroller';
import { requireAuth } from '../middleware/authmiddleware';

const router = express.Router();

router.post('/login', userController.logIn);

export default router;
