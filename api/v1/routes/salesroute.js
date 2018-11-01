import express from 'express';
import salesController from '../controllers/salescontroller';
import authenticate from '../helpers/jwt';

const router = express.Router();

router.post('/', salesController.createSale);
router.get('/', authenticate.admin, salesController.getAllSales);

export default router;
