import { validateUrl } from '../helpers/inputvalidator';
import database from '../database';

export default class ProductController {
	static async createProduct(req, res) {
    const {
      name = '', price = '', quantity = '', minimumQuantity = '', imgUrl,
    } = req.body;

    if (!name || !price || !quantity || !minimumQuantity || !imgUrl) {
      res.status(400).send({ message: 'All fields are required.' });
      return;
    }

    if (!validateUrl(imgUrl)) {
      res.status(400).send({ message: 'Invalid image link.' });
      return;
    }

    try {
      let result = await database.query('SELECT name FROM products WHERE name = $1', [name]);

      if (result.rowCount > 0) {
        res.status(409).send({ message: 'This product already exists.' });
        return;
      }

      result = await database.query(
        `INSERT INTO products 
      (
        name,
        price,
        quantity,
        minimumQuantity,
        imgUrl)
        VALUES
        ($1, $2, $3, $4, $5)
      `,
        [name, price, quantity, minimumQuantity, imgUrl],
      );

      res.status(201).send({ message: 'user created successfully' });
      return;
    } catch ({ message }) {
      res.status(500).send({ error: { message } });
    }
  }
}