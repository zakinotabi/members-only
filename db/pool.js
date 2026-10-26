require('dotenv').config();
const { Pool } = require('pg');

const neonUrl = process.env.DATABASE_URL?.includes('neon.tech');

module.exports = new Pool({
  connectionString: process.env.DATABASE_URL,
  ...(neonUrl ? { ssl: { rejectUnauthorized: false } } : {}),
});
