import uuid from 'uuid';
import hashes from '../middleware/hashes';
import pool from './dbconfig';

console.log('seeding database');

(async () => {
  const id = uuid.v4();
  const password = 'abc123';
  const hashed = hashes.hashPassword(password);
  let result;
  const params = [id, 'Micheal', 'Myers', 'mikemyers@gmail.com', hashed, 'admin'];
  try {
    result = await pool.query(`INSERT INTO users (id, first_name, last_name, email, password, role)
      VALUES ($1, $2, $3, $4, $5, $6)`, params);
    return result;
  } catch (error) {
    return error;
  }
})();

(async () => {
  const id = uuid.v4();
  const password = 'jasonv';
  const hashed = hashes.hashPassword(password);
  let result;
  const params = [id, 'Jason', 'Voorhees', 'jasonv@email.com', hashed, 'attendant'];
  try {
    result = await pool.query(`INSERT INTO users (id, first_name, last_name, email, password, role)
      VALUES ($1, $2, $3, $4, $5, $6)`, params);
    return result;
  } catch (error) {
    return error;
  }
})();
