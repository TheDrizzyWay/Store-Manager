import database from '../database';

export default class SalesController {
	static async createSale(req, res) {
    // Needs fixing
		const {
      		productName = '', price = '', quantitySold = '',
    			} = req.body;
		const total = price * quantitySold;
		
	}

	static async getAllSales(req, res) {
    try {
      const result = await database.query('SELECT * FROM sales');
      res.status(200).send(result.rows);
    } catch ({ message }) {
      res.status(500).send({ error: { message } });
    }
  }
}