import express from 'express';
import salesController from '../controllers/salescontroller';
import { requireAuth, attendantAuth, adminAuth } from '../middleware/authmiddleware';

const router = express.Router();

router.post('/', salesController.createSale);
router.get('/', requireAuth, adminAuth, salesController.getAllSales);
router.get('/:id', attendantAuth, salesController.getMySales);

export default router;
