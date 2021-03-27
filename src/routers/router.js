const Router = require('express').Router();
const auth = require('./auth');
const classRoute = require('./class');

Router.use('/auth', auth);
Router.use('/class', classRoute);

module.exports = Router;
