import { loggedIn } from '../models/usermodel';

export default (req, res, next) => {
  if (loggedIn.length === 0) {
    return res.status(401).send({ errors: { message: 'Please log in to your account.' } });
  }
  next();
};
