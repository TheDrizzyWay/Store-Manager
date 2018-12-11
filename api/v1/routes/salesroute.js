import express from 'express';
import salesController from '../controllers/salescontroller';
import verifyProductsController from '../controllers/verifyproductscontroller';
import { requireAuth, attendantAuth, adminAuth } from '../middleware/authmiddleware';

const { verifyProducts } = verifyProductsController;
const { createSale, getAllSales, getSaleById } = salesController;
const router = express.Router();

router.post('/', requireAuth, verifyProducts, createSale);
router.get('/', requireAuth, adminAuth, getAllSales);
router.get('/:id', requireAuth, adminAuth, getSaleById);

export default router;
