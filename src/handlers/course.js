const mysql = require('mysql');
const courseModel = require('../models/course');
const { response } = require('../helpers/response');

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

      let url =
        protocol + '://' + hostname + ':' + process.env.PORT + baseUrl + path;

      let prev = null;
      let next = null;

      if (searchValue || category || level || pricing) {
        prev =
          pageNumber === 1
            ? null
            : (url +=
                `?search=${searchValue}&page=${pageNumber - 1}&limit=${
                  limitPage || 5
                }` ||
                `?category=${category}&page=${pageNumber - 1}&limit=${
                  limitPage || 5
                }` ||
                `?level=${level}&page=${pageNumber - 1}&limit=${
                  limitPage || 5
                }` ||
                `?pricing=${pricing}&page=${pageNumber - 1}&limit=${
                  limitPage || 5
                }`);

        next =
          pageNumber === totalPage
            ? null
            : (url +=
                `?search=${searchValue}&page=${pageNumber + 1}&limit=${
                  limitPage || 5
                }` ||
                `?category=${category}&page=${pageNumber + 1}&limit=${
                  limitPage || 5
                }` ||
                `?level=${level}&page=${pageNumber + 1}&limit=${
                  limitPage || 5
                }` ||
                `?pricing=${pricing}&page=${pageNumber + 1}&limit=${
                  limitPage || 5
                }`);
      } else {
        prev =
          pageNumber === 1
            ? null
            : url + `?page=${pageNumber - 1}&limit=${limitPage || 5}`;

        next =
          pageNumber === totalPage
            ? null
            : url + `?page=${pageNumber + 1}&limit=${limitPage || 5}`;
      }

      const info = {
        count,
        totalPage,
        page: pageNumber,
        next,
        prev,
        result,
      };

      return response(res, 200, 'Success', { info });
    })
    .catch((err) => {
      console.log(err);
      return response(res, 500, err);
    });
};

const postCourse = (req, res) => {
  const id = req.id;
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
      id,
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
      return response(res, 200, 'Success', { file: req.file, url });
    })
    .catch((err) => {
      console.log(err);
      return response(res, 500, err);
    });
};

const updateCourse = (req, res) => {
  const id = req.id;
  const { day, startTime, endTime, pricing } = req.body || '';

  courseModel
    .updateCourse(id, day, startTime, endTime, pricing)
    .then((result) => {
      return response(res, 200, 'Success');
    })
    .catch((err) => {
      console.log(err);
      return response(res, 500, err);
    });
};

const deleteCourse = (req, res) => {
  const id = req.id;

  courseModel
    .deleteCourse(id)
    .then((result) => {
      return response(res, 200, 'Success');
    })
    .catch((err) => {
      console.log(err);
      return response(res, 500, err);
    });
};

const registerCourse = async (req, res) => {
  const { id } = req.id;
  const { idClass } = req.query;

  const isRegister = (await courseModel.isRegisterCourse(id, idClass)) || [];

  if (isRegister.length > 0) {
    return response(res, 400, 'You have enrolled in this class');
  }

  courseModel
    .registerCourse(id, idClass)
    .then((result) => {
      return response(res, 200, 'Success');
    })
    .catch((err) => {
      console.log(err);
      return response(res, 500, err);
    });
};

const getCourseUser = (req, res) => {
  const { baseUrl, path, hostname, protocol } = req;
  const id = req.id;
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
    .getCourseUser(id, searchValue, sortBy, order, limit, page)
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

      return response(res, 200, 'Success', { info });
    })
    .catch((err) => {
      console.log(err);
      return response(res, 500, err);
    });
};

const getSubCourse = (req, res) => {
  const idUser = req.id;
  const idCourse = req.query.idCourse || '';

  courseModel
    .getSubCourse(idUser, idCourse)
    .then((result) => {
      return response(res, 200, 'Success', { result });
    })
    .catch((err) => {
      console.log(errr);
      return response(res, 500, err);
    });
};

const addSubCourse = (req, res) => {
  const { subCourseName, idCourse } = req.body || '';

  courseModel
    .addSubCourse(subCourseName, idCourse)
    .then((result) => {
      return response(res, 200, 'Success');
    })
    .catch((err) => {
      return response(res, 500, err);
    });
};

const addSubCourseScore = async (req, res) => {
  const id = req.id;
  const { idSubCourse, idCourse } = req.query;
  const { score } = req.body || '';

  const isSubCourseScored =
    (await courseModel.isSubCourseScored(idUser, idSubCourse, idCourse)) || [];

  if (isSubCourseScored.length > 0) {
    return response(res, 400, 'Score has been added');
  }

  courseModel
    .addSubCourseScore(id, idSubCourse, idCourse, score)
    .then((result) => {
      return response(res, 200, 'Success');
    })
    .catch((err) => {
      console.log(err);
      return response(res, 500, err);
    });
};

const updateSubCourseScore = async (req, res) => {
  const idUser = req.id;
  const { idSubCourse, idCourse } = req.query;
  const { score } = req.body;

  const isSubCourse =
    (await courseModel.isSubCourseScored(idUser, idSubCourse, idCourse)) || [];

  if (isSubCourse.length < 1) {
    return response(res, 400, 'Subcourse not found');
  }

  courseModel
    .updateSubCourseScore(score, idUser, idSubCourse, idCourse)
    .then((result) => {
      return response(res, 200, 'Success');
    })
    .catch((err) => {
      // console.log(err);s
      return response(res, 200, err);
    });
};

const getCourseFasilitator = (req, res) => {
  const { baseUrl, path, hostname, protocol } = req;
  const id = req.id;
  const { limit, page } = req.query;

  courseModel
    .getCourseFasilitator(id, limit, page)
    .then((finalResult) => {
      const { result, count, limitPage, pageNumber } = finalResult;
      const totalPage = Math.ceil(count / limitPage);

      let url =
        protocol + '://' + hostname + ':' + process.env.PORT + baseUrl + path;

      let prev = null;
      let next = null;

      prev =
        pageNumber === 1
          ? null
          : (url += `?page=${pageNumber - 1}&limit=${limit || 3}`);

      next =
        pageNumber === totalPage
          ? null
          : (url += `?page=${pageNumber + 1}&limit=${limit || 3}`);

      const info = {
        count,
        totalPage,
        page: pageNumber,
        next,
        prev,
        result,
      };

      return response(res, 200, 'Success', { info });
    })
    .catch((err) => {
      return response(res, 500, err);
    });
};

const getCourseById = (req, res) => {
  const id = req.id;

  courseModel
    .getCourseById(id)
    .then((result) => {
      return response(res, 200, 'Success', { result });
    })
    .catch((err) => {
      console.log(err);
      return response(res, 500, err);
    });
};

module.exports = {
  getAllCourse,
  postCourse,
  updateCourse,
  deleteCourse,
  registerCourse,
  getCourseUser,
  getSubCourse,
  addSubCourse,
  addSubCourseScore,
  updateSubCourseScore,
  getCourseFasilitator,
  getCourseById,
};
