import express from 'express';
import userController from '../controllers/usercontroller';
import { requireAuth, adminAuth } from '../middleware/authmiddleware';

const {
  getAllUsers, getUserById, getCurrentUser, deleteUser,
} = userController;

const router = express.Router();

router.get('/', requireAuth, adminAuth, getAllUsers);
router.get('/profile', requireAuth, getCurrentUser);
router.get('/:id', requireAuth, adminAuth, getUserById);
router.delete('/:id', requireAuth, adminAuth, deleteUser);

export default router;
