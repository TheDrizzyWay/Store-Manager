import express from 'express';
import productController from '../controllers/productcontroller';
import { requireAuth, adminAuth } from '../middleware/authmiddleware';
import idValidation from '../validations/idvalidation';
import productValidation from '../validations/productvalidation';

const {
  createProduct, getAllProducts, getProductById, updateProduct, deleteProduct, getProductSales,
} = productController;
const { idValid } = idValidation;
const { createProductValid, updateProductValid } = productValidation;

const router = express.Router();

router.post('/', requireAuth, adminAuth, createProductValid, createProduct);
router.get('/', requireAuth, getAllProducts);
router.get('/records/:id', requireAuth, adminAuth, idValid, getProductSales);
router.get('/:id', requireAuth, idValid, getProductById);
router.put('/:id', requireAuth, adminAuth, idValid, updateProductValid, updateProduct);
router.delete('/:id', requireAuth, adminAuth, idValid, deleteProduct);

export default router;
