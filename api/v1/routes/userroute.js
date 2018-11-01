import express from 'express';
import userController from '../controllers/usercontroller';
import { requireAuth, userAuth, adminAuth } from '../middleware/middleware';

const router = express.Router();

router.post('/signup', userController.createAccount);
router.post('/login', userController.logIn);
router.get('/users', requireAuth, userController.getAllUsers);
router.get('/users/:id', requireAuth, userController.getUserById);
router.delete('/users/:id', requireAuth, userController.deleteUser);

export default router;
