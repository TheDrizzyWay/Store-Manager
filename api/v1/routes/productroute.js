import express from 'express';
import productController from '../controllers/productcontroller';
import authenticate from '../helpers/jwt';

const router = express.Router();

router.post('/', authenticate.admin, productController.createProduct);
router.get('/', authenticate.user, productController.getAllProducts);
router.get('/:id', authenticate.user, productController.getProductById);
router.put('/:id', authenticate.admin, productController.updateProduct);
router.delete('/:id', authenticate.admin, productController.deleteProduct);

export default router;
