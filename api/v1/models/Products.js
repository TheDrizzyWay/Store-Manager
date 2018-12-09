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
    this.minimum_quantity = product.minimum_quantity;
    this.imgUrl = product.imgUrl;
    if (product.category || product.category == null) {
      this.category = product.category;
    }
    if (product.created_at) {
      this.created_at = product.created_at;
    }
    if (product.updated_at || product.updated_at == null) {
      this.updated_at = product.updated_at;
    }
  }

  async createProduct() {
    const text = `INSERT INTO products (id, name, description, price,
      quantity, minimum_quantity, imgUrl) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *`;
    const values = [uuid.v4(), this.name, this.description, this.price,
      this.quantity, this.minimum_quantity, this.imgUrl];
    const { rows } = await pool.query(text, values);
    return rows[0];
  }
}
