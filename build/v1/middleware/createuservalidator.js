'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (req, res, next) {
  var errors = {};
  var user = req.body;

  if (!user.firstName) {
    errors.firstName = 'First Name is required';
  }
  if (!user.lastName) {
    errors.lastName = 'Last Name is required';
  }
  if (!user.email) {
    errors.email = 'User email is required';
  }
  if (!user.password) {
    errors.password = 'User password is required';
  }
  if (!user.role) {
    errors.role = 'User Role is required';
  }

  if ((0, _keys2.default)(errors).length !== 0) {
    return res.status(400).send({ errors: errors });
  }
  next();
};
//# sourceMappingURL=createuservalidator.js.map