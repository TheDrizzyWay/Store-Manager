export default {
	CREATE_TABLE: `CREATE TABLE IF NOT EXISTS sales
	(
	id UUID PRIMARY KEY,
  	product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  	quantitySold integer NOT NULL,
  	total integer NOT NULL,
  	seller_id UUID REFERENCES users(id) ON DELETE CASCADE,
  	created_at TIMESTAMP DEFAULT NOW()
	)`,
};
