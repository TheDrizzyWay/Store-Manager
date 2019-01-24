import express from 'express';
import CategoryController from '../controllers/categorycontroller';
import { requireAuth, adminAuth } from '../middleware/authmiddleware';
import idValidation from '../validations/idvalidation';
import categoryValidation from '../validations/categoryvalidation';

const {
  createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory,
} = CategoryController;
const { idValid } = idValidation;
const { createCategoryValid } = categoryValidation;
const router = express.Router();

router.post('/', requireAuth, adminAuth, createCategoryValid, createCategory);
router.get('/', requireAuth, getAllCategories);
router.get('/:id', requireAuth, idValid, getCategoryById);
router.put('/:id', requireAuth, adminAuth, idValid, createCategoryValid, updateCategory);
router.delete('/:id', requireAuth, adminAuth, idValid, deleteCategory);

export default router;
