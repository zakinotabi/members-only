const pool = require('../pool');

async function getUserById(userId) {
  const user = 'SELECT * FROM users WHERE id = $1';
  const { rows } = await pool.query(user, [userId]);
  return rows;
}

async function getUserByUsername(username) {
  const user = 'SELECT * FROM users WHERE username = $1';
  const { rows } = await pool.query(user, [username]);
  return rows;
}

async function getAllUsers() {
  const users = 'SELECT id, name, username FROM users;';
  const { rows } = await pool.query(users);
  return rows;
}

module.exports = {
  getUserById,
  getUserByUsername,
  getAllUsers,
};
