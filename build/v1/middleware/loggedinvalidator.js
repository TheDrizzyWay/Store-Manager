'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _usermodel = require('../models/usermodel');

exports.default = function (req, res, next) {
  if (_usermodel.loggedIn.length === 0) {
    return res.status(401).send({ errors: { message: 'Please log in to your account.' } });
  }
  next();
};
//# sourceMappingURL=loggedinvalidator.js.map