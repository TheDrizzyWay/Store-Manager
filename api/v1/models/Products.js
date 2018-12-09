import uuid from 'uuid';
import pool from '../database/dbconfig';

export default class Product {
  constructor(product) {
    if (product.id) {
      this.id = product.id;
    }
    this.name = product.name;
    this.description = product.description;
    this.price = product.price;
    this.quantity = product.quantity;
    this.minimumQuantity = product.minimumQuantity;
    this.imgUrl = product.imgUrl;
    if (product.category || product.category == null) {
      this.category = product.category;
    }
    if (product.createdAt) {
      this.createdAt = product.createdAt;
    }
    if (product.updatedAt || product.updatedAt == null) {
      this.updatedAt = product.updatedAt;
    }
  }

  async createProduct() {
    const text = `INSERT INTO products (id, name, description, price,
      quantity, minimum_quantity, imgUrl) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *`;
    const values = [uuid.v4(), this.name, this.description, this.price,
      this.quantity, this.minimumQuantity, this.imgUrl];
    const { rows } = await pool.query(text, values);
    return rows[0];
  }

  static async getAllProducts() {
    const text = 'SELECT * FROM products';
    const { rows } = await pool.query(text);
    return rows;
  }

  static async getProductById(id) {
    const text = 'SELECT * FROM products WHERE id = $1';
    const values = [id];
    const { rows } = await pool.query(text, values);
    return rows[0];
  }

  static async updateProduct(id, product) {
    const {
      name, description, price, quantity, minimumQuantity, imgUrl,
    } = product;
    const text = `UPDATE products SET name = $1, description = $2,
    price = $3, quantity = $4, minimum_quantity = $5, imgUrl =$6,
    updated_at = NOW() WHERE id = $7 RETURNING *`;
    const values = [name, description, price, quantity, minimumQuantity, imgUrl, id];
    const { rows } = await pool.query(text, values);
    return rows[0];
  }

  static async deleteProduct(id) {
    const text = 'DELETE FROM products WHERE id = $1';
    const values = [id];
    const result = await pool.query(text, values);
    return result;
  }
}
