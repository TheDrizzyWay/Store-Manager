import uuid from 'uuid';
import pool from '../database/dbconfig';

export default class Category {
  constructor(category) {
    if (category.id) {
      this.id = category.id;
    }
    this.name = category.name;
    if (category.created_at) {
      this.created_at = category.created_at;
    }
    if (category.updated_at || category.updated_at == null) {
      this.updated_at = category.updated_at;
    }
  }

  async create() {
    const text = 'INSERT INTO categories (id, name) VALUES ($1, $2) RETURNING *';
    const values = [uuid.v4(), this.name];
    const { rows } = await pool.query(text, values);
    return rows[0];
  }
}
