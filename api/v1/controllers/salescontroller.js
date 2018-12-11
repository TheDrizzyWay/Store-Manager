import Sale from '../models/Sales';
import Product from '../models/Products';

export default {
  createSale: (req, res) => {
    let counter = 0;
    const { sales } = req.body;
    const productLength = sales.length;

    sales.forEach(async (sale) => {
      const { productId, newQuantity } = sale;
      const newSale = new Sale(sale);
      try {
        const result1 = await newSale.createSale();
        const result2 = await Product.updateProductQuantity(productId, newQuantity);
        if (!result1 || !result2) {
          return res.status(500).send({ success: false, message: 'Something went wrong.' });
        }
        counter += 1;
      } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
      }
      if (counter === productLength) {
        return res.status(201).send({ success: true, message: 'Transaction completed successfully.' });
      }
      return true;
    });
  },

  getAllSales: async (req, res) => {
    const { id, role } = req.user;
    if (role === 'admin') {
      try {
        const result = await Sale.getAllSalesAdmin();
        if (result.length === 0) {
          return res.status(200).send({ success: false, message: 'No sales available yet' });
        }
        return res.status(200).send({ success: true, data: result });
      } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
      }
    } else {
      try {
        const result = await Sale.getAllSalesAttendant(id);
        if (result.length === 0) {
          return res.status(200).send({ success: false, message: 'No sales available yet' });
        }
        return res.status(200).send({ success: true, data: result });
      } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
      }
    }
  },

  getSaleById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Sale.getSaleById(id);
      if (!result) {
        return res.status(400).send({ success: false, message: 'Sale record not found' });
      }
      return res.status(200).send({ success: true, data: result });
    } catch (error) {
      return res.status(500).send({ success: false, message: error.message });
    }
  },
};
