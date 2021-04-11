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

const addSubClass = (req, res) => {
  const { subClassName, idClass } = req.body;

  if (!subClassName || !idClass) {
    res.status(500).send({
      message: `some fields cannot be empty`,
    });
    return;
  }

  subClassModel
    .addSubClass(subClassName, idClass)
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
  getSubClass,
  addSubClass,
};
