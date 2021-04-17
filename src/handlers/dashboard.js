const dashboardModel = require('../models/dashboard');

const getSchedule = (req, res) => {
  const { id } = req.params;
  const { day } = req.query || '';

  dashboardModel
    .getSchedule(id, day)
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
  getSchedule,
};
