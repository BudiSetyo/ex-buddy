const Router = require('express').Router();

const authHandler = require('../handlers/auth');

Router.post('/register', authHandler.register);
Router.post('/login', authHandler.login);
Router.patch('/reset', authHandler.reset);

module.exports = Router;
