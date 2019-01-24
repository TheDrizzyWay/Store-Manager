import pool from './dbconfig';

console.log('Dropping tables...');

(async () => {
  await pool.query('DROP TABLE IF EXISTS users CASCADE');
  await pool.query('DROP TABLE IF EXISTS products CASCADE');
  await pool.query('DROP TABLE IF EXISTS categories CASCADE');
  await pool.query('DROP TABLE IF EXISTS sales CASCADE');
})();
