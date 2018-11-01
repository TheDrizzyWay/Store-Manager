import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import userController from '../controllers/usercontroller';

dotenv.config();

export default {
  async user(req, res, next) {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(403).send({ error: 'No token provided' });
    }

    try {
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);

      try {
        const user = await userController.getUserById(decoded.id);

        req.user = {
          id: user.id,
          isAdmin: user.isAdmin,
        };
        next();
        return user;
      } catch (error) {
        return res.status(500).send({ error: error.message });
      }
    } catch (error) {
      return res.status(401).send({ error: 'Failed to authenticate' });
    }
  },

  async admin(req, res, next) {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(403).json({ error: 'No token provided' });
    }

    try {
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      try {
        const user = await userController.getUserById(decoded.id);

        if (user.isAdmin !== true) {
          return res.status(401).json({ error: 'Unauthorized' });
        }

        req.user = {
          id: user.id,
          isAdmin: user.isAdmin,
        };
        next();
        return user;
      } catch (error) {
        return res.status(500).send({ error: error.message });
      }
    } catch (error) {
      return res.status(401).json({ error: 'Failed to authenticate' });
    }
  },
};
