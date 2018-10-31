import { Router } from 'express';
import userRoute from './userroute';
import productRoute from './productroute';
import categoryRoute from './categoryroute';
import salesRoute from './salesroute';

const router = new Router();

router.use('/api/v1/auth', userRoute);
router.use('/api/v1/products', productRoute);
router.use('/api/v1/categories', categoryRoute);
router.use('/api/v1/sales', salesRoute);

export default router;
