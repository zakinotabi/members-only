const bcrypt = require('bcryptjs');
const signupQueries = require('../db/queries/signup');
const userQueries = require('../db/queries/userQueries');
const { body } = require('express-validator');
const { validationResult } = require('express-validator');

// express validation
// it takes the data automatically from req so body('username') will get username
const validateCreateUser = [
  body('username')
    .isLength({ min: 3 }) // conditions
    .withMessage('Username must be at least 3 chars long') // this message get saved in session
    .custom(async (value) => {
      // .custom is for different conditions

      // 1. Check for reserved/banned usernames (case-insensitive)
      // we banned so no one can create an acc with username that personating admin
      const reservedUsernames = ['admin', 'administrator', 'root', 'support'];
      if (reservedUsernames.includes(value.toLowerCase())) {
        throw new Error('This username is reserved and cannot be used');
      }

      // 2. Check if the username already exists in the database
      // this for other existing users
      const [user] = await userQueries.getUserByUsername(value);
      if (user) {
        throw new Error('username already in use');
      }
    }),

  body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 chars long'),

  body('password_confirm').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords do not match');
    }
    return true;
  }),
];

async function setNewUser(req, res) {
  const errors = validationResult(req);

  // here we check and collect all the errors to save them in session under a certain name
  // and stop the signing-up process (home controller will take care of showing messages)
  if (!errors.isEmpty()) {
    req.session.signupError = errors.array();
    return res.redirect('/');
  }
  const { name, username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const [newUser] = await signupQueries.addUser(name, username, hashedPassword);
  // 2. Automatically log in the new user
  // this is a good feature in passport js that you can login user
  // with one line req.login
  req.login(newUser, () => res.redirect('/'));
}

module.exports = {
  validateCreateUser,
  setNewUser,
};
