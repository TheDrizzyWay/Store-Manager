'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (req, res, next) {
  var errors = {};
  var product = req.body;

  if (!product.name) {
    errors.name = 'Product Name is required';
  }
  if (!product.imageUrl) {
    errors.imageUrl = 'Product image is required';
  }
  if (!product.quantity) {
    errors.quantity = 'Product quantity is required';
  }
  if (!product.price) {
    errors.price = 'Product price is required';
  }
  if (!product.minQuantity) {
    errors.minQuantity = 'Product price is required';
  }

  if ((0, _keys2.default)(errors).length !== 0) {
    return res.status(400).send({ errors: errors });
  }
  next();
};
//# sourceMappingURL=createproductvalidator.js.map