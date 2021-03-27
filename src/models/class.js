const connect = require('../database/connection');

const getAllClass = (searchValue, category, level, pricingSort) => {
  let queryString = `SELECT * FROM class INNER JOIN categories ON class.category = categories.id INNER JOIN levels ON class.level = levels.id WHERE classname LIKE ?`;

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

  console.log(paramData);

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
    const queryString = `INSERT INTO class (classname, description, day, starttime, endtime, category, level, pricing) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

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

module.exports = {
  getAllClass,
  postCLass,
};
