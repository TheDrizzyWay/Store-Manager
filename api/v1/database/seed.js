// import uuid from 'uuid';
import hashes from '../middleware/hashes';
import pool from './dbconfig';

console.log('seeding database');

(async () => {
  const id = '8e75ed1c-c48a-4de2-9f8c-df597aeace8f';
  const password = 'micheal';
  const hashed = hashes.hashPassword(password);
  let result;
  const params = [id, 'Micheal', 'Myers', 'mikemyers@email.com', hashed, 'admin'];
  try {
    result = await pool.query(`INSERT INTO users (id, first_name, last_name, email, password, role)
      VALUES ($1, $2, $3, $4, $5, $6)`, params);
    return result;
  } catch (error) {
    return error;
  }
})();

(async () => {
  const id = '3bcbff41-7285-42f4-a934-e346382f3fbc';
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
