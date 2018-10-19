'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (req, res, next) {
  var errors = {};
  var saleOrder = req.body;

  if (!saleOrder.name) {
    errors.name = 'Product Name is required';
  }
  if (!saleOrder.quantitySold) {
    errors.quantitySold = 'Product quantity is required';
  }
  if (saleOrder.quantitySold < 1) {
    errors.quantitySold = 'Please enter a valid quantity';
  }

  if ((0, _keys2.default)(errors).length !== 0) {
    return res.status(400).send({ errors: errors });
  }
  next();
};
//# sourceMappingURL=createsalevalidator.js.map