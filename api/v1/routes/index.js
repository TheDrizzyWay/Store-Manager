import { Router } from 'express';
import userRoute from './userroute';
import categoryRoute from './categoryroute';
import productRoute from './productroute';

const router = new Router();

router.use('/api/v1/users', userRoute);
router.use('/api/v1/categories', categoryRoute);
router.use('/api/v1/products', productRoute);

export default router;
