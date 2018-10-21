import { allSales, SaleOrder } from '../models/saleordermodel';
import { allProducts } from '../models/productmodel';
import { allUsers, loggedIn, adminRole } from '../models/usermodel';

export default {
  createSaleOrder(req, res) {
    if (adminRole.length > 0) {
      return res.status(403).send({ errors: { message: 'You are not permitted to access this page.' } });
    }
    const saleOrder = new SaleOrder(req.body);
    const productForSale = req.body.name;
    const productConfirm = allProducts.find(obj => obj.name === productForSale);
    if (productConfirm === undefined) {
      return res.status(400).send({ errors: { message: 'Product not found.' } });
    }
    const productQuantitySold = req.body.quantitySold;
    if (productQuantitySold > productConfirm.quantity) {
      return res.status(422).send({ errors: { message: 'We do not have the requested quantity.' } });
    }
    const productPrice = productConfirm.price;
    productConfirm.quantity -= productQuantitySold;
    productConfirm.total = productPrice * productQuantitySold;
    saleOrder.total = productConfirm.total;
    // confirm seller id
    const userEmail = loggedIn[0];
    const seller = allUsers.find(obj => obj.email === userEmail);
    const sellerId = seller.id;
    saleOrder.seller = sellerId;

    allSales.push(saleOrder);
    res.status(201).send(saleOrder);
  },

  findAllSales(req, res) {
    res.status(200).send(allSales);
  },

  findSaleById(req, res) {
    if (adminRole.length > 0) {
      const saleId = req.params.saleId;
      const saleOrder = allSales.find(obj => obj.id === saleId);
      if (saleOrder === undefined) {
        res.status(404).send({ errors: { message: 'Sale record not found.' } });
      }
      res.status(200).send(saleOrder);
    } else {
      const saleId = req.params.saleId;
      // confirm seller id
      const userEmail = loggedIn[0];
      const seller = allUsers.find(obj => obj.email === userEmail);
      const sellerId = seller.id;
      const saleOrder = allSales.find(obj => obj.id === saleId && obj.seller === sellerId);
      if (saleOrder === undefined) {
        res.status(404).send({ errors: { message: 'Sale record not found.' } });
      }
      res.status(200).send(saleOrder);
    }
  },
};
