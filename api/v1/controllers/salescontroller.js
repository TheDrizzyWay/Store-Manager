import database from '../database';
import jwt from '../helpers/jwt';

export default class SalesController {
	static async createSale(req, res) {
		const {
      		productName = '', price = '', quantitySold = '',
    			} = req.body;
		const total = price * quantitySold;
		const { authorization: token = '' } = req.headers || {};

  		if (!token) {
    	res.status(401).send({ error: { message: 'Unauthorized' } });
    	return;
  		}
  		try {
    		const { sellerId } = await jwt.verifyToken(token);
    		const result = await database.query(
        `INSERT INTO sales
      (
        productName,
        price,
        quantitySold,
        total,
        sellerId)
        VALUES
        ($1, $2, $3, $4, $5)
      `,
        [productName, price, quantitySold, total, sellerId],
      );
    	res.status(201).send({ message: 'Product created successfully' });
      	return;
  		} catch (error) {
    		res.status(500).send({ error: { message: 'Error verifying user.' } });
  		}
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