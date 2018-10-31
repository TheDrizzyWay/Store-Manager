export default {
  CREATE_TABLE: `CREATE TABLE IF NOT EXISTS users
    (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(100),
        last_name VARCHAR(100),
        email VARCHAR(100) UNIQUE,
        password VARCHAR(100),
        is_admin BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT NOW(),
		updated_at TIMESTAMP DEFAULT NULL
    )
    `,
};
