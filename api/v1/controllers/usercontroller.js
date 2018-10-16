import { allUsers, loggedIn, adminRole, User } from '../models/usermodel';

export default {
  createUser(req, res) {
    const userEmail = req.body.email;
    const emailExists = allUsers.find(obj => obj.email === userEmail);
    if (emailExists !== undefined) {
      return res.status(401).send({ errors: { message: 'This email address is already taken' } });
    }
    const user = new User(req.body);
    allUsers.push(user);
    return res.status(201).send(user);
  },

  loginUser(req, res) {
    if (loggedIn.length === 1) {
      return res.status(400).send({ errors: { message: 'You are already logged in.' } });
    }
    const userEmail = req.body.email;
    const userPassword = req.body.password;
    const checkUser = allUsers.find(obj => obj.email === userEmail && obj.password === userPassword);
    if (checkUser === undefined) {
      return res.status(401).send({ errors: { message: 'Invalid email address or password.' } });
    }
    if (checkUser.role === 'admin') {
      adminRole.push(userEmail);
    }
    loggedIn.push(userEmail);
    return res.status(200).send({ message: 'You are logged in' });
  },

  logoutUser(req, res) {
    loggedIn.splice(0, 1);
    adminRole.splice(0, 1);
    return res.status(200).send({ message: 'You have logged out successfully.' });
  },

  findAllUsers(req, res) {
    return res.status(200).send(allUsers);
  },

  findUserById(req, res) {
    const userId = req.params.id;
    const user = allUsers.find(obj => obj.id === userId);
    if (user === undefined) {
      res.status(404).send({ errors: { message: 'User not found.' } });
    }
    res.status(200).send(user);
  },

  updateUser(req, res) {
    const userId = req.params.id;
    const previousUser = allUsers.find(obj => obj.id === userId);
    if (previousUser === undefined) {
      res.status(404).send({ errors: { message: 'User not found.' } });
    }
    const updatedUser = { ...previousUser, ...req.body };
    const index = allUsers.findIndex(obj => obj.id === previousUser.id);

    allUsers.splice(index, 1, updatedUser);
    res.status(200).send(allUsers);
  },

  deleteUser(req, res) {
    const userId = req.params.id;
    const index = allUsers.findIndex(obj => obj.id === userId);

    allUsers.splice(index, 1);
    res.status(204).send(allUsers);
  },
};
