import { Router } from 'express';
import userRoute from './userroute';

const router = new Router();

router.use('/api/v1/auth', userRoute);

export default router;
