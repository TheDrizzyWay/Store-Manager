import { allSales, SaleOrder } from '../models/saleordermodel';
import { allProducts } from '../models/productmodel';
import { allUsers, loggedIn, adminRole } from '../models/usermodel';

export default {
  createSaleOrder: (req, res) => {
    const saleOrder = new SaleOrder(req.body);
    const productForSale = req.body.name;
    const productConfirm = allProducts.find(obj => obj.name === productForSale);
    if (productConfirm === undefined) {
      return res.status(400).send({ success: false, message: 'Product not found.' });
    }
    const productQuantitySold = parseInt(req.body.quantitySold, 10);
    if (productQuantitySold > productConfirm.quantity) {
      return res.status(422).send({ success: false, message: 'We do not have the requested quantity.' });
    }
    const productPrice = productConfirm.price;
    productConfirm.quantity -= productQuantitySold;
    productConfirm.total = productPrice * productQuantitySold;
    saleOrder.total = productConfirm.total;
    const userEmail = loggedIn[0];
    const seller = allUsers.find(obj => obj.email === userEmail);
    const sellerId = seller.id;
    saleOrder.seller = sellerId;

    allSales.push(saleOrder);
    return res.status(201).send({ success: true, message: 'Transaction completed.', data: saleOrder });
  },

  findAllSales: (req, res) => {
    res.status(200).send({ success: true, message: 'All sale records found.', data: allSales });
  },

  findSaleById: (req, res) => {
    if (adminRole.length > 0) {
      const saleId = req.params.saleId;
      const saleOrder = allSales.find(obj => obj.id === saleId);
      if (saleOrder === undefined) {
        return res.status(404).send({ success: false, message: 'Sale record not found.' });
      }
      res.status(200).send({ success: true, message: 'Sale record found.', data: saleOrder });
    } else {
      const saleId = req.params.saleId;
      const userEmail = loggedIn[0];
      const seller = allUsers.find(obj => obj.email === userEmail);
      const sellerId = seller.id;
      const saleOrder = allSales.find(obj => obj.id === saleId && obj.seller === sellerId);
      if (saleOrder === undefined) {
        return res.status(404).send({ success: false, message: 'Sale record not found.' });
      }
      return res.status(200).send({ success: true, message: 'Sale record found.', data: saleOrder });
    }
  },
};
