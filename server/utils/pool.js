import PG from 'pg';
const Pool = PG.Pool;

const dbUrl = process.env.DATABASE_URL || "postgres://postgres:123456789@localhost:5432/goal";

const pool = new Pool({
	connectionString: dbUrl,
	connectionTimeoutMillis: 5000,
	ssl: dbUrl.includes("localhost") ? false : { rejectUnauthorized: false },
});

export default pool
