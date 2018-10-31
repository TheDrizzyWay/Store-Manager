export default {
	CREATE_TABLE: `CREATE TABLE IF NOT EXISTS sales
	(
	  id SERIAL PRIMARY KEY,
  	productName varchar(100) NOT NULL,
  	price integer NOT NULL,
  	quantitySold integer NOT NULL,
  	total integer NOT NULL,
  	sellerId integer NOT NULL,
  	created_at TIMESTAMP DEFAULT NOW()
	)`,
};
