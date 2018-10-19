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

var _createsalevalidator = require('../middleware/createsalevalidator');

var _createsalevalidator2 = _interopRequireDefault(_createsalevalidator);

var _saleordercontroller = require('../controllers/saleordercontroller');

var _saleordercontroller2 = _interopRequireDefault(_saleordercontroller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/:saleId', _loggedinvalidator2.default, _saleordercontroller2.default.findSaleById);
router.get('/', _loggedinvalidator2.default, _adminvalidator2.default, _saleordercontroller2.default.findAllSales);
router.post('/', _loggedinvalidator2.default, _createsalevalidator2.default, _saleordercontroller2.default.createSaleOrder);

exports.default = router;
//# sourceMappingURL=saleorderroute.js.map