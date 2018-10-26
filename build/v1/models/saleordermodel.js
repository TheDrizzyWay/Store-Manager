'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SaleOrder = exports.allSales = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var allSales = exports.allSales = [{
  id: 'd485e3b3-d210-43c2-aee0-753868c906b0',
  name: 'adidas f10',
  quantitySold: '1',
  dateCreated: '2018-10-19T15:57:18.377Z',
  total: '10000',
  seller: '3b51217f-d37b-464c-8d10-37dfc66df4cf'
}];

var SaleOrder = exports.SaleOrder = function SaleOrder(sale) {
  (0, _classCallCheck3.default)(this, SaleOrder);

  this.id = _uuid2.default.v4();
  this.name = sale.name ? sale.name.toString() : null;
  this.quantitySold = sale.quantitySold ? parseInt(sale.quantitySold, 10) : 0;
  this.dateCreated = (0, _moment2.default)();
};
//# sourceMappingURL=saleordermodel.js.map