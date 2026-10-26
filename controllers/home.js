const userQueries = require('../db/queries/userQueries');
const postQueries = require('../db/queries/post');

async function renderHomePage(req, res) {
  // show err messages
  // getting message from passport session [messages] or express validator [loginError]
  const loginError = req.session.messages || req.session.loginError || [];
  // getting message from express validator [signupError]
  const signupError = req.session.signupError || [];
  // all [loginError] are the same sentences so we want just one
  // cause you can't tell the user if it's the username or the password that it's wrong
  const loginErrorMessage = loginError.length ? loginError[loginError.length - 1] : null;
  const signupErrorMessage = {};

  // fill and organize signupErrorMessage
  // in [signupError] there is different errors we want to show them all
  // but we have to organize so we can access them easily in ejs
  signupError.forEach((err) => {
    signupErrorMessage[err.path] = err.msg;
  });

  // modal handler
  // show modal if we have any errors to make user know
  const activeModal = loginErrorMessage ? 'login-dialog' : Object.keys(signupErrorMessage).length > 0 ? 'signup-dialog' : null;

  // delete err messages when refresh
  // we don't want the errors to say there after refresh
  delete req.session.messages;
  delete req.session.signupError;
  delete req.session.loginError;
  delete req.session.activeModal;

  // get users and posts data for home page
  const allUsers = await userQueries.getAllUsers();
  const allPosts = await postQueries.getAllPosts();

  // we save the environment where the user logged in
  // so we can compare it in each request
  // to prevent copying cookies (not a solid solution but a small first step)
  req.session.fingerprint = req.headers['user-agent'];

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
