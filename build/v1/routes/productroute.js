'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _adminvalidator = require('../middleware/adminvalidator');

var _adminvalidator2 = _interopRequireDefault(_adminvalidator);

var _loggedinvalidator = require('../middleware/loggedinvalidator');

var _loggedinvalidator2 = _interopRequireDefault(_loggedinvalidator);

var _productcontroller = require('../controllers/productcontroller');

var _productcontroller2 = _interopRequireDefault(_productcontroller);

var _createproductvalidator = require('../middleware/createproductvalidator');

var _createproductvalidator2 = _interopRequireDefault(_createproductvalidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', _loggedinvalidator2.default, _productcontroller2.default.findAllProducts);
router.get('/:productId', _loggedinvalidator2.default, _productcontroller2.default.findProductById);
router.post('/', _loggedinvalidator2.default, _adminvalidator2.default, _createproductvalidator2.default, _productcontroller2.default.createProduct);
router.put('/:productId', _loggedinvalidator2.default, _adminvalidator2.default, _productcontroller2.default.updateProduct);
router.delete('/:productId', _loggedinvalidator2.default, _adminvalidator2.default, _productcontroller2.default.deleteProduct);

exports.default = router;
//# sourceMappingURL=productroute.js.map