import { adminRole } from '../models/usermodel';

export default (req, res, next) => {
  if (adminRole.length === 0) {
    return res.status(403).send({ errors: { message: 'You are not permitted to access this page.' } });
  }
  next();
};
