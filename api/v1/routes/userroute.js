import express from 'express';
import userController from '../controllers/usercontroller';
import adminValidator from '../middleware/adminvalidator';
import loggedInValidator from '../middleware/loggedinvalidator';
import userLoginValidator from '../middleware/userloginvalidator';
import createUserValidator from '../middleware/createuservalidator';

const router = express.Router();

router.get('/logout', loggedInValidator, userController.logoutUser);
router.get('/', loggedInValidator, adminValidator, userController.findAllUsers);
router.get('/:userId', loggedInValidator, adminValidator, userController.findUserById);
router.post('/', loggedInValidator, adminValidator, createUserValidator, userController.createUser);
router.post('/login', userLoginValidator, userController.loginUser);
router.put('/:userId', loggedInValidator, adminValidator, userController.updateUser);
router.delete('/:userId', loggedInValidator, adminValidator, userController.deleteUser);

export default router;
