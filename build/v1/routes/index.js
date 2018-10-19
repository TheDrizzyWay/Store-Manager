'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _userroute = require('./userroute');

var _userroute2 = _interopRequireDefault(_userroute);

var _productroute = require('./productroute');

var _productroute2 = _interopRequireDefault(_productroute);

var _categoryroute = require('./categoryroute');

var _categoryroute2 = _interopRequireDefault(_categoryroute);

var _saleorderroute = require('./saleorderroute');

var _saleorderroute2 = _interopRequireDefault(_saleorderroute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _express.Router();

router.use('/api/v1/users', _userroute2.default);
router.use('/api/v1/sales', _saleorderroute2.default);
router.use('/api/v1/products', _productroute2.default);
router.use('/api/v1/categories', _categoryroute2.default);

exports.default = router;
//# sourceMappingURL=index.js.map