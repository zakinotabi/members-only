const userQueries = require('../db/queries/userQueries');
const postQueries = require('../db/queries/post');

async function renderHomePage(req, res) {
  // show err messages
  const loginError = req.session.messages || [];
  const signupError = req.session.signupError || [];
  const loginErrorMessage = loginError.length ? loginError[loginError.length - 1] : null;
  const signupErrorMessage = {};

  // fill and organize signupErrorMessage
  signupError.forEach((err) => {
    signupErrorMessage[err.path] = err.msg;
  });

  // modal handler
  const activeModal = loginErrorMessage ? 'login-dialog' : Object.keys(signupErrorMessage).length > 0 ? 'signup-dialog' : null;

  // delete err messages when refresh
  delete req.session.messages;
  delete req.session.signupError;
  delete req.session.activeModal;

  // het data for home page
  const allUsers = await userQueries.getAllUsers();
  const allPosts = await postQueries.getAllPosts();

  res.render('home', {
    allPosts,
    allUsers,
    activeUser: req.user || null,
    activeModal,
    loginErrorMessage,
    signupErrorMessage,
  });
}
module.exports = {
  renderHomePage,
};
