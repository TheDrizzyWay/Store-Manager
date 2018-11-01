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

      res.status(201).send({ message: 'Product created successfully' });
      return;
    } catch ({ message }) {
      res.status(500).send({ error: { message } });
    }
  }

  static async getAllProducts(req, res) {
    try {
      const result = await database.query('SELECT * FROM products');
      res.status(200).send(result.rows);
    } catch ({ message }) {
      res.status(500).send({ error: { message } });
    }
  }

  static async getProductById(req, res) {
    const { id } = req.product;
    try {
      const result = await database.query('SELECT * FROM products WHERE id = $1', [id]);
      if (result.rowCount <= 0) { 
        return res.status(400).send({ error: 'Product id not found'});
      }
      return res.send(result.rows[0]);
    } catch ({ message }) {
      res.status(500).send({ error: { message } });
    }
  }

  static async updateProduct(req, res) {
    const {
      name: pName, price: pPrice, quantity: pQuantity, minimumQuantity: pMinimumQuantity, imgUrl: pImgUrl, id,
    } = req.product;
    const {
      name, price, quantity, minimumQuantity, imgUrl,
    } = req.body || {};

    try {
      await database.query(
        'UPDATE products SET name = $1, price = $2, quantity = $3, minimumQuantity = $4, imgUrl = $5 WHERE id = $6',
        [name || pName, price || pPrice, quantity || pQuantity, minimumQuantity || pMinimumQuantity, imgUrl || pImgUrl, id],
      );

      res.status(200).send({ message: 'Product details updated successfully' });
    } catch ({ message }) {
      res.status(500).send({ error: { message } });
    }
  }

  static async deleteProduct(req, res) {
    const { id } = req.product;
    try {
      const result = await database.query('DELETE FROM products WHERE id = $1', [id]);
      if (result.rowCount > 0) res.status(204).send();
    } catch ({ message }) {
      res.status(500).send({ error: { message } });
    }
  }
}
