const subClassModel = require('../models/subClass');
const { writeResponse, writeError } = require('../helpers/response');

const getSubClass = async (req, res) => {
  const { id } = req.params;
  const { course } = req.query;
};

module.exports = {
  getSubClass,
};
