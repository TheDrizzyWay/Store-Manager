import Sale from '../models/Sales';

export default {
  createSale: async (req, res) => {
    const { sale } = req.body;
    const { id } = req.user;
    const details = {};
    sale.forEach((obj) => {
      details.name = obj.name;
      details.price = obj.price;
      details.quantitySold = obj.quantitySold;
      details.total = obj.price * obj.quantitySold;
      details.sellerId = id;
    });
  },
};
/*
fix validations using map and arrays
check if product exists
check if quantity is sufficient
create sale
update product quantity
  static async getAllSales(req, res) {
    try {
      const result = await database.query('SELECT * FROM sales');
      const result = await database.query('SELECT * FROM sales WHERE sellerId = $1', [id]);
      if (result.rowCount <= 0) {
        res.status(200).send({ message: 'No sale records available' });
      }
      res.status(200).send(result.rows);
    } catch ({ message }) {
      res.status(500).send({ error: { message } });
    }
  }
   */
