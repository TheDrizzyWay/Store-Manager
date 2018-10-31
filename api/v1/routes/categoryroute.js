import express from 'express';
import categoryController from '../controllers/categorycontroller';
import { adminAuth, authenticate } from '../middleware/middleware';
import database from '../database';

const router = express.Router();

const checkCategoryId = router.param('id', async (req, res, next, id) => {
  try {
    const result = await database.query('SELECT id FROM categories WHERE id = $1', [id]);
    if (result.rowCount <= 0) {
      res.status(404).send({ message: `Category with ID "${id}" was not found` });
      return;
    }
    next();
  } catch ({ message }) {
    res.status(500).send({ error: { message: 'Database error while getting category' } });
  }
});

router.post('/', authenticate, adminAuth, categoryController.createCategory);
router.get('/', authenticate, categoryController.getAllCategories);
router.get('/:id', authenticate, checkCategoryId, categoryController.getCategoryById);
router.put('/:id', authenticate, adminAuth, checkCategoryId, categoryController.updateCategory);
router.delete('/:id', authenticate, adminAuth, checkCategoryId, categoryController.deleteCategory);

export default router;
