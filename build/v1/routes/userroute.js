'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _usercontroller = require('../controllers/usercontroller');

var _usercontroller2 = _interopRequireDefault(_usercontroller);

var _middleware = require('../middleware/middleware');

var _database = require('../database');

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

var checkUserId = router.param('id', function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res, next, id) {
    var result, user, message;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _database2.default.query('SELECT id, email, is_admin FROM users WHERE id = $1', [id]);

          case 3:
            result = _context.sent;

            if (!(result.rowCount <= 0)) {
              _context.next = 7;
              break;
            }

            res.status(404).send({ message: 'User with ID "' + id + '" was not found' });
            return _context.abrupt('return');

          case 7:
            user = result.rows[0];

            if (user.isAdmin) {
              _context.next = 11;
              break;
            }

            res.status(403).send({ error: { message: 'Unauthorized' } });
            return _context.abrupt('return');

          case 11:
            req.user = user;
            next();
            _context.next = 19;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context['catch'](0);
            message = _context.t0.message;

            res.status(500).send({ error: { message: 'Database error while getting user' } });

          case 19:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 15]]);
  }));

  return function (_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}());

router.post('/signup', _middleware.adminAuth, _usercontroller2.default.createAccount);
router.post('/login', _usercontroller2.default.logIn);
router.get('/users', _middleware.authenticate, _middleware.adminAuth, _usercontroller2.default.getAllUsers);
router.get('/users/:id', _middleware.authenticate, _middleware.adminAuth, checkUserId, _usercontroller2.default.getUserById);
router.put('/users/:id', _middleware.authenticate, _middleware.adminAuth, checkUserId, _usercontroller2.default.updateUser);
router.delete('/users/:id', _middleware.authenticate, _middleware.adminAuth, checkUserId, _usercontroller2.default.deleteUser);

exports.default = router;
//# sourceMappingURL=userroute.js.map