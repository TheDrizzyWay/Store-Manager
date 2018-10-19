'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _saleordermodel = require('../models/saleordermodel');

var _productmodel = require('../models/productmodel');

var _usermodel = require('../models/usermodel');

exports.default = {
  createSaleOrder: function createSaleOrder(req, res) {
    if (_usermodel.adminRole.length > 0) {
      return res.status(403).send({ errors: { message: 'You are not permitted to access this page.' } });
    }
    var saleOrder = new _saleordermodel.SaleOrder(req.body);
    var productForSale = req.body.name;
    var productConfirm = _productmodel.allProducts.find(function (obj) {
      return obj.name === productForSale;
    });
    if (productConfirm === undefined) {
      return res.status(404).send({ errors: { message: 'Product not found.' } });
    }
    var productQuantitySold = req.body.quantitySold;
    if (productQuantitySold > productConfirm.quantity) {
      return res.status(422).send({ errors: { message: 'We do not have the requested quantity.' } });
    }
    var productPrice = productConfirm.price;
    productConfirm.quantity -= productQuantitySold;
    productConfirm.total = productPrice * productQuantitySold;
    saleOrder.total = productConfirm.total;
    // confirm seller id
    var userEmail = _usermodel.loggedIn[0];
    var seller = _usermodel.allUsers.find(function (obj) {
      return obj.email === userEmail;
    });
    var sellerId = seller.id;
    saleOrder.seller = sellerId;

    _saleordermodel.allSales.push(saleOrder);
    res.status(201).send(saleOrder);
  },
  findAllSales: function findAllSales(req, res) {
    res.status(200).send(_saleordermodel.allSales);
  },
  findSaleById: function findSaleById(req, res) {
    if (_usermodel.adminRole.length > 0) {
      var saleId = req.params.saleId;
      var saleOrder = _saleordermodel.allSales.find(function (obj) {
        return obj.id === saleId;
      });
      if (saleOrder === undefined) {
        res.status(404).send({ errors: { message: 'Sale record not found.' } });
      }
      res.status(200).send(saleOrder);
    } else {
      var _saleId = req.params.saleId;
      // confirm seller id
      var userEmail = _usermodel.loggedIn[0];
      var seller = _usermodel.allUsers.find(function (obj) {
        return obj.email === userEmail;
      });
      var sellerId = seller.id;
      var _saleOrder = _saleordermodel.allSales.find(function (obj) {
        return obj.id === _saleId && obj.seller === sellerId;
      });
      if (_saleOrder === undefined) {
        res.status(404).send({ errors: { message: 'Sale record not found.' } });
      }
      res.status(200).send(_saleOrder);
    }
  }
};
//# sourceMappingURL=saleordercontroller.js.map