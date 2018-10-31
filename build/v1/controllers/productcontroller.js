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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProductController = function () {
  function ProductController() {
    (0, _classCallCheck3.default)(this, ProductController);
  }

  (0, _createClass3.default)(ProductController, null, [{
    key: 'createProduct',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
        var _req$body, _req$body$name, name, _req$body$price, price, _req$body$quantity, quantity, _req$body$minimumQuan, minimumQuantity, imgUrl, result, message;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _req$body = req.body, _req$body$name = _req$body.name, name = _req$body$name === undefined ? '' : _req$body$name, _req$body$price = _req$body.price, price = _req$body$price === undefined ? '' : _req$body$price, _req$body$quantity = _req$body.quantity, quantity = _req$body$quantity === undefined ? '' : _req$body$quantity, _req$body$minimumQuan = _req$body.minimumQuantity, minimumQuantity = _req$body$minimumQuan === undefined ? '' : _req$body$minimumQuan, imgUrl = _req$body.imgUrl;

                if (!(!name || !price || !quantity || !minimumQuantity || !imgUrl)) {
                  _context.next = 4;
                  break;
                }

                res.status(400).send({ message: 'All fields are required.' });
                return _context.abrupt('return');

              case 4:
                if ((0, _inputvalidator.validateUrl)(imgUrl)) {
                  _context.next = 7;
                  break;
                }

                res.status(400).send({ message: 'Invalid image link.' });
                return _context.abrupt('return');

              case 7:
                _context.prev = 7;
                _context.next = 10;
                return _database2.default.query('SELECT name FROM products WHERE name = $1', [name]);

              case 10:
                result = _context.sent;

                if (!(result.rowCount > 0)) {
                  _context.next = 14;
                  break;
                }

                res.status(409).send({ message: 'This product already exists.' });
                return _context.abrupt('return');

              case 14:
                _context.next = 16;
                return _database2.default.query('INSERT INTO products \n      (\n        name,\n        price,\n        quantity,\n        minimumQuantity,\n        imgUrl)\n        VALUES\n        ($1, $2, $3, $4, $5)\n      ', [name, price, quantity, minimumQuantity, imgUrl]);

              case 16:
                result = _context.sent;


                res.status(201).send({ message: 'Product created successfully' });
                return _context.abrupt('return');

              case 21:
                _context.prev = 21;
                _context.t0 = _context['catch'](7);
                message = _context.t0.message;

                res.status(500).send({ error: { message: message } });

              case 25:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[7, 21]]);
      }));

      function createProduct(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return createProduct;
    }()
  }, {
    key: 'getAllProducts',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
        var result, message;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _database2.default.query('SELECT * FROM products');

              case 3:
                result = _context2.sent;

                res.status(200).send(result.rows);
                _context2.next = 11;
                break;

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2['catch'](0);
                message = _context2.t0.message;

                res.status(500).send({ error: { message: message } });

              case 11:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 7]]);
      }));

      function getAllProducts(_x3, _x4) {
        return _ref3.apply(this, arguments);
      }

      return getAllProducts;
    }()
  }, {
    key: 'getProductById',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
        var id, result, message;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                id = req.product.id;
                _context3.prev = 1;
                _context3.next = 4;
                return _database2.default.query('SELECT * FROM products WHERE id = $1', [id]);

              case 4:
                result = _context3.sent;

                res.send(result.rows[0]);
                _context3.next = 12;
                break;

              case 8:
                _context3.prev = 8;
                _context3.t0 = _context3['catch'](1);
                message = _context3.t0.message;

                res.status(500).send({ error: { message: message } });

              case 12:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[1, 8]]);
      }));

      function getProductById(_x5, _x6) {
        return _ref5.apply(this, arguments);
      }

      return getProductById;
    }()
  }, {
    key: 'updateProduct',
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res) {
        var _req$product, pName, pPrice, pQuantity, pMinimumQuantity, pImgUrl, id, _ref8, name, price, quantity, minimumQuantity, imgUrl, message;

        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _req$product = req.product, pName = _req$product.name, pPrice = _req$product.price, pQuantity = _req$product.quantity, pMinimumQuantity = _req$product.minimumQuantity, pImgUrl = _req$product.imgUrl, id = _req$product.id;
                _ref8 = req.body || {}, name = _ref8.name, price = _ref8.price, quantity = _ref8.quantity, minimumQuantity = _ref8.minimumQuantity, imgUrl = _ref8.imgUrl;
                _context4.prev = 2;
                _context4.next = 5;
                return _database2.default.query('UPDATE products SET name = $1, price = $2, quantity = $3, minimumQuantity = $4, imgUrl = $5 WHERE id = $6', [name || pName, price || pPrice, quantity || pQuantity, minimumQuantity || pMinimumQuantity, imgUrl || pImgUrl, id]);

              case 5:

                res.status(200).send({ message: 'Product details updated successfully' });
                _context4.next = 12;
                break;

              case 8:
                _context4.prev = 8;
                _context4.t0 = _context4['catch'](2);
                message = _context4.t0.message;

                res.status(500).send({ error: { message: message } });

              case 12:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[2, 8]]);
      }));

      function updateProduct(_x7, _x8) {
        return _ref7.apply(this, arguments);
      }

      return updateProduct;
    }()
  }, {
    key: 'deleteProduct',
    value: function () {
      var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res) {
        var id, result, message;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                id = req.product.id;
                _context5.prev = 1;
                _context5.next = 4;
                return _database2.default.query('DELETE FROM products WHERE id = $1', [id]);

              case 4:
                result = _context5.sent;

                if (result.rowCount > 0) res.status(204).send();
                _context5.next = 12;
                break;

              case 8:
                _context5.prev = 8;
                _context5.t0 = _context5['catch'](1);
                message = _context5.t0.message;

                res.status(500).send({ error: { message: message } });

              case 12:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this, [[1, 8]]);
      }));

      function deleteProduct(_x9, _x10) {
        return _ref10.apply(this, arguments);
      }

      return deleteProduct;
    }()
  }]);
  return ProductController;
}();

exports.default = ProductController;
//# sourceMappingURL=productcontroller.js.map