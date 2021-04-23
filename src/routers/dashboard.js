const Router = require('express').Router();
const dashboardHandler = require('../handlers/dashboard');

Router.get('/', dashboardHandler.getAllSchedule);
Router.get('/:id', dashboardHandler.getScheduleUser);

module.exports = Router;
