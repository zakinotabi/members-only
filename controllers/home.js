const userQueries = require('../db/queries/userQueries');
const postQueries = require('../db/queries/post');

async function renderHomePage(req, res) {
  const messages = req.session.messages || [];
  const errorMessage = messages.length ? messages[messages.length - 1] : null;
  const activeModal = errorMessage ? 'login-dialog' : null;

  const allUsers = await userQueries.getAllUsers();
  const allPosts = await postQueries.getAllPosts();

  delete req.session.messages;
  delete req.session.activeModal;

  res.render('home', {
    allPosts,
    allUsers,
    activeUser: req.user || null,
    activeModal,
    errorMessage,
  });
}
module.exports = {
  renderHomePage,
};
