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
      `SELECT c.id, c.class_name AS className, c.description, ca.category_name AS category, l.level_name AS level, c.pricing FROM class c LEFT JOIN categories ca ON c.category = ca.id LEFT JOIN levels l ON c.level = l.id WHERE c.class_name LIKE ?`,
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
  className,
  description,
  day,
  startTime,
  endTime,
  category,
  level,
  pricing,
  url
) => {
  return new Promise((resolve, reject) => {
    const queryString = `INSERT INTO class (class_name, description, day, start_time, end_time, category, level, pricing, class_img) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    connect.query(
      queryString,
      [
        className,
        description,
        day,
        startTime,
        endTime,
        category,
        level,
        pricing,
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

const updateCourse = (id, day, startTime, endTime, pricing) => {
  return new Promise((resolve, reject) => {
    const queryString = `UPDATE class c SET day = ?, start_time = ?, end_time = ?, pricing = ? WHERE c.id = ?`;

    connect.query(
      queryString,
      [day, startTime, endTime, pricing, id],
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

const deleteCourse = (id) => {
  return new Promise((resolve, reject) => {
    const queryString = `DELETE FROM class WHERE id = ?`;

    connect.query(queryString, id, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const registerCourse = (idUser, idClass) => {
  return new Promise((resolve, reject) => {
    const queryString = `INSERT INTO my_class (id_user, id_class) VALUES (?, ?)`;

    connect.query(queryString, [idUser, idClass], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const isRegisterCourse = (idUser, idClass) => {
  return new Promise((resolve, reject) => {
    const queryString = `SELECT * FROM my_class mc WHERE mc.id_user = ? AND mc.id_class = ?`;

    connect.query(queryString, [idUser, idClass], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const getCourseUser = (id, searchValue, sortBy, order, limit, page) => {
  return new Promise((resolve, reject) => {
    let queryString = [
      `SELECT c.id, c.class_name AS className, ca.category_name AS category, c.description FROM my_class mc INNER JOIN class c ON mc.id_class = c.id INNER JOIN categories ca ON c.category = ca.id WHERE mc.id_user = ? AND c.class_name like ?`,
    ];

    let paramData = [id, searchValue];

    if (sortBy && order) {
      queryString.push(`ORDER BY ? ?`);
      paramData.push(sortBy, order);
    }

    const limitPage = Number(limit) || 3;
    const pageNumber = Number(page) || 1;
    const offset = (pageNumber - 1) * limitPage;

    queryString.push('LIMIT ? OFFSET ?');
    paramData.push(limitPage, offset);

    connect.query(queryString.join(' '), paramData, (err, result) => {
      // console.log(paramData);
      // console.log(queryString.join(' '));
      // console.log(err);
      if (err) return reject(err);

      let qsCount = [
        `SELECT COUNT(*) as count FROM my_class mc INNER JOIN class c ON mc.id_class = c.id INNER JOIN categories ca ON c.category = ca.id WHERE mc.id_user = ? AND c.class_name like ?`,
      ];

      if (sortBy && order) {
        qsCount.push(`ORDER BY ? ?`);
      }

      connect.query(qsCount.join(' '), paramData, (err, data) => {
        console.log(err);
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

const getSubCourse = (idUser, idCourse) => {
  return new Promise((resolve, reject) => {
    const queryString = `SELECT sub_class_name AS 'sub class', score, day, start_time AS 'start time', end_time AS 'end time' FROM users_progress up LEFT JOIN sub_class sc ON up.id_sub_class = sc.id LEFT JOIN class c ON up.id_class = c.id LEFT JOIN users u ON up.id_user = u.id WHERE u.id=? AND c.id=?`;

    connect.query(queryString, [idUser, idCourse], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const addSubCourse = (subCourseName, idCourse) => {
  return new Promise((resolve, reject) => {
    const queryString = `INSERT INTO sub_class (sub_class_name, id_class) VALUES (?, ?)`;

    connect.query(queryString, [subCourseName, idCourse], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const isSubCourseScored = (idUser, idSubCourse, idCourse) => {
  return new Promise((resolve, reject) => {
    const queryString = `SELECT score FROM users_progress WHERE id_user=? AND id_sub_class=? AND id_class=?`;

    connect.query(
      queryString,
      [idUser, idSubCourse, idCourse],
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

const addSubCourseScore = (idUser, idSubCourse, idCourse, score) => {
  return new Promise((resolve, reject) => {
    const queryString = `INSERT INTO users_progress(id_user, id_sub_class, id_class, score) VALUES (?, ?, ?, ?)`;

    connect.query(
      queryString,
      [idUser, idSubCourse, idCourse, score],
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

const updateSubCourseScore = (score, idUser, idSubCourse, idCourse) => {
  return new Promise((resolve, reject) => {
    const queryString = `UPDATE users_progress SET score=? WHERE id_user=? AND id_sub_class=? AND id_class=?`;

    connect.query(
      queryString,
      [score, idUser, idSubCourse, idCourse],
      (err, result) => {
        if (err) {
          console.log(err);
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
  updateCourse,
  deleteCourse,
  registerCourse,
  isRegisterCourse,
  getCourseUser,
  getSubCourse,
  addSubCourse,
  isSubCourseScored,
  addSubCourseScore,
  updateSubCourseScore,
};
