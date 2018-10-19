'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _categorymodel = require('../models/categorymodel');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  createCategory: function createCategory(req, res) {
    var category = new _categorymodel.Category(req.body);
    _categorymodel.allCategories.push(category);
    res.status(201).send(category);
  },
  findAllCategories: function findAllCategories(req, res) {
    res.status(200).send(_categorymodel.allCategories);
  },
  findCategoryById: function findCategoryById(req, res) {
    var categoryId = req.params.categoryId;
    var category = _categorymodel.allCategories.find(function (obj) {
      return obj.id === categoryId;
    });
    if (category === undefined) {
      res.status(404).send({ errors: { message: 'Category not found.' } });
    }
    res.status(200).send(category);
  },
  updateCategory: function updateCategory(req, res) {
    var categoryId = req.params.categoryId;
    var previousCategory = _categorymodel.allCategories.find(function (obj) {
      return obj.id === categoryId;
    });
    if (previousCategory === undefined) {
      return res.status(404).send({ errors: { message: 'Category not found.' } });
    }
    var updatedCategory = (0, _extends3.default)({}, previousCategory, req.body);
    var index = _categorymodel.allCategories.findIndex(function (obj) {
      return obj.id === previousCategory.id;
    });

    _categorymodel.allCategories.splice(index, 1, updatedCategory);
    res.status(200).send(updatedCategory);
  },
  deleteCategory: function deleteCategory(req, res) {
    var categoryId = req.params.categoryId;
    var index = _categorymodel.allCategories.findIndex(function (obj) {
      return obj.id === categoryId;
    });
    if (index === -1) {
      return res.status(404).send({ errors: { message: 'Category not found.' } });
    }

    _categorymodel.allCategories.splice(index, 1);
    res.status(204).send(_categorymodel.allCategories);
  }
};
//# sourceMappingURL=categorycontroller.js.map