const connect = require('../database/connection');

const getAllClass = (searchValue, category, level, pricingSort) => {
  let queryString = `SELECT id_class, class_name, description, category_name, level_name, pricing FROM class INNER JOIN categories ON class.category = categories.id INNER JOIN levels ON class.level = levels.id WHERE class_name LIKE ?`;

  let paramData = [searchValue];

  if (category) {
    queryString += ` AND category=? `;
    paramData = [...paramData, category];
  }

  if (level) {
    queryString += ` AND level=?`;
    paramData = [...paramData, level];
  }

  if (pricingSort) {
    queryString += ` ORDER BY pricing ?`;
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
  const queryString = `SELECT * FROM class WHERE id_class=?`;

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
  let queryString = `SELECT * FROM my_class INNER JOIN class ON my_class.id_class = class.id_class INNER JOIN levels ON class.level = levels.id INNER JOIN categories ON class.category = categories.id WHERE id_user=? AND class_name LIKE ?`;

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

module.exports = {
  getAllClass,
  getClassById,
  postCLass,
  getClassUser,
};
