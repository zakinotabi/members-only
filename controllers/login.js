const passport = require('passport');
const { body } = require('express-validator');
const { validationResult } = require('express-validator');

const login = passport.authenticate('local', {
  // so in passport js the strategy does all the work
  // login logout become very easy
  successRedirect: '/',
  failureRedirect: '/',
  failureMessage: true,
});

// I added login validation lately cause just in case
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

// log out in passport js
// underneath it just terminate the session
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

// old skeleton code
// this is a very basic way i was just training my mind

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
