import express from 'express';
import adminValidator from '../middleware/adminvalidator';
import loggedInValidator from '../middleware/loggedinvalidator';
import productController from '../controllers/productcontroller';
import createProductValidator from '../middleware/createproductvalidator';

const router = express.Router();

router.get('/', loggedInValidator, productController.findAllProducts);
router.get('/:productId', loggedInValidator, productController.findProductById);
router.post('/', loggedInValidator, adminValidator, createProductValidator, productController.createProduct);
router.put('/:productId', loggedInValidator, adminValidator, productController.updateProduct);
router.delete('/:productId', loggedInValidator, adminValidator, productController.deleteProduct);

export default router;
