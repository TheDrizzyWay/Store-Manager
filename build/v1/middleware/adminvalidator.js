'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _usermodel = require('../models/usermodel');

exports.default = function (req, res, next) {
  if (_usermodel.adminRole.length === 0) {
    return res.status(403).send({ errors: { message: 'You are not permitted to access this page.' } });
  }
  next();
};
//# sourceMappingURL=adminvalidator.js.map