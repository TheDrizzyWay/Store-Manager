'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = exports.adminRole = exports.loggedIn = exports.allUsers = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var allUsers = exports.allUsers = [{
  id: 'd73febc3-a60d-433a-af20-9f4f89290c17',
  firstName: 'Tommy',
  lastName: 'Vercetti',
  email: 'tomvee@gmail.com',
  password: '012345',
  role: 'admin',
  dateCreated: '2018-10-18T19:37:49.217Z'
}];
var loggedIn = exports.loggedIn = [];
var adminRole = exports.adminRole = [];

var User = exports.User = function User(user) {
  (0, _classCallCheck3.default)(this, User);

  this.id = _uuid2.default.v4();
  this.firstName = user.firstName ? user.firstName.toString() : null;
  this.lastName = user.lastName ? user.lastName.toString() : null;
  this.email = user.email ? user.email.toString() : null;
  this.password = user.password ? user.password : null;
  this.role = user.role ? user.role.toLowerCase() : null;
  this.dateCreated = (0, _moment2.default)();
};
//# sourceMappingURL=usermodel.js.map