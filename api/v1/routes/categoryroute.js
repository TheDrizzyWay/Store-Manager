import express from 'express';
import categoryController from '../controllers/categorycontroller';
import { requireAuth, adminAuth } from '../middleware/authmiddleware';
import idValidation from '../validations/idvalidation';

const {
  createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory,
} = categoryController;
const { idValid } = idValidation;
const router = express.Router();

router.post('/', requireAuth, adminAuth, createCategory);
router.get('/', requireAuth, getAllCategories);
router.get('/:id', requireAuth, idValid, getCategoryById);
router.put('/:id', requireAuth, adminAuth, idValid, updateCategory);
router.delete('/:id', requireAuth, adminAuth, idValid, deleteCategory);

export default router;
