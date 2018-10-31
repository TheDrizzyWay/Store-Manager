'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _inputvalidator = require('../helpers/inputvalidator');

var _database = require('../database');

var _database2 = _interopRequireDefault(_database);

var _jwt = require('../helpers/jwt');

var _jwt2 = _interopRequireDefault(_jwt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserController = function () {
  function UserController() {
    (0, _classCallCheck3.default)(this, UserController);
  }

  (0, _createClass3.default)(UserController, null, [{
    key: 'createAccount',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
        var _req$body, _req$body$firstName, firstName, _req$body$lastName, lastName, email, password, isAdmin, result, hash, message;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _req$body = req.body, _req$body$firstName = _req$body.firstName, firstName = _req$body$firstName === undefined ? '' : _req$body$firstName, _req$body$lastName = _req$body.lastName, lastName = _req$body$lastName === undefined ? '' : _req$body$lastName, email = _req$body.email, password = _req$body.password, isAdmin = _req$body.isAdmin;

                if (!(!email || !password)) {
                  _context.next = 4;
                  break;
                }

                res.status(400).send({ message: 'Email and password are required.' });
                return _context.abrupt('return');

              case 4:
                if ((0, _inputvalidator.passwordLength)(password)) {
                  _context.next = 7;
                  break;
                }

                res.status(400).send({ message: 'Password must be at least 6 characters long.' });
                return _context.abrupt('return');

              case 7:
                if ((0, _inputvalidator.validateEmail)(email)) {
                  _context.next = 10;
                  break;
                }

                res.status(400).send({ message: 'Invalid email address.' });
                return _context.abrupt('return');

              case 10:
                _context.prev = 10;
                _context.next = 13;
                return _database2.default.query('SELECT email FROM users WHERE email = $1', [email]);

              case 13:
                result = _context.sent;

                if (!(result.rowCount > 0)) {
                  _context.next = 17;
                  break;
                }

                res.status(409).send({ message: 'Email is already registered.' });
                return _context.abrupt('return');

              case 17:
                _context.next = 19;
                return (0, _inputvalidator.hashPassword)(password);

              case 19:
                hash = _context.sent;
                _context.next = 22;
                return _database2.default.query('INSERT INTO users \n      (\n        firstName,\n        lastName,\n        email,\n        password,\n        isAdmin)\n        VALUES\n        ($1, $2, $3, $4, $5)\n      ', [firstName, lastName, email, hash, isAdmin]);

              case 22:
                result = _context.sent;


                res.status(201).send({ message: 'user created successfully' });
                return _context.abrupt('return');

              case 27:
                _context.prev = 27;
                _context.t0 = _context['catch'](10);
                message = _context.t0.message;

                res.status(500).send({ error: { message: message } });

              case 31:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[10, 27]]);
      }));

      function createAccount(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return createAccount;
    }()
  }, {
    key: 'logIn',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
        var _req$body2, email, password, result, _result$rows$, userId, userPassword, token, message;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;

                if (!(!email || !password)) {
                  _context2.next = 4;
                  break;
                }

                res.status(400).send({ message: 'Please provide email & password to login.' });
                return _context2.abrupt('return');

              case 4:
                _context2.prev = 4;
                _context2.next = 7;
                return _database2.default.query('SELECT id, password FROM users WHERE email = $1', [email]);

              case 7:
                result = _context2.sent;

                if (!(result.rowCount <= 0)) {
                  _context2.next = 11;
                  break;
                }

                res.status(401).send({ message: 'Invalid email/password combination.' });
                return _context2.abrupt('return');

              case 11:
                _result$rows$ = result.rows[0], userId = _result$rows$.id, userPassword = _result$rows$.password;

                if ((0, _inputvalidator.comparePassword)(password, userPassword)) {
                  _context2.next = 15;
                  break;
                }

                res.status(401).send({ message: 'Invalid email and password combination.' });
                return _context2.abrupt('return');

              case 15:
                _context2.next = 17;
                return _jwt2.default.generateToken({ id: userId });

              case 17:
                token = _context2.sent;

                res.status(200).send({ token: token, message: 'You are logged in.' });
                _context2.next = 25;
                break;

              case 21:
                _context2.prev = 21;
                _context2.t0 = _context2['catch'](4);
                message = _context2.t0.message;

                res.status(500).send({ error: { message: 'Server encountered a problem while trying to log in.' } });

              case 25:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[4, 21]]);
      }));

      function logIn(_x3, _x4) {
        return _ref3.apply(this, arguments);
      }

      return logIn;
    }()
  }, {
    key: 'getAllUsers',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
        var result, message;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _database2.default.query('SELECT * FROM users');

              case 3:
                result = _context3.sent;

                res.status(200).send(result.rows);
                _context3.next = 11;
                break;

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3['catch'](0);
                message = _context3.t0.message;

                res.status(500).send({ error: { message: message } });

              case 11:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 7]]);
      }));

      function getAllUsers(_x5, _x6) {
        return _ref5.apply(this, arguments);
      }

      return getAllUsers;
    }()
  }, {
    key: 'getUserById',
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res) {
        var id, result, message;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                id = req.user.id;
                _context4.prev = 1;
                _context4.next = 4;
                return _database2.default.query('SELECT * FROM users WHERE id = $1', [id]);

              case 4:
                result = _context4.sent;

                res.send(result.rows[0]);
                _context4.next = 12;
                break;

              case 8:
                _context4.prev = 8;
                _context4.t0 = _context4['catch'](1);
                message = _context4.t0.message;

                res.status(500).send({ error: { message: message } });

              case 12:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[1, 8]]);
      }));

      function getUserById(_x7, _x8) {
        return _ref7.apply(this, arguments);
      }

      return getUserById;
    }()
  }, {
    key: 'updateUser',
    value: function () {
      var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res) {
        var _req$user, uFirstName, uLastName, uEmail, uPassword, id, _ref10, firstName, lastName, email, password, message;

        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _req$user = req.user, uFirstName = _req$user.firstName, uLastName = _req$user.lastName, uEmail = _req$user.email, uPassword = _req$user.password, id = _req$user.id;
                _ref10 = req.body || {}, firstName = _ref10.firstName, lastName = _ref10.lastName, email = _ref10.email, password = _ref10.password;
                _context5.prev = 2;
                _context5.next = 5;
                return _database2.default.query('UPDATE users SET firstName = $1, lastName = $2, email = $3, password = $4 WHERE id = $5', [firstName || uFirstName, lastName || uLastName, email || uEmail, password || uPassword, id]);

              case 5:

                res.status(200).send({ message: 'User details updated successfully' });
                _context5.next = 12;
                break;

              case 8:
                _context5.prev = 8;
                _context5.t0 = _context5['catch'](2);
                message = _context5.t0.message;

                res.status(500).send({ error: { message: message } });

              case 12:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this, [[2, 8]]);
      }));

      function updateUser(_x9, _x10) {
        return _ref9.apply(this, arguments);
      }

      return updateUser;
    }()
  }, {
    key: 'deleteUser',
    value: function () {
      var _ref12 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(req, res) {
        var id, result, message;
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                id = req.user.id;
                _context6.prev = 1;
                _context6.next = 4;
                return _database2.default.query('DELETE FROM users WHERE id = $1', [id]);

              case 4:
                result = _context6.sent;

                if (result.rowCount > 0) res.status(204).send();
                _context6.next = 12;
                break;

              case 8:
                _context6.prev = 8;
                _context6.t0 = _context6['catch'](1);
                message = _context6.t0.message;

                res.status(500).send({ error: { message: message } });

              case 12:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this, [[1, 8]]);
      }));

      function deleteUser(_x11, _x12) {
        return _ref12.apply(this, arguments);
      }

      return deleteUser;
    }()
  }]);
  return UserController;
}();

exports.default = UserController;
//# sourceMappingURL=usercontroller.js.map