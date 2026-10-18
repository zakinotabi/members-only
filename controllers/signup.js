const signupQueries = require('../db/queries/signup');

async function setNewUser(req, res) {
  const { name, username, password } = req.body;
  const newUser = await signupQueries.addUser(name, username, password);
  req.session.userId = newUser.id;
  //add cookies
  res.redirect('/');
}

module.exports = {
  setNewUser,
};
