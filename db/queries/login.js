const pool = require('../pool');

async function loginUser(username) {
  const selectUser = `
  SELECT * FROM users WHERE username = $1
  `;
  const { rows } = await pool.query(selectUser, [username]);
  return rows;
}

module.exports = {
  loginUser,
};
