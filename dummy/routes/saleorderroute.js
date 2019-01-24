import express from 'express';
import adminValidator from '../middleware/adminvalidator';
import loggedInValidator from '../middleware/loggedinvalidator';
import createSaleValidator from '../middleware/createsalevalidator';
import saleOrderController from '../controllers/saleordercontroller';

const router = express.Router();

router.get('/:saleId', loggedInValidator, saleOrderController.findSaleById);
router.get('/', loggedInValidator, adminValidator, saleOrderController.findAllSales);
router.post('/', loggedInValidator, createSaleValidator, saleOrderController.createSaleOrder);

export default router;
