export default {
  CREATE_TABLE: `CREATE TABLE IF NOT EXISTS users
    (
        id SERIAL PRIMARY KEY,
        firstName VARCHAR(100),
        lastName VARCHAR(100),
        email VARCHAR(100) UNIQUE,
        password VARCHAR(100),
        isAdmin VARCHAR (20),
        created_at TIMESTAMP DEFAULT NOW(),
		updated_at TIMESTAMP DEFAULT NULL
    )
    `,
};
