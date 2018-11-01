import express from 'express';
import categoryController from '../controllers/categorycontroller';
import { requireAuth, attendantAuth, adminAuth } from '../middleware/middleware';

const router = express.Router();

router.post('/', requireAuth, adminAuth, categoryController.createCategory);
router.get('/', requireAuth, categoryController.getAllCategories);
router.get('/:id', requireAuth, categoryController.getCategoryById);
router.put('/:id', requireAuth, adminAuth, categoryController.updateCategory);
router.delete('/:id', requireAuth, adminAuth, categoryController.deleteCategory);

export default router;
