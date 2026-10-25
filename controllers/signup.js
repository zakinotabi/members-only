const bcrypt = require('bcryptjs');
const signupQueries = require('../db/queries/signup');
const userQueries = require('../db/queries/userQueries');
const { body } = require('express-validator');
const { validationResult } = require('express-validator');

const validateCreateUser = [
  body('username')
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 chars long')
    .custom(async (value) => {
      // 1. Check for reserved/banned usernames (case-insensitive)
      const reservedUsernames = ['admin', 'administrator', 'root', 'support'];
      if (reservedUsernames.includes(value.toLowerCase())) {
        throw new Error('This username is reserved and cannot be used');
      }

      // 2. Check if the username already exists in the database
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

  if (!errors.isEmpty()) {
    req.session.signupError = errors.array();
    return res.redirect('/');
  }
  const { name, username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const [newUser] = await signupQueries.addUser(name, username, hashedPassword);
  // 2. Automatically log in the new user
  req.login(newUser, () => res.redirect('/'));
}

module.exports = {
  validateCreateUser,
  setNewUser,
};
