import express from 'express';
import userController from '../controllers/usercontroller';
import { requireAuth, adminAuth } from '../middleware/authmiddleware';

const router = express.Router();

/*
router.get('/', requireAuth, adminAuth, userController.getAllUsers);
router.get('/:id', requireAuth, adminAuth, userController.getUserById);
router.delete('/:id', requireAuth, adminAuth, userController.deleteUser); */
router.post('/signup', requireAuth, adminAuth, userController.signUp);

export default router;
