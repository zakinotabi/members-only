// const loginQueries = require('../db/queries/login');
const passport = require('passport');

// old skeleton code
// async function getUserLogin(req, res) {
//   const { username, password } = req.body;
//   const [user] = await loginQueries.loginUser(username);
//   if (user?.id) {
//     req.session.userId = user.id;
//     res.redirect('/');
//   } else {
//     req.session.errorMessage = 'Invalid username or password. Please try again.';
//     req.session.activeModal = 'login-dialog';

//     return res.redirect('/');
//   }
// }

const login = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/',
  failureMessage: true,
});

const logOut = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/');
  });
};

module.exports = {
  login,
  logOut,
};
