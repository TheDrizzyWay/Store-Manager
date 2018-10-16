import { Router } from 'express';
import userRoute from './userroute';

const router = new Router();

router.use('/api/v1/users', userRoute);

export default router;
