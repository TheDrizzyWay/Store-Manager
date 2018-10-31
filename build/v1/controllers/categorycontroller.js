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

var _database = require('../database');

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CategoryController = function () {
  function CategoryController() {
    (0, _classCallCheck3.default)(this, CategoryController);
  }

  (0, _createClass3.default)(CategoryController, null, [{
    key: 'createCategory',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
        var _req$body, _req$body$name, name, _req$body$description, description, result, message;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _req$body = req.body, _req$body$name = _req$body.name, name = _req$body$name === undefined ? '' : _req$body$name, _req$body$description = _req$body.description, description = _req$body$description === undefined ? '' : _req$body$description;

                if (!(!name || !description)) {
                  _context.next = 4;
                  break;
                }

                res.status(400).send({ message: 'All fields are required.' });
                return _context.abrupt('return');

              case 4:
                _context.prev = 4;
                _context.next = 7;
                return _database2.default.query('SELECT name FROM products WHERE name = $1', [name]);

              case 7:
                result = _context.sent;

                if (!(result.rowCount > 0)) {
                  _context.next = 11;
                  break;
                }

                res.status(409).send({ message: 'This category already exists.' });
                return _context.abrupt('return');

              case 11:
                _context.next = 13;
                return _database2.default.query('INSERT INTO categories \n      (\n        name,\n        description)\n        VALUES\n        ($1, $2)\n      ', [name, description]);

              case 13:
                result = _context.sent;


                res.status(201).send({ message: 'Category created successfully' });
                return _context.abrupt('return');

              case 18:
                _context.prev = 18;
                _context.t0 = _context['catch'](4);
                message = _context.t0.message;

                res.status(500).send({ error: { message: message } });

              case 22:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[4, 18]]);
      }));

      function createCategory(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return createCategory;
    }()
  }, {
    key: 'getAllCategories',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
        var result, message;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _database2.default.query('SELECT * FROM categories');

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

      function getAllCategories(_x3, _x4) {
        return _ref3.apply(this, arguments);
      }

      return getAllCategories;
    }()
  }, {
    key: 'getCategoryById',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
        var id, result, message;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                id = req.category.id;
                _context3.prev = 1;
                _context3.next = 4;
                return _database2.default.query('SELECT * FROM categories WHERE id = $1', [id]);

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

      function getCategoryById(_x5, _x6) {
        return _ref5.apply(this, arguments);
      }

      return getCategoryById;
    }()
  }, {
    key: 'updateCategory',
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res) {
        var _req$category, cName, cDescription, id, _ref8, name, description, message;

        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _req$category = req.category, cName = _req$category.name, cDescription = _req$category.description, id = _req$category.id;
                _ref8 = req.body || {}, name = _ref8.name, description = _ref8.description;
                _context4.prev = 2;
                _context4.next = 5;
                return _database2.default.query('UPDATE categories SET name = $1, description = $2 WHERE id = $3', [name || cName, description || cDescription, id]);

              case 5:

                res.status(200).send({ message: 'Category details updated successfully' });
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

      function updateCategory(_x7, _x8) {
        return _ref7.apply(this, arguments);
      }

      return updateCategory;
    }()
  }, {
    key: 'deleteCategory',
    value: function () {
      var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res) {
        var id, result, message;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                id = req.category.id;
                _context5.prev = 1;
                _context5.next = 4;
                return _database2.default.query('DELETE FROM categories WHERE id = $1', [id]);

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

      function deleteCategory(_x9, _x10) {
        return _ref10.apply(this, arguments);
      }

      return deleteCategory;
    }()
  }]);
  return CategoryController;
}();

exports.default = CategoryController;
//# sourceMappingURL=categorycontroller.js.map