import uuid from 'uuid';
import pool from '../database/dbconfig';

export default class Sale {
  constructor(sale) {
    if (sale.id) {
      this.id = sale.id;
    }
    this.name = sale.name;
    this.price = sale.price;
    this.quantitySold = sale.quantitySold;
    this.total = sale.total;
    this.sellerId = sale.sellerId;
    if (sale.soldAt) {
      this.soldAt = sale.soldAt;
    }
  }

  async createSale() {
    const text = `INSERT INTO sales (sale_id, name, price, quantity_sold,
      total, seller_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
    const values = [uuid.v4(), this.name, this.price, this.quantitySold,
      this.total, this.sellerId];
    const { rows } = await pool.query(text, values);
    return rows[0];
  }
}
