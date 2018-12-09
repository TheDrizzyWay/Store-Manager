import express from 'express';
import productController from '../controllers/productcontroller';
import { requireAuth, adminAuth } from '../middleware/authmiddleware';

const { createProduct } = productController;
const router = express.Router();

router.post('/', requireAuth, adminAuth, createProduct);
/*
router.get('/', requireAuth, productController.getAllProducts);
router.get('/:id', requireAuth, productController.getProductById);
router.put('/:id', requireAuth, adminAuth, productController.updateProduct);
router.delete('/:id', requireAuth, adminAuth, productController.deleteProduct);
*/

export default router;
