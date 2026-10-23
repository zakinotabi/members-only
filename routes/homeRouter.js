const { Router } = require('express');
const homeRouter = Router();
const homeController = require('../controllers/home');

homeRouter.get('/', homeController.renderHomePage);

module.exports = homeRouter;
