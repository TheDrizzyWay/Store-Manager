import jwt from '../helpers/jwt';
import database from '../database';

export default class SalesController {
	static async createSale(req, res) {
    const { authorization: token = '' } = req.headers || {};

    if (!token) {
      res.status(401).send({ error: { message: 'Unauthorized' } });
      return;
    }

    try {
      const { id } = await jwt.verifyToken(token);
      let result = await database.query('SELECT id, email, isAdmin FROM users WHERE id = $1', [id]);

      if (result.rowCount <= 0) {
        res.status(401).send({ error: { message: 'Unauthorized' } });
        return;
      }
      const user = result.rows[0];
      req.user = user;
      const seller = Object.assign({}, req.user);
      if (seller && seller.isadmin == 'true') {
      return res.status(401).send({ error: { message: 'Unauthorized' } });
      }
      const sellerId = seller.id;
      const { name = '', price = '', quantitySold = '' } = req.body;
      const total = price * quantitySold;

      if (!name || !price || !quantitySold) {
      res.status(400).send({ message: 'All fields are required.' });
      return;
        }

     result = await database.query(
            `INSERT INTO sales 
          (
            name,
            price,
            quantitySold,
            total,
            sellerId)
            VALUES
            ($1, $2, $3, $4, $5)
          `,
            [name, price, quantitySold, total, sellerId],
          );

      res.status(201).send({ message: 'Transaction complete' });
      return;
    } catch ({ message }) {
      res.status(500).send({ error: { message } });
    }
	}

	static async getAllSales(req, res) {
    try {
      const result = await database.query('SELECT * FROM sales');
      if (result.rowCount <= 0) {
        res.status(200).send({ message: 'No sale records available' });
      }
      res.status(200).send(result.rows);
    } catch ({ message }) {
      res.status(500).send({ error: { message } });
    }
  }

  static async getMySales(req, res) {
    const { id } = req.params;
    try {
      const result = await database.query('SELECT * FROM sales WHERE sellerId = $1', [id]);
      res.send(result.rows[0]);
    } catch (error) {
      res.status(500).send({ error: { message: 'No sales available.' } });
    }
  }
}