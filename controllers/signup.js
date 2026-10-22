const bcrypt = require('bcryptjs');
const signupQueries = require('../db/queries/signup');

async function setNewUser(req, res) {
  const { name, username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const [newUser] = await signupQueries.addUser(name, username, hashedPassword);
  res.redirect('/');
}

module.exports = {
  setNewUser,
};
