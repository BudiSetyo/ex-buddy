const dashboardModel = require('../models/dashboard');

const getAllSchedule = (req, res) => {
  const { day } = req.query || '';

  dashboardModel
    .getAllSchedule(day)
    .then((result) => {
      res.status(200).send({
        message: 'success',
        result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
};

const getScheduleUser = (req, res) => {
  const { id } = req.params;
  const { day } = req.query || '';

  dashboardModel
    .getScheduleUser(id, day)
    .then((result) => {
      res.status(200).send({
        message: 'success',
        result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
};

module.exports = {
  getAllSchedule,
  getScheduleUser,
};
