export default {
	CREATE_TABLE: `CREATE TABLE IF NOT EXISTS sales
	(
	id SERIAL PRIMARY KEY,
  	product_id SERIAL REFERENCES products(id) ON DELETE CASCADE,
  	quantitySold integer NOT NULL,
  	total integer NOT NULL,
  	seller_id SERIAL REFERENCES users(id) ON DELETE CASCADE,
  	created_at TIMESTAMP DEFAULT NOW()
	)`,
};
