import express from 'express';
import productController from '../controllers/productcontroller';
import { requireAuth, adminAuth } from '../middleware/authmiddleware';
import idValidation from '../validations/idvalidation';

const {
  createProduct, getAllProducts, getProductById, updateProduct, deleteProduct,
} = productController;
const { idValid } = idValidation;

const router = express.Router();

router.post('/', requireAuth, adminAuth, createProduct);
router.get('/', requireAuth, getAllProducts);
router.get('/:id', requireAuth, idValid, getProductById);
router.put('/:id', requireAuth, adminAuth, idValid, updateProduct);
router.delete('/:id', requireAuth, adminAuth, idValid, deleteProduct);

export default router;
