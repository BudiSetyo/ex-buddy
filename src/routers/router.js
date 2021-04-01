const Router = require('express').Router();
const auth = require('./auth');
const classRoute = require('./class');
const myclassRoute = require('./myclass');
const profile = require('./profile');

Router.use('/auth', auth);
Router.use('/class', classRoute);
Router.use('/myclass', myclassRoute);
Router.use('profile', profile);

module.exports = Router;
