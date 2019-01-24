import {
  allUsers, loggedIn, adminRole, User,
} from '../models/usermodel';

export default {
  createUser: (req, res) => {
    const userEmail = req.body.email;
    const emailExists = allUsers.find(obj => obj.email === userEmail);
    if (emailExists !== undefined) {
      return res.status(401).send({ success: false, message: 'This email address is already taken' });
    }
    const user = new User(req.body);
    allUsers.push(user);
    return res.status(201).send({ success: true, data: user });
  },

  loginUser: (req, res) => {
    if (loggedIn.length === 1) {
      return res.status(400).send({ success: false, message: 'You are already logged in.' });
    }
    const userEmail = req.body.email;
    const userPassword = req.body.password;
    const checkUser = allUsers.find(obj => obj.email === userEmail && obj.password === userPassword);
    if (checkUser === undefined) {
      return res.status(401).send({ success: false, message: 'Invalid email address or password.' });
    }
    if (checkUser.role === 'admin') {
      adminRole.push(userEmail);
    }
    loggedIn.push(userEmail);
    return res.status(200).send({ success: true, message: 'You are logged in' });
  },

  logoutUser: (req, res) => {
    loggedIn.splice(0, 1);
    adminRole.splice(0, 1);
    return res.status(200).send({ success: true, message: 'You have logged out successfully.' });
  },

  findAllUsers: (req, res) => res.status(200).send({ success: true, message: 'Users found.', data: allUsers }),

  findUserById: (req, res) => {
    const userId = req.params.userId;
    const user = allUsers.find(obj => obj.id === userId);
    if (user === undefined) {
      return res.status(404).send({ success: false, message: 'User not found.' });
    }
    return res.status(200).send({ success: true, message: 'User found', data: user });
  },

  updateUser: (req, res) => {
    const userId = req.params.userId;
    const previousUser = allUsers.find(obj => obj.id === userId);
    if (previousUser === undefined) {
      return res.status(404).send({ success: false, message: 'User not found.' });
    }
    const updatedUser = { ...previousUser, ...req.body };
    const index = allUsers.findIndex(obj => obj.id === previousUser.id);

    allUsers.splice(index, 1, updatedUser);
    return res.status(200).send({ success: true, message: 'User information updated.', data: updatedUser });
  },

  deleteUser: (req, res) => {
    const userId = req.params.userId;
    const index = allUsers.findIndex(obj => obj.id === userId);
    if (index === -1) {
      return res.status(404).send({ success: false, message: 'User not found.' });
    }

    allUsers.splice(index, 1);
    return res.status(204).send({ success: true, message: 'User deleted.', data: allUsers });
  },
};
