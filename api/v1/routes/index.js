import { Router } from 'express';
import userRoute from './userroute';
import productRoute from './productroute';

const router = new Router();

router.use('/api/v1/auth', userRoute);
router.use('/api/v1/products', productRoute);

export default router;
