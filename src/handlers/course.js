const mysql = require('mysql');
const courseModel = require('../models/course');

const getAllCourse = (req, res) => {
  const { baseUrl, path, hostname, protocol } = req;
  const { search, category, level, pricing, sort, limit, page } =
    req.query || '';

  const searchValue = `%${search || ''}%`;
  let sortValue = sort?.split('-') || null;
  let sortBy = null;
  let order = null;

  if (!sort) {
    sortValue = 'id-az';
  }

  if (sortValue) {
    switch (sortValue[0].toLowerCase()) {
      case 'id':
        sortBy = mysql.raw('c.id');
        break;
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
        break;
    }

    order =
      sortValue[1].toLowerCase() === 'az'
        ? mysql.raw('ASC')
        : mysql.raw('DESC');
  }

  courseModel
    .getAllCourse(
      searchValue,
      category,
      level,
      pricing,
      sortBy,
      order,
      limit,
      page
    )
    .then((finalResult) => {
      const { result, count, limitPage, pageNumber } = finalResult;
      const totalPage = Math.ceil(count / limitPage);
      const url =
        protocol + '://' + hostname + ':' + process.env.PORT + baseUrl + path;
      const prev =
        pageNumber === 1
          ? null
          : url + `?page=${pageNumber - 1}&limit=${limitPage || 5}`;

      const next =
        pageNumber === totalPage
          ? null
          : url + `?page=${pageNumber + 1}&limit=${limitPage || 5}`;

      const info = {
        count,
        totalPage,
        page: pageNumber,
        next,
        prev,
        result,
      };

      res.status(200).send({
        message: 'success',
        info,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
};

const postCourse = (req, res) => {
  const {
    className,
    description,
    day,
    startTime,
    endTime,
    category,
    level,
    pricing,
  } = req.body || '';

  const file = req.file || {};
  let url = '';

  if (file.filename) {
    url = `/images/${file.filename}`;
  }

  courseModel
    .postCourse(
      className,
      description,
      day,
      startTime,
      endTime,
      category,
      level,
      pricing,
      url
    )
    .then((result) => {
      res.status(200).send({
        message: 'success',
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

const updateCourse = (req, res) => {
  const id = req.params.id;
  const { day, startTime, endTime, pricing } = req.body || '';

  courseModel
    .updateCourse(id, day, startTime, endTime, pricing)
    .then((result) => {
      res.status(200).send({
        message: 'success',
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

const deleteCourse = (req, res) => {
  const id = req.params.id;

  courseModel
    .deleteCourse(id)
    .then((result) => {
      res.status(200).send({
        message: 'success',
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

const registerCourse = async (req, res) => {
  const { idUser, idClass } = req.query;

  const isRegister =
    (await courseModel.isRegisterCourse(idUser, idClass)) || [];

  if (isRegister.length > 0) {
    res.status(500).send({
      message: 'you have enrolled in this class',
    });
    return;
  }

  courseModel
    .registerCourse(idUser, idClass)
    .then((result) => {
      res.status(200).send({
        message: 'success',
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
};

const getCourseUser = (req, res) => {
  const { baseUrl, path, hostname, protocol } = req;
  const { id } = req.params.id;
  const { search, sort, limit, page } = req.query || '';

  const searchValue = `%${search || ''}%`;
  let sortValue = sort?.split('-') || null;
  let sortBy = null;
  let order = null;

  if (!sort) {
    sortValue = 'id-az';
  }

  if (sortValue) {
    switch (sortValue[0].toLowerCase()) {
      case 'id':
        sortBy = mysql.raw('c.id');
        break;
      case 'category':
        sortBy = mysql.raw('c.category');
        break;
      default:
        sortBy = null;
        break;
    }

    order =
      sortValue[1].toLowerCase() === 'az'
        ? mysql.raw('ASC')
        : mysql.raw('DESC');
  }

  courseModel
    .getCourseUser(searchValue, sortBy, order, limit, page)
    .then(() => {})
    .catch(() => {});
};

module.exports = {
  getAllCourse,
  postCourse,
  updateCourse,
  deleteCourse,
  registerCourse,
  getCourseUser,
};
