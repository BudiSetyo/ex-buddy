const subClassModel = require('../models/subClass');
// const { writeResponse, writeError } = require('../helpers/response');

const getSubClass = async (req, res) => {
  const { id } = req.params;
  const { course } = req.query;

  subClassModel
    .getSubClass(id, course)
    .then((result) => {
      res.status(200).send({
        message: 'success',
        result,
      });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

module.exports = {
  getSubClass,
};
