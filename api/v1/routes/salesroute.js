import express from 'express';
import salesController from '../controllers/salescontroller';
import { requireAuth, attendantAuth, adminAuth } from '../middleware/middleware';

const router = express.Router();

router.post('/', salesController.createSale);
router.get('/', requireAuth, adminAuth, salesController.getAllSales);

export default router;
