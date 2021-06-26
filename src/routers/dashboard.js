const Router = require('express').Router();
const dashboardHandler = require('../handlers/dashboard');
const {
  teacherOtorization,
  studentOtorization,
} = require('../middlewares/authorize');

Router.get('/', dashboardHandler.getAllSchedule);
Router.get('/user', studentOtorization, dashboardHandler.getScheduleUser);
Router.get(
  '/fasilitator',
  teacherOtorization,
  dashboardHandler.getScheduleFasilitator
);

module.exports = Router;
