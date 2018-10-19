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

var _categorycontroller = require('../controllers/categorycontroller');

var _categorycontroller2 = _interopRequireDefault(_categorycontroller);

var _createcategoryvalidator = require('../middleware/createcategoryvalidator');

var _createcategoryvalidator2 = _interopRequireDefault(_createcategoryvalidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', _loggedinvalidator2.default, _categorycontroller2.default.findAllCategories);
router.get('/:categoryId', _loggedinvalidator2.default, _categorycontroller2.default.findCategoryById);
router.post('/', _loggedinvalidator2.default, _adminvalidator2.default, _createcategoryvalidator2.default, _categorycontroller2.default.createCategory);
router.put('/:categoryId', _loggedinvalidator2.default, _adminvalidator2.default, _categorycontroller2.default.updateCategory);
router.delete('/:categoryId', _loggedinvalidator2.default, _adminvalidator2.default, _categorycontroller2.default.deleteCategory);

exports.default = router;
//# sourceMappingURL=categoryroute.js.map