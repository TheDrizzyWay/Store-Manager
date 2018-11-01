import jwt from 'jsonwebtoken';
import env from 'dotenv';

env.config();
const { JWT_SECRET } = process.env;

export default class JWT {
  static generateToken(payload) {
    return new Promise((resolve, reject) => jwt.sign(payload, JWT_SECRET, { expiresIn: '15d' }, (err, token) => {
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

  static destroyToken(payload) {
    jwt.sign(payload, JWT_SECRET, {
      expiresIn: Math.floor(Date.now() / 1000) - 60 * 60 * 24 * 30, // 30 days
    });
  }
}