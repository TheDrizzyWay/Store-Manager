import express from 'express';
import adminValidator from '../middleware/adminvalidator';
import loggedInValidator from '../middleware/loggedinvalidator';
import categoryController from '../controllers/categorycontroller';
import createCategoryValidator from '../middleware/createcategoryvalidator';

const router = express.Router();

router.get('/', loggedInValidator, categoryController.findAllCategories);
router.get('/:categoryId', loggedInValidator, categoryController.findCategoryById);
router.post('/', loggedInValidator, adminValidator, createCategoryValidator, categoryController.createCategory);
router.put('/:categoryId', loggedInValidator, adminValidator, categoryController.updateCategory);
router.delete('/:categoryId', loggedInValidator, adminValidator, categoryController.deleteCategory);

export default router;
