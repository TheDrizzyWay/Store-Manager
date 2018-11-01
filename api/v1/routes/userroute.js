import express from 'express';
import userController from '../controllers/usercontroller';
import { requireAuth, adminAuth } from '../middleware/middleware';

const router = express.Router();

router.post('/signup', requireAuth, adminAuth, userController.createAccount);
router.post('/login', userController.logIn);
router.get('/users', requireAuth, adminAuth, userController.getAllUsers);
router.get('/users/:id', requireAuth, adminAuth, userController.getUserById);
router.delete('/users/:id', requireAuth, adminAuth, userController.deleteUser);

export default router;
