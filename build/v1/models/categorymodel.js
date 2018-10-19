'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Category = exports.allCategories = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var allCategories = exports.allCategories = [{
  id: 'bd80694c-a937-4378-aded-702207149757',
  name: 'x-series',
  description: 'Latest adidas x soccer boots.',
  dateCreated: '2018-10-18T19:46:53.034Z'
}];

var Category = exports.Category = function Category(category) {
  (0, _classCallCheck3.default)(this, Category);

  this.id = _uuid2.default.v4();
  this.name = category.name ? category.name.toString() : null;
  this.description = category.description.toString() ? category.description : null;
  this.dateCreated = (0, _moment2.default)();
};
//# sourceMappingURL=categorymodel.js.map