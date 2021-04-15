const mysql = require('mysql');
const courseModel = require('../models/course');

const getAllCourse = (req, res) => {
  const { baseUrl, path, hostname, protocol } = req;
  const { search, category, level, pricing, sort, limit, page } =
    req.query || '';

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

module.exports = {
  getAllCourse,
};
