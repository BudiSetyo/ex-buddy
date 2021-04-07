const Router = require('express').Router();
const auth = require('./auth');
const classRoute = require('./class');
const profile = require('./profile');
const subClass = require('./subClass');

Router.use('/auth', auth);
Router.use('/class', classRoute);
Router.use('/profile', profile);
Router.use('/subClass', subClass);

module.exports = Router;
