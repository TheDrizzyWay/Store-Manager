import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const { JWT_SECRET } = process.env;

export default class Hashes {
  static generateToken(payload) {
    return new Promise((resolve, reject) => jwt.sign(payload, JWT_SECRET, { expiresIn: '3d' }, (err, token) => {
      if (err) return reject();
      return resolve(token);
    }));
  }

  static verifyToken(token) {
    return new Promise((resolve, reject) => jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) return reject();
      return resolve(decoded);
    }));
  }

  static hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  }

  static comparePassword(password, hashPassword) {
    return bcrypt.compareSync(password, hashPassword);
  }
}
