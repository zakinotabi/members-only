const { Router } = require('express');
const userRouter = Router();
const signupController = require('../controllers/signup');
const loginController = require('../controllers/login');

userRouter.post('/signup', signupController.validateCreateUser, signupController.setNewUser);
userRouter.post('/login', loginController.validateLogin, loginController.login);
userRouter.post('/logout', loginController.logOut);

module.exports = userRouter;
