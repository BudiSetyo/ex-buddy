const Router = require('express').Router();
const dashboardHandler = require('../handlers/dashboard');

Router.get('/:id', dashboardHandler.getSchedule);

module.exports = Router;
