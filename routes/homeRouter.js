const { Router } = require('express');
const homeRouter = Router();
const signupController = require('../controllers/signup');
const homeController = require('../controllers/home');

homeRouter.get('/', homeController.getHomePage);
homeRouter.post('/signup', signupController.setNewUser);

module.exports = homeRouter;
