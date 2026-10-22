// require('dotenv').config();
const { Client } = require('pg');

const INIT = `
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
    );

CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    content VARCHAR(280) NOT NULL,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE
    );
`;

(async (params) => {
  console.log('seeding...');
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();
  await client.query(INIT);
  await client.end();
  console.log('done');
})();
