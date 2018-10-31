import express from 'express';
import productController from '../controllers/productcontroller';
import { adminAuth, authenticate } from '../middleware/middleware';
import database from '../database';

const router = express.Router();

const checkProductId = router.param('id', async (req, res, next, id) => {
  try {
    const result = await database.query('SELECT id FROM products WHERE id = $1', [id]);
    if (result.rowCount <= 0) {
      res.status(404).send({ message: `Product with ID "${id}" was not found` });
      return;
    }
    next();
  } catch ({ message }) {
    res.status(500).send({ error: { message: 'Database error while getting product' } });
  }
});

router.post('/', authenticate, adminAuth, productController.createProduct);
router.get('/', authenticate, productController.getAllProducts);
router.get('/:id', authenticate, checkProductId, productController.getProductById);
router.put('/:id', authenticate, adminAuth, checkProductId, productController.updateProduct);
router.delete('/:id', authenticate, adminAuth, checkProductId, productController.deleteProduct);

export default router;
