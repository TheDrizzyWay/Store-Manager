'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Product = exports.allProducts = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var allProducts = exports.allProducts = [{
  id: 'd7ce85ef-8b29-418d-b79f-3bb597a12c1e',
  name: 'adidas f10',
  imageUrl: 'sample-image.com',
  price: '10000',
  quantity: '10',
  minQuantity: '3',
  dateCreated: '2018-10-19T15:15:54.072Z'
}];

var Product = exports.Product = function Product(product) {
  (0, _classCallCheck3.default)(this, Product);

  this.id = _uuid2.default.v4();
  this.name = product.name ? product.name.toString() : null;
  this.imageUrl = product.imageUrl ? product.imageUrl.toString() : null;
  this.price = product.price ? parseInt(product.price, 10) : 0;
  this.quantity = product.quantity ? parseInt(product.quantity, 10) : 0;
  this.minQuantity = product.minQuantity ? parseInt(product.minQuantity, 10) : 0;
  this.dateCreated = (0, _moment2.default)();
};
//# sourceMappingURL=productmodel.js.map