import express from 'express';
import userController from '../controllers/usercontroller';
import { requireAuth, adminAuth } from '../middleware/authmiddleware';

const { logIn, signUp } = userController;
const router = express.Router();

router.post('/login', logIn);
router.post('/signup', requireAuth, adminAuth, signUp);

export default router;
