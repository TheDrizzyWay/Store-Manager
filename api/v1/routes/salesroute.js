import express from 'express';
import salesController from '../controllers/salescontroller';
import verifyProducts from '../middleware/verifyproducts';
import { requireAuth, adminAuth, attendantAuth } from '../middleware/authmiddleware';
import idValidation from '../validations/idvalidation';

const { verify } = verifyProducts;
const { createSale, getAllSales, getSaleById } = salesController;
const { idValid } = idValidation;

const router = express.Router();

router.post('/', requireAuth, attendantAuth, verify, createSale);
router.get('/', requireAuth, getAllSales);
router.get('/:id', requireAuth, adminAuth, idValid, getSaleById);

export default router;
