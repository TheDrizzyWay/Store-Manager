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

var _productcontroller = require('../controllers/productcontroller');

var _productcontroller2 = _interopRequireDefault(_productcontroller);

var _middleware = require('../middleware/middleware');

var _database = require('../database');

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

var checkProductId = router.param('id', function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res, next, id) {
    var result, message;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _database2.default.query('SELECT id FROM products WHERE id = $1', [id]);

          case 3:
            result = _context.sent;

            if (!(result.rowCount <= 0)) {
              _context.next = 7;
              break;
            }

            res.status(404).send({ message: 'Product with ID "' + id + '" was not found' });
            return _context.abrupt('return');

          case 7:
            next();
            _context.next = 14;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context['catch'](0);
            message = _context.t0.message;

            res.status(500).send({ error: { message: 'Database error while getting product' } });

          case 14:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 10]]);
  }));

  return function (_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}());

router.post('/', _middleware.authenticate, _middleware.adminAuth, _productcontroller2.default.createProduct);
router.get('/', _middleware.authenticate, _productcontroller2.default.getAllProducts);
router.get('/:id', _middleware.authenticate, checkProductId, _productcontroller2.default.getProductById);
router.put('/:id', _middleware.authenticate, _middleware.adminAuth, checkProductId, _productcontroller2.default.updateProduct);
router.delete('/:id', _middleware.authenticate, _middleware.adminAuth, checkProductId, _productcontroller2.default.deleteProduct);

exports.default = router;
//# sourceMappingURL=productroute.js.map