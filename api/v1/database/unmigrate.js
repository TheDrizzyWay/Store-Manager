import pool from './dbconfig';

console.log('Dropping tables...');

(async () => {
  await pool.query('DROP TABLE IF EXISTS products');
  await pool.query('DROP TABLE IF EXISTS categories');
  await pool.query('DROP TABLE IF EXISTS sales');
  await pool.query('DROP TABLE IF EXISTS users');
})();
