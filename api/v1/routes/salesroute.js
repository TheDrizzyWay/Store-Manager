import express from 'express';
import salesController from '../controllers/salescontroller';
import { attendantAuth, adminAuth, authenticate } from '../middleware/middleware';
import database from '../database';

const router = express.Router();

router.post('/', authenticate, attendantAuth, salesController.createSale);
router.get('/', authenticate, adminAuth, salesController.getAllSales);

export default router;
