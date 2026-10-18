async function getHomePage(req, res) {
  let user = null;
  if (req.session.userId) {
    user = await userQueries.getUserById(req.session.userId);
  }
  res.render('home', { user });
}
module.exports = {
  getHomePage,
};
