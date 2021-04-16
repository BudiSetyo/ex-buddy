const mysql = require('mysql');
const allClassModel = require('../models/class');

const { writeResponse, writeError } = require('../helpers/response');

const getAllClass = async (req, res) => {
  const { baseUrl, path, hostname, protocol } = req;
  const { search, sort, limit, page } = req.query;
  const searchValue = `%${search || ''}%`;
  const sortValue = sort?.split('-') || null;
  let sortBy = null;
  let order = null;

  if (sortValue) {
    switch (sortValue[0].toLowerCase()) {
      case 'category':
        sortBy = mysql.raw('c.category');
        break;
      case 'level':
        sortBy = mysql.raw('c.level');
        break;
      case 'pricing':
        sortBy = mysql.raw('c.pricing');
        break;
      default:
        sortBy = null;
    }

    order =
      sortValue[1].toLowerCase() === 'az'
        ? mysql.raw('ASC')
        : mysql.raw('DESC');
  }

  const limitPage = Number(limit) || 5;
  const pageNumber = Number(page) || 1;
  const offset = (pageNumber - 1) * limitPage;

  const count = (await allClassModel.getCountClass()) || [];

  const url =
    protocol + '://' + hostname + ':' + process.env.PORT + baseUrl + path;

  allClassModel
    .getAllClass(searchValue, sortBy, order, limitPage, offset)
    .then((result) => {
      const countTotal = count[0].count;
      const totalPage = Math.ceil(countTotal / limitPage);
      const prev =
        pageNumber === 1
          ? null
          : url + `?page=${pageNumber - 1}&limit=${limitPage || 5}`;

      const next =
        pageNumber === totalPage
          ? null
          : url + `?page=${pageNumber + 1}&limit=${limitPage || 5}`;
      res.status(200).send({
        message: 'success',
        count: countTotal,
        totalPage: totalPage,
        prev: prev,
        next: next,
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

  const file = req.file || {};
  let url = '';

  if (file.filename) {
    url = `/images/${file.filename}`;
  }

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
      price,
      url
    )
    .then((result) => {
      res.status(200).send({
        message: 'success',
        result,
        file: req.file,
        url,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: 'error',
        err,
      });
    });
};

const getUserClass = async (req, res) => {
  const { search } = req.query;
  const searchValue = `%${search || ''}%`;
  const idUser = req.params.idUser;

  allClassModel
    .getClassUser(idUser, searchValue)
    .then((result) => {
      writeResponse(res, null, 200, result);
    })
    .catch((err) => {
      console.log(err);
      writeError(res, 500, err);
    });
};

module.exports = {
  getAllClass,
  getCLassById,
  postCLass,
  getUserClass,
};
