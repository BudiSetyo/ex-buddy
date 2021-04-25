const Router = require('express').Router();
const auth = require('./auth');
const profile = require('./profile');
const course = require('./course');
const dashboard = require('./dashboard');

Router.use('/auth', auth);
Router.use('/profile', profile);
Router.use('/course', course);
Router.use('/dashboard', dashboard);

module.exports = Router;
