import uuid from 'uuid';
import pool from '../database/dbconfig';

export default class User {
  constructor(user) {
    if (user.id) {
      this.id = user.id;
    }
    this.first_name = user.first_name ? user.first_name : null;
    this.last_name = user.last_name ? user.last_name : null;
    this.email = user.email ? user.email : null;
    this.password = user.password ? user.password : null;
    this.role = user.role ? user.role : null;
    if (user.created_at) {
      this.created_at = user.created_at;
    }
    if (user.updated_at || user.updated_at == null) {
      this.updated_at = user.updated_at;
    }
  }

  async signUp() {
    const text = `INSERT INTO users (id, first_name, last_name, email,
    password, role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
    const values = [uuid.v4(), this.first_name, this.last_name, this.email,
      this.password, this.role];
    const { rows } = await pool.query(text, values);
    return rows[0];
  }

  static async logIn(email) {
    const text = 'SELECT id, password, role FROM users WHERE email = $1';
    const values = [email];
    const { rows } = await pool.query(text, values);
    return rows[0];
  }

  static async getAllUsers() {
    const text = 'SELECT * FROM users';
    const { rows } = await pool.query(text);
    return rows;
  }

  static async getUserById(id) {
    const text = 'SELECT * FROM users WHERE id = $1';
    const values = [id];
    const { rows } = await pool.query(text, values);
    return rows[0];
  }
}
