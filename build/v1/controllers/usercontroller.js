'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _usermodel = require('../models/usermodel');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  createUser: function createUser(req, res) {
    var userEmail = req.body.email;
    var emailExists = _usermodel.allUsers.find(function (obj) {
      return obj.email === userEmail;
    });
    if (emailExists !== undefined) {
      return res.status(401).send({ errors: { message: 'This email address is already taken' } });
    }
    var user = new _usermodel.User(req.body);
    _usermodel.allUsers.push(user);
    return res.status(201).send(user);
  },
  loginUser: function loginUser(req, res) {
    if (_usermodel.loggedIn.length === 1) {
      return res.status(400).send({ errors: { message: 'You are already logged in.' } });
    }
    var userEmail = req.body.email;
    var userPassword = req.body.password;
    var checkUser = _usermodel.allUsers.find(function (obj) {
      return obj.email === userEmail && obj.password === userPassword;
    });
    if (checkUser === undefined) {
      return res.status(401).send({ errors: { message: 'Invalid email address or password.' } });
    }
    if (checkUser.role === 'admin') {
      _usermodel.adminRole.push(userEmail);
    }
    _usermodel.loggedIn.push(userEmail);
    return res.status(200).send({ message: 'You are logged in' });
  },
  logoutUser: function logoutUser(req, res) {
    _usermodel.loggedIn.splice(0, 1);
    _usermodel.adminRole.splice(0, 1);
    return res.status(200).send({ message: 'You have logged out successfully.' });
  },
  findAllUsers: function findAllUsers(req, res) {
    return res.status(200).send(_usermodel.allUsers);
  },
  findUserById: function findUserById(req, res) {
    var userId = req.params.userId;
    var user = _usermodel.allUsers.find(function (obj) {
      return obj.id === userId;
    });
    if (user === undefined) {
      res.status(404).send({ errors: { message: 'User not found.' } });
    }
    res.status(200).send(user);
  },
  updateUser: function updateUser(req, res) {
    var userId = req.params.userId;
    var previousUser = _usermodel.allUsers.find(function (obj) {
      return obj.id === userId;
    });
    if (previousUser === undefined) {
      return res.status(404).send({ errors: { message: 'User not found.' } });
    }
    var updatedUser = (0, _extends3.default)({}, previousUser, req.body);
    var index = _usermodel.allUsers.findIndex(function (obj) {
      return obj.id === previousUser.id;
    });

    _usermodel.allUsers.splice(index, 1, updatedUser);
    res.status(200).send(updatedUser);
  },
  deleteUser: function deleteUser(req, res) {
    var userId = req.params.userId;
    var index = _usermodel.allUsers.findIndex(function (obj) {
      return obj.id === userId;
    });
    if (index === -1) {
      return res.status(404).send({ errors: { message: 'User not found.' } });
    }

    _usermodel.allUsers.splice(index, 1);
    res.status(204).send(_usermodel.allUsers);
  }
};
//# sourceMappingURL=usercontroller.js.map