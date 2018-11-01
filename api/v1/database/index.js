import { Pool } from 'pg';
import dotenv from 'dotenv';

import models from './models';

dotenv.config();

let connectionString = process.env.DATABASE_URL;

const pool = new Pool({ connectionString });

(async () => {
	let client = null;
	try {
		client = await pool.connect();
		await client.query('BEGIN');
		await models(client);
		await client.query('COMMIT');
	} catch (error) {
		if (client) await client.query('ROLLBACK');
	} finally {
		if (client) client.release();
	}
})();

export default pool;
