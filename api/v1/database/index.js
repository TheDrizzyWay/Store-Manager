import { Pool } from 'pg';
import dotenv from 'dotenv';

import models from './models';

dotenv.config();

let connectionString = process.env.DATABASE_URL;

const pool = new Pool({ connectionString });

const dropTables = async (client) => {
  await client.query('DROP TABLE IF EXISTS users CASCADE');
  await client.query('DROP TABLE IF EXISTS products CASCADE');
  await client.query('DROP TABLE IF EXISTS sales CASCADE');
  await client.query('DROP TABLE IF EXISTS categories CASCADE');
};

(async () => {
	let client = null;
	try {
		client = await pool.connect();
		await client.query('BEGIN');
		await dropTables(client);
		await models(client);
		await client.query('COMMIT');
	} catch (error) {
		if (client) await client.query('ROLLBACK');
	} finally {
		if (client) client.release();
	}
})();

export default pool;
