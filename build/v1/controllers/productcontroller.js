'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _productmodel = require('../models/productmodel');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  createProduct: function createProduct(req, res) {
    var product = new _productmodel.Product(req.body);
    _productmodel.allProducts.push(product);
    res.status(201).send(product);
  },
  findAllProducts: function findAllProducts(req, res) {
    res.status(200).send(_productmodel.allProducts);
  },
  findProductById: function findProductById(req, res) {
    var productId = req.params.productId;
    var product = _productmodel.allProducts.find(function (obj) {
      return obj.id === productId;
    });
    if (product === undefined) {
      res.status(404).send({ errors: { message: 'Product not found.' } });
    }
    res.status(200).send(product);
  },
  updateProduct: function updateProduct(req, res) {
    var productId = req.params.productId;
    var previousProduct = _productmodel.allProducts.find(function (obj) {
      return obj.id === productId;
    });
    if (previousProduct === undefined) {
      return res.status(404).send({ errors: { message: 'Product not found.' } });
    }
    var updatedProduct = (0, _extends3.default)({}, previousProduct, req.body);
    var index = _productmodel.allProducts.findIndex(function (obj) {
      return obj.id === previousProduct.id;
    });

    _productmodel.allProducts.splice(index, 1, updatedProduct);
    res.status(200).send(updatedProduct);
  },
  deleteProduct: function deleteProduct(req, res) {
    var productId = req.params.productId;
    var index = _productmodel.allProducts.findIndex(function (obj) {
      return obj.id === productId;
    });
    if (index === -1) {
      return res.status(404).send({ errors: { message: 'Product not found.' } });
    }

    _productmodel.allProducts.splice(index, 1);
    res.status(204).send(_productmodel.allProducts);
  }
};
//# sourceMappingURL=productcontroller.js.map