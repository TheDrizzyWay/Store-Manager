import {
  passwordLength, validateEmail, comparePassword, hashPassword,
} from '../helpers/inputvalidator';
import database from '../database';
import jwt from '../helpers/jwt';

export default class UserController {
	static async createAccount(req, res) {
    const {
      firstName = '', lastName = '', email, password, isAdmin,
    } = req.body;

    if (!email || !password) {
      res.status(400).send({ message: 'Email and password are required.' });
      return;
    }

    if (!passwordLength(password)) {
      res.status(400).send({ message: 'Password must be at least 6 characters long.' });
      return;
    }

    if (!validateEmail(email)) {
      res.status(400).send({ message: 'Invalid email address.' });
      return;
    }

    try {
      let result = await database.query('SELECT email FROM users WHERE email = $1', [email]);

      if (result.rowCount > 0) {
        res.status(409).send({ message: 'Email is already registered.' });
        return;
      }

      const hash = await hashPassword(password);

      result = await database.query(
        `INSERT INTO users 
      (
        first_name,
        last_name,
        email,
        password,
        is_admin)
        VALUES
        ($1, $2, $3, $4, $5)
      `,
        [firstName, lastName, email, hash, isAdmin],
      );

      res.status(201).send({ message: 'user created successfully' });
      return;
    } catch ({ message }) {
      res.status(500).send({ error: { message } });
    }
  }

  static async logIn(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).send({ message: 'Please provide email & password to login.' });
      return;
    }

    try {
      const result = await database.query('SELECT id, password FROM users WHERE email = $1', [email]);
      if (result.rowCount <= 0) {
        res.status(401).send({ message: 'Invalid email/password combination.' });
        return;
      }

      const { id: userId, password: userPassword } = result.rows[0];
      if (!comparePassword(password, userPassword)) {
        res.status(401).send({ message: 'Invalid email and password combination.' });
        return;
      }

      const token = await jwt.generateToken({ id: userId });
      res.status(200).send({ token, message: 'You are logged in.' });
    } catch ({ message }) {
      res
        .status(500)
        .send({ error: { message: 'Server encountered a problem while trying to log in.' } });
    }
  }

  static async getAllUsers(req, res) {
    try {
      const result = await database.query('SELECT * FROM users');
      res.status(200).send(result.rows);
    } catch ({ message }) {
      res.status(500).send({ error: { message } });
    }
  }
}
