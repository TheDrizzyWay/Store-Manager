import express from 'express';
import userController from '../controllers/usercontroller';
import { requireAuth, adminAuth } from '../middleware/authmiddleware';
import authValidation from '../validations/authvalidation';

const { logIn, signUp } = userController;
const { logInValid } = authValidation;

const router = express.Router();

router.post('/login', logInValid, logIn);
router.post('/signup', requireAuth, adminAuth, signUp);

export default router;
