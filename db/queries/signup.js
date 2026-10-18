const pool = require('../pool');

async function addUser(name, username, password) {
  const insertCat = `
  INSERT INTO users (name,username,password) 
  VALUES ($1, $2, $3) 
  RETURNING *;`;
  const { rows } = await pool.query(insertCat, [name, username, password]);
  return rows;
}

module.exports = {
  addUser,
};
