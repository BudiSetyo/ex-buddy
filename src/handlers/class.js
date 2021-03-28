const mysql = require('mysql');
const allClassModel = require('../models/class');

const { writeResponse, writeError } = require('../helpers/response');

const getAllClass = async (req, res) => {
  const { search, category, levels, pricing } = req.query;
  const searchValue = `%${search || ''}%`;
  const pricingSort = pricing ? mysql.raw(pricing) : '';

  allClassModel
    .getAllClass(searchValue, category, levels, pricingSort)
    .then((result) => {
      res.status(200).send({
        message: 'success',
        result,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: 'error',
        err,
      });
    });
};

const getCLassById = async (req, res) => {
  const id = req.params.id;

  allClassModel
    .getClassById(id)
    .then((result) => {
      writeResponse(res, null, 200, result);
    })
    .catch((err) => {
      writeError(res, 500, err);
    });
};

const postCLass = async (req, res) => {
  const {
    classname,
    categories,
    description,
    day,
    starttime,
    endtime,
    level,
    price,
  } = req.body;

  if (
    !classname ||
    !description ||
    !day ||
    !starttime ||
    !endtime ||
    !categories ||
    !level ||
    !price
  ) {
    res.status(500).send({
      message: `some fields cannot be empty`,
    });
    return;
  }

  allClassModel
    .postCLass(
      classname,
      description,
      day,
      starttime,
      endtime,
      categories,
      level,
      price
    )
    .then(() => {
      res.status(200).send({
        message: 'success',
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: 'error',
        err,
      });
    });
};

module.exports = {
  getAllClass,
  getCLassById,
  postCLass,
};
