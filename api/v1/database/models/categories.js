export default {
	CREATE_TABLE: `CREATE TABLE IF NOT EXISTS categories
	(
		id UUID PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description text NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
		updated_at TIMESTAMP DEFAULT NULL
	)`,
};