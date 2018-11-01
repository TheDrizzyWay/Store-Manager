import express from 'express';
import userController from '../controllers/usercontroller';
import authenticate from '../helpers/jwt';

const router = express.Router();

router.post('/signup', userController.createAccount);
router.post('/login', userController.logIn);
router.get('/users', authenticate.admin, userController.getAllUsers);
router.get('/users/:id', authenticate.admin, userController.getUserById);
router.delete('/users/:id', authenticate.admin, userController.deleteUser);

export default router;
