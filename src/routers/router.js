const Router = require('express').Router();
const auth = require('./auth');
const classRoute = require('./class');
const myclassRoute = require('./myclass');

Router.use('/auth', auth);
Router.use('/class', classRoute);
Router.use('/myclass', myclassRoute);

module.exports = Router;
