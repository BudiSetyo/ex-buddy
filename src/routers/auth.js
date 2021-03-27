const Router = require('express').Router();

const authHandler = require('../handlers/auth');

Router.post('/register', authHandler.register);
Router.get('/login', authHandler.login);

module.exports = Router;
