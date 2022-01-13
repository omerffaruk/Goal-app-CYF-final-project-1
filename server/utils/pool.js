const { Pool } = require("pg");

const dbUrl = process.env.DATABASE_URL || "postgres://asif:786god@localhost:5432/goal";

const pool = new Pool({
	connectionString: dbUrl,
	connectionTimeoutMillis: 5000,
	ssl: dbUrl.includes("localhost") ? false : { rejectUnauthorized: false },
});




module.exports = pool;
