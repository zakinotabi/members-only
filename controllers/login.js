// const loginQueries = require('../db/queries/login');
const passport = require('passport');
const { body } = require('express-validator');
const { validationResult } = require('express-validator');
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

const validateLogin = [
  body().custom((value, { req }) => {
    const { username, password } = req.body;
    if (!username || username.length < 3 || !password || password.length < 5) {
      throw new Error('Invalid username or password. Please try again.');
    }
    return true;
  }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.session.loginError = errors.array().map((error) => error.msg);
      return res.redirect('/');
    }
    next();
  },
];

const logOut = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/');
  });
};

module.exports = {
  login,
  validateLogin,
  logOut,
};
