export default {
	CREATE_TABLE: `CREATE TABLE IF NOT EXISTS products
	(
	id SERIAL PRIMARY KEY,
	name varchar(100) NOT NULL,
	price integer NOT NULL,
	quantity integer NOT NULL,
	minimumQuantity integer NOT NULL,
	imgUrl text NOT NULL,
	created_at TIMESTAMP DEFAULT NOW(),
	updated_at TIMESTAMP DEFAULT NOW()
	)`,
};
