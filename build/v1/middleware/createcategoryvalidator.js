'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (req, res, next) {
  var errors = {};
  var category = req.body;

  if (!category.name) {
    errors.name = 'Category Name is required';
  }
  if (!category.description) {
    errors.description = 'Category description is required';
  }

  if ((0, _keys2.default)(errors).length !== 0) {
    return res.status(400).send({ errors: errors });
  }
  next();
};
//# sourceMappingURL=createcategoryvalidator.js.map