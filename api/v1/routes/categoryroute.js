import express from 'express';
import categoryController from '../controllers/categorycontroller';
import authenticate from '../helpers/jwt';

const router = express.Router();

router.post('/', authenticate.admin, categoryController.createCategory);
router.get('/', authenticate.user, categoryController.getAllCategories);
router.get('/:id', authenticate.user, categoryController.getCategoryById);
router.put('/:id', authenticate.admin, categoryController.updateCategory);
router.delete('/:id', authenticate.admin, categoryController.deleteCategory);

export default router;
