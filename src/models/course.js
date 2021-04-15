const connect = require('../database/connection');

const getAllCourse = (
  searchValue,
  category,
  level,
  pricing,
  sortBy,
  order,
  limit,
  page
) => {
  return new Promise((resolve, reject) => {
    let queryString = [
      `SELECT c.id, c.class_name, c.description, ca.category_name, l.level_name, c.pricing FROM class c LEFT JOIN categories ca ON c.category = ca.id LEFT JOIN levels l ON c.level = l.id WHERE c.class_name LIKE ?`,
    ];

    let paramData = [searchValue];

    if (category) {
      queryString.push(`AND ca.category_name = ?`);
      paramData.push(category);
    }

    if (level) {
      queryString.push(`AND l.level_name = ?`);
      paramData.push(level);
    }

    if (pricing) {
      queryString.push(`AND c.pricing = ?`);
      paramData.push(pricing);
    }

    if (sortBy && order) {
      queryString.push(`ORDER BY ? ?`);
      paramData.push(sortBy, order);
    }

    const limitPage = Number(limit) || 5;
    const pageNumber = Number(page) || 1;
    const offset = (pageNumber - 1) * limitPage;

    queryString.push('LIMIT ? OFFSET ?');
    paramData.push(limitPage, offset);

    connect.query(queryString.join(' '), paramData, (err, result) => {
      if (err) return reject(err);

      let qsCount = [
        `SELECT COUNT(*) AS "count" FROM class c LEFT JOIN categories ca ON c.category = ca.id LEFT JOIN levels l ON c.level = l.id WHERE c.class_name LIKE ?`,
      ];

      if (category) {
        qsCount.push(`AND ca.category_name = ?`);
      }

      if (level) {
        qsCount.push(`AND l.level_name = ?`);
      }

      if (pricing) {
        qsCount.push(`AND c.pricing = ?`);
      }

      if (sortBy && order) {
        qsCount.push(`ORDER BY ? ?`);
      }

      connect.query(qsCount.join(' '), paramData, (err, data) => {
        if (err) return reject(err);

        const { count } = data[0];
        let finalResult = {
          result,
          count,
          limitPage,
          pageNumber,
        };
        resolve(finalResult);
      });
    });
  });
};

const getCountCourse = () => {
  return new Promise((resolve, reject) => {
    const queryString = `SELECT COUNT(id) AS "count" FROM class`;

    connect.query(queryString, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const getCourseById = (id) => {
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

const postCourse = (
  classname,
  description,
  day,
  starttime,
  endtime,
  categories,
  level,
  price,
  url
) => {
  return new Promise((resolve, reject) => {
    const queryString = `INSERT INTO class (class_name, description, day, start_time, end_time, category, level, pricing, class_img) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

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
        url,
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

const getCourseUser = (idUser, searchValue) => {
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

const getSubCourse = (id, course) => {
  return new Promise((resolve, reject) => {
    const queryString = `SELECT sub_class_name AS SubClass, score AS Score, day AS Day, start_time AS StartTime, end_time AS EndTime FROM users_progress LEFT JOIN sub_class ON users_progress.id_sub_class = sub_class.id LEFT JOIN class ON users_progress.id_class = class.id LEFT JOIN users ON users_progress.id_user = users.id WHERE users_progress.id_user=? AND users_progress.id_class=?`;

    connect.query(queryString, [id, course], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

const addSubCourse = (subClassName, idClass) => {
  return new Promise((resolve, reject) => {
    const queryString = `INSERT INTO sub_class (sub_class_name, id_class) VALUES (?, ?)`;

    connect.query(queryString, [subClassName, idClass], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const isSubCourseScored = (idUserClass, idSubClass, idClass) => {
  return new Promise((resolve, reject) => {
    const queryString = `SELECT score FROM users_progress WHERE id_user=? AND id_sub_class=? AND id_class=?`;

    connect.query(
      queryString,
      [idUserClass, idSubClass, idClass],
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

const addSubCourseScore = (idUserClass, idSubClass, idClass, score) => {
  return new Promise((resolve, reject) => {
    const queryString = `INSERT INTO users_progress(id_user, id_sub_class, id_class, score) VALUES (?, ?, ?, ?)`;

    connect.query(
      queryString,
      [idUserClass, idSubClass, idClass, score],
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

const updateSubCourseScore = (idUserClass, idSubClass, idClass, score) => {
  return new Promise((resolve, reject) => {
    const queryString = `UPDATE users_progress SET score=? WHERE id_user=? AND id_sub_class=? AND id_class=?`;

    connect.query(
      queryString,
      [score, idUserClass, idSubClass, idClass],
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
  getAllCourse,
  getCourseById,
  postCourse,
  getCourseUser,
  getCountCourse,
  getSubCourse,
  addSubCourse,
  isSubCourseScored,
  addSubCourseScore,
  updateSubCourseScore,
};
