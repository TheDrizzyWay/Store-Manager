import uuid from 'uuid';
import pool from '../database/dbconfig';

export default class Sale {
  constructor(sale) {
    this.productId = sale.productId;
    this.name = sale.name;
    this.price = sale.price;
    this.quantitySold = sale.quantitySold;
    this.total = sale.saleTotal;
    this.sellerId = sale.sellerId;
  }

  async createSale() {
    const text = `INSERT INTO sales (sale_id, product_id, name, price, quantity_sold,
      total, seller_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
    const values = [uuid.v4(), this.productId, this.name, this.price, this.quantitySold,
      this.total, this.sellerId];
    const { rows } = await pool.query(text, values);
    return rows[0];
  }

  static async getAllSalesAdmin() {
    const text = 'SELECT * FROM sales';
    const { rows } = await pool.query(text);
    return rows;
  }

  static async getAllSalesAttendant(id) {
    const text = 'SELECT * FROM sales WHERE seller_id = $1';
    const values = [id];
    const { rows } = await pool.query(text, values);
    return rows;
  }

  static async getSaleById(id) {
    const text = 'SELECT * FROM sales WHERE sale_id = $1';
    const values = [id];
    const { rows } = await pool.query(text, values);
    return rows[0];
  }
}
