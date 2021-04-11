const connect = require('../database/connection');

const getAllClass = (searchValue, category, level, pricingSort) => {
  let queryString = `SELECT c.id, c.class_name, c.description, ca.category_name, l.level_name, c.pricing FROM class c INNER JOIN categories ca ON c.category = ca.id INNER JOIN levels l ON c.level = l.id WHERE c.class_name LIKE ?`;

  let paramData = [searchValue];

  if (category) {
    queryString += ` AND c.category=? `;
    paramData = [...paramData, category];
  }

  if (level) {
    queryString += ` AND c.level=? `;
    paramData = [...paramData, level];
  }

  if (pricingSort) {
    queryString += ` ORDER BY c.pricing ?`;
    paramData = [...paramData, pricingSort];
  }

  return new Promise((resolve, reject) => {
    connect.query(queryString, paramData, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const getClassById = (id) => {
  const queryString = `SELECT * FROM class WHERE id=?`;

  return new Promise((resolve, reject) => {
    connect.query(queryString, [id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const postCLass = (
  classname,
  description,
  day,
  starttime,
  endtime,
  categories,
  level,
  price
) => {
  return new Promise((resolve, reject) => {
    const queryString = `INSERT INTO class (class_name, description, day, start_time, end_time, category, level, pricing) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    connect.query(
      queryString,
      [
        classname,
        description,
        day,
        starttime,
        endtime,
        categories,
        level,
        price,
      ],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

const getClassUser = (idUser, searchValue) => {
  let queryString = `SELECT * FROM my_class INNER JOIN class ON my_class.id_class = class.id INNER JOIN levels ON class.level = levels.id INNER JOIN categories ON class.category = categories.id WHERE id_user=? AND class_name LIKE ?`;

  let paramData = [idUser, searchValue];

  return new Promise((resolve, reject) => {
    connect.query(queryString, paramData, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const getAllClassWithPagination = () => {
  return new Promise((resolve, reject) => {
    const queryString = `SELECT c.id, c.class_name, ca.category_name, c.description, l.level_name, c.pricing FROM class c JOIN categories ca ON c.category = ca.id JOIN levels l ON c.level = l.id`;
    const paginate = `LIMIT ? OFFSET ?`;
    const queryStringPaginate = queryString.concat(' ', paginate);

    const limit = 5;
    const page = 1;
    const offset = (page - 1) * limit;

    connect.query(queryStringPaginate, [limit, offset], (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
      }

      const qsCount = `SELECT COUNT(*) AS count FROM class`;

      connect.query(qsCount, (err, data) => {
        if (err) return reject(err);

        const { count } = data;

        let finalResult = {
          result,
          count,
          page,
          limit,
        };
        resolve(finalResult);
      });
    });
  });
};

module.exports = {
  getAllClass,
  getClassById,
  postCLass,
  getClassUser,
  getAllClassWithPagination,
};
