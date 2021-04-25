const Router = require('express').Router();

const authHandler = require('../handlers/auth');
const authorize = require('../middlewares/authorize');

Router.post('/register', authHandler.register);
Router.post('/login', authHandler.login);
Router.post('/logout', authorize.verifyToken, authHandler.logout);
Router.patch('/reset', authHandler.reset);

module.exports = Router;
