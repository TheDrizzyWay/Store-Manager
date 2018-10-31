import express from 'express';
import userController from '../controllers/usercontroller';
import { adminAuth, authenticate } from '../middleware/middleware';
import database from '../database';

const router = express.Router();

const checkUserId = router.param('id', async (req, res, next, id) => {
  try {
    const result = await database.query('SELECT id, email, is_admin FROM users WHERE id = $1', [id]);
    if (result.rowCount <= 0) {
      res.status(404).send({ message: `User with ID "${id}" was not found` });
      return;
    }

    const user = result.rows[0];
    if (!user.isAdmin) {
      res.status(403).send({ error: { message: 'Unauthorized' } });
      return;
    }
    req.user = user;
    next();
  } catch ({ message }) {
    res.status(500).send({ error: { message: 'Database error while getting user' } });
  }
});

router.post('/signup', adminAuth, userController.createAccount);
router.post('/login', userController.logIn);
router.get('/users', authenticate, adminAuth, userController.getAllUsers);
router.get('/users/:id', authenticate, adminAuth, checkUserId, userController.getUserById);
router.delete('/users/:id', authenticate, adminAuth, checkUserId, userController.deleteUser);

export default router;
