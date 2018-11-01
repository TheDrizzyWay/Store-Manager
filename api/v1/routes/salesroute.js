import express from 'express';
import salesController from '../controllers/salescontroller';
import { requireAuth, userAuth, adminAuth } from '../middleware/middleware';

const router = express.Router();

router.post('/', salesController.createSale);
router.get('/', requireAuth, salesController.getAllSales);

export default router;
