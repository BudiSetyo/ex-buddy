const dashboardModel = require('../models/dashboard');
const { response } = require('../helpers/response');

const getAllSchedule = (req, res) => {
  const { day } = req.query || '';

  dashboardModel
    .getAllSchedule(day)
    .then((result) => {
      return response(res, 200, 'Success', { result });
    })
    .catch((err) => {
      console.log(err);
      return response(res, 500, err);
    });
};

const getScheduleUser = (req, res) => {
  const id = req.id;
  const { day } = req.query || '';

  dashboardModel
    .getScheduleUser(id, day)
    .then((result) => {
      return response(res, 200, 'Success', { result });
    })
    .catch((err) => {
      console.log(err);
      return response(res, 500, err);
    });
};

const getScheduleFasilitator = (req, res) => {
  const id = req.id;
  const { day } = req.query;

  dashboardModel
    .getScheduleFasilitator(id, day)
    .then((result) => {
      return response(res, 200, 'Success', { result });
    })
    .catch((err) => {
      console.log(err);
      return response(res, 500, err);
    });
};

module.exports = {
  getAllSchedule,
  getScheduleUser,
  getScheduleFasilitator,
};
