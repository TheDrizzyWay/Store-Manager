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

  signUpValid: async (req, res, next) => {
    const user = req.body;
    const errors = [];
    const newFirstName = user.first_name.trim().toUpperCase();
    const newLastName = user.last_name.trim().toUpperCase();
    const newEmail = user.email.trim();
    const newPassword = user.password.trim();
    const newRole = user.role.trim();

    if (!newFirstName || validator.isEmpty(newFirstName)
    || !newLastName || validator.isEmpty(newLastName)
    || !newEmail || validator.isEmpty(newEmail)
    || !newPassword || validator.isEmpty(newPassword)
    || !newRole || validator.isEmpty(newRole)) {
      return res.status(400).send({ success: false, message: 'Please fill in all fields.' });
    }
    if (!validator.isAlpha(newFirstName)) {
      errors.push('Your first name should contain only alphabets.');
    }
    if (!validator.isLength(newFirstName, { min: 2, max: 50 })) {
      errors.push('Your first name should be between 2 and 50 characters long');
    }
    if (!validator.isAlpha(newLastName)) {
      errors.push('Your last name should contain only alphabets.');
    }
    if (!validator.isLength(newLastName, { min: 2, max: 50 })) {
      errors.push('Your last name should be between 2 and 50 characters long.');
    }
    if (!validator.isEmail(newEmail)) {
      errors.push('Please insert a valid email address.');
    }
    if (!validator.isLength(newPassword, { min: 6, max: 25 })) {
      errors.push('Your password should be between 6 and 25 characters long.');
    }
    if (!validator.isAlphanumeric(newPassword)) {
      errors.push('Your password should contain only letters and numbers.');
    }
    if (!validator.isIn(newRole, ['admin', 'attendant'])) {
      errors.push('Please insert a valid role');
    }
    if (errors.length > 0) {
      return res.status(400).send({
        success: false,
        data: errors,
      });
    }
    req.body.first_name = newFirstName;
    req.body.last_name = newLastName;
    req.body.email = newEmail;
    req.body.password = newPassword;
    req.body.role = newRole;

    try {
      const result = await User.logIn(newEmail);
      if (result) {
        return res.status(400).send({ success: false, message: 'This email address is already taken' });
      }
    } catch (error) {
      return res.status(500).send({ success: false, message: error.message });
    }
    return next();
  },
};
