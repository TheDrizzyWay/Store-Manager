import jwt from '../helpers/jwt';
import database from '../database';

export const requireAuth = async (req, res, next) => {
  const { authorization: token = '' } = req.headers || {};

  if (!token) {
    res.status(401).send({ error: { message: 'Unauthorized' } });
    return;
  }

  try {
    const { id } = await jwt.verifyToken(token);
    const result = await database.query('SELECT id, email, isAdmin FROM users WHERE id = $1', [id]);

    if (result.rowCount <= 0) {
      res.status(401).send({ error: { message: 'Unauthorized' } });
      return;
    }
    const user = result.rows[0];
    req.user = user;
    next();
  } catch (error) {
    res.status(500).send({ error: { message: 'Error verifying user.' } });
  }
};

export const adminAuth = (req, res, next) => {
  const user = Object.assign({}, req.user);
  if (user && user.isAdmin == true) {
    return next();
  }
  return res.status(401).send({ error: { message: 'Unauthorized' } });
};

export const userAuth = (req, res, next) => {
  const user = Object.assign({}, req.user);
  if (user && user.isAdmin !== true) {
    return next();
  }
  return res.status(401).send({ error: { message: 'Unauthorized' } });
};
