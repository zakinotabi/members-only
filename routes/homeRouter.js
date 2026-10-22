const { Router } = require('express');
const homeRouter = Router();
const signupController = require('../controllers/signup');
const loginController = require('../controllers/login');
const postController = require('../controllers/post');
const homeController = require('../controllers/home');

homeRouter.get('/', homeController.renderHomePage);
homeRouter.post('/signup', signupController.setNewUser);
homeRouter.post('/login', loginController.login);
homeRouter.post('/logout', loginController.logOut);
homeRouter.post('/posts', postController.setNewPost);

module.exports = homeRouter;
