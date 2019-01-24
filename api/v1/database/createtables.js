import pool from './dbconfig';

console.log('Creating tables...');

(async () => {
  await pool.query(`CREATE TABLE IF NOT EXISTS users(
      id UUID PRIMARY KEY,
      first_name VARCHAR(50) NOT NULL,
      last_name VARCHAR(50) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(100) NOT NULL,
      role VARCHAR(20) NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NULL)`);

  await pool.query(`CREATE TABLE IF NOT EXISTS products(
      id UUID PRIMARY KEY,
      name VARCHAR(50) UNIQUE NOT NULL,
      description TEXT NOT NULL,
      price float NOT NULL,
      quantity integer NOT NULL,
      minimum_quantity integer NOT NULL,
      imgUrl text NOT NULL,
      category VARCHAR(100) DEFAULT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NULL)`);

  await pool.query(`CREATE TABLE IF NOT EXISTS categories(
      id UUID PRIMARY KEY,
      name VARCHAR(50) UNIQUE NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NULL)`);

  await pool.query(`CREATE TABLE IF NOT EXISTS sales(
      sale_id UUID PRIMARY KEY,
      product_id UUID NOT NULL,
      name VARCHAR(50) NOT NULL,
      price float NOT NULL,
      quantity_sold integer NOT NULL,
      total float NOT NULL,
      seller_id UUID NOT NULL,
      sold_at TIMESTAMPTZ DEFAULT NOW(),
      FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE,
      FOREIGN KEY (seller_id) REFERENCES users (id) ON DELETE CASCADE)`);
})();
