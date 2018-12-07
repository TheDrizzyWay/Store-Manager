import validator from 'validator';
import User from '../models/Users';

export default {
  logInValid: (req, res, next) => {
    const { email, password } = req.body;
    const errors = [];
    const newEmail = email.trim();
    const newPassword = password.trim();

    if (!newEmail || validator.isEmpty(newEmail)) {
      errors.push('Please insert your email address.');
    }
    if (!newPassword || validator.isEmpty(newPassword)) {
      errors.push('Please insert your password.');
    }
    if (errors.length > 0) {
      return res.status(400).send({
        success: false,
        message: 'One or more fields are missing.',
        data: errors,
      });
    }
    req.body.email = newEmail;
    req.body.password = newPassword;
    return next();
  },
};
