export default {
	CREATE_TABLE: `CREATE TABLE IF NOT EXISTS sales
	(
	id SERIAL PRIMARY KEY,
  	productName SERIAL REFERENCES products(name) ON DELETE CASCADE,
  	price integer REFERENCES products(price) ON DELETE CASCADE,
  	quantitySold integer NOT NULL,
  	total integer NOT NULL,
  	sellerId SERIAL REFERENCES users(id) ON DELETE CASCADE,
  	created_at TIMESTAMP DEFAULT NOW()
	)`,
};
