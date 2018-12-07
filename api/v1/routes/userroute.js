import express from 'express';
import userController from '../controllers/usercontroller';
import { requireAuth, adminAuth } from '../middleware/authmiddleware';

const { getAllUsers, getUserById } = userController;
const router = express.Router();

/*

router.delete('/:id', requireAuth, adminAuth, userController.deleteUser); */
router.get('/', requireAuth, adminAuth, getAllUsers);
router.get('/:id', requireAuth, adminAuth, getUserById);
export default router;
