import express from 'express';
import userController from '../controllers/usercontroller';
import { requireAuth, adminAuth } from '../middleware/authmiddleware';

const { getAllUsers } = userController;
const router = express.Router();

/*
router.get('/:id', requireAuth, adminAuth, userController.getUserById);
router.delete('/:id', requireAuth, adminAuth, userController.deleteUser); */
router.get('/', requireAuth, adminAuth, getAllUsers);
export default router;
