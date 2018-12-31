import uuid from 'uuid';
import pool from '../database/dbconfig';

export default class Category {
  constructor(category) {
    this.name = category.name;
  }

  async createCategory() {
    const text = 'INSERT INTO categories (id, name) VALUES ($1, $2) RETURNING *';
    const values = [uuid.v4(), this.name];
    const { rows } = await pool.query(text, values);
    return rows[0];
  }

  static async getAllCategories() {
    const text = 'SELECT * FROM categories';
    const { rows } = await pool.query(text);
    return rows;
  }

  static async getCategoryById(id) {
    const text = 'SELECT * FROM categories WHERE id = $1';
    const values = [id];
    const { rows } = await pool.query(text, values);
    return rows[0];
  }

  static async getCategoryByName(name) {
    const text = 'SELECT * FROM categories WHERE name = $1';
    const values = [name];
    const { rows } = await pool.query(text, values);
    return rows[0];
  }

  static async updateCategory(id, category) {
    const { name } = category;
    const text = `UPDATE categories SET name = $1, updated_at = NOW()
    WHERE id = $2 RETURNING *`;
    const values = [name, id];
    const { rows } = await pool.query(text, values);
    return rows[0];
  }

  static async deleteCategory(id) {
    const text = 'DELETE FROM categories WHERE id = $1';
    const values = [id];
    const result = await pool.query(text, values);
    return result;
  }
}
