import { Router } from 'express';
import userRoute from './userroute';
import categoryRoute from './categoryroute';

const router = new Router();

router.use('/api/v1/users', userRoute);
router.use('/api/v1/categories', categoryRoute);

export default router;
