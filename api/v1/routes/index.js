import { Router } from 'express';
import userRoute from './userroute';
import productRoute from './productroute';
import categoryRoute from './categoryroute';
import saleOrderRoute from './saleorderroute';

const router = new Router();

router.use('/api/v1/users', userRoute);
router.use('/api/v1/sales', saleOrderRoute);
router.use('/api/v1/products', productRoute);
router.use('/api/v1/categories', categoryRoute);

export default router;
