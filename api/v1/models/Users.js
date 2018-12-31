import uuid from 'uuid';
import pool from '../database/dbconfig';

export default class User {
  constructor(user) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.password = user.password;
    this.role = user.role;
  }

  async signUp() {
    const text = `INSERT INTO users (id, first_name, last_name, email,
    password, role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
    const values = [uuid.v4(), this.firstName, this.lastName, this.email,
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

  static async deleteUser(id) {
    const text = 'DELETE FROM users WHERE id = $1';
    const values = [id];
    const result = await pool.query(text, values);
    return result;
  }
}
