import express from 'express';
import productController from '../controllers/productcontroller';
import { requireAuth, userAuth, adminAuth } from '../middleware/middleware';

const router = express.Router();

router.post('/', requireAuth, productController.createProduct);
router.get('/', requireAuth, productController.getAllProducts);
router.get('/:id', requireAuth, productController.getProductById);
router.put('/:id', requireAuth, productController.updateProduct);
router.delete('/:id', requireAuth, productController.deleteProduct);

export default router;
