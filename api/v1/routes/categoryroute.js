import express from 'express';
import categoryController from '../controllers/categorycontroller';
import { requireAuth, adminAuth } from '../middleware/authmiddleware';
import idValidation from '../validations/idvalidation';

const { createCategory, getAllCategories, getCategoryById } = categoryController;
const { idValid } = idValidation;
const router = express.Router();

router.post('/', requireAuth, adminAuth, createCategory);
router.get('/', requireAuth, getAllCategories);
router.get('/:id', requireAuth, idValid, getCategoryById);
/*
router.put('/:id', requireAuth, adminAuth, categoryController.updateCategory);
router.delete('/:id', requireAuth, adminAuth, categoryController.deleteCategory); */

export default router;
