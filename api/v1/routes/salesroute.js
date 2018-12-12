import express from 'express';
import salesController from '../controllers/salescontroller';
import verifyProducts from '../middleware/verifyproducts';
import { requireAuth, adminAuth, attendantAuth } from '../middleware/authmiddleware';
import idValidation from '../validations/idvalidation';
import saleValidation from '../validations/salevalidation';

const { verify } = verifyProducts;
const { createSale, getAllSales, getSaleById } = salesController;
const { idValid } = idValidation;
const { createSaleValid, checkRepeat } = saleValidation;

const router = express.Router();

router.post('/', requireAuth, attendantAuth, createSaleValid, checkRepeat, verify, createSale);
router.get('/', requireAuth, getAllSales);
router.get('/:id', requireAuth, adminAuth, idValid, getSaleById);

export default router;
