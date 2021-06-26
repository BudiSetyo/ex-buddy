const Router = require('express').Router();
const auth = require('./auth');
const profile = require('./profile');
const course = require('./course');
const dashboard = require('./dashboard');
const { authentication } = require('../middlewares/authenticate');

Router.use('/auth', auth);
Router.use('/profile', authentication, profile);
Router.use('/course', authentication, course);
Router.use('/dashboard', authentication, dashboard);

module.exports = Router;
