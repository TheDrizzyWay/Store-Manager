import uuid from 'uuid';
import pool from './dbconfig';

console.log('seeding database');

(async () => {
  // const password = bcrypt.hashSync('melvine1', 10);
  const id = uuid.v4();
  let result;
  const params = [id, 'Micheal', 'Myers', 'mikemyers@test.com', 'abc123', 'admin'];
  try {
    result = await pool.query(`INSERT INTO users (id, first_name, last_name, email, password, role)
      VALUES ($1, $2, $3, $4, $5, $6)`, params);
    return result;
  } catch (error) {
    return error;
  }
})();
