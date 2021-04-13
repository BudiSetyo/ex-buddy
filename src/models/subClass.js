const connect = require('../database/connection');

const getSubClass = (id, course) => {
  return new Promise((resolve, reject) => {
    const queryString = `SELECT sub_class_name AS SubClass, score AS Score, day AS Day, start_time AS StartTime, end_time AS EndTime FROM users_progress JOIN sub_class ON users_progress.id_sub_class = sub_class.id JOIN class ON users_progress.id_class = class.id JOIN my_class ON users_progress.id_user_class = my_class.id WHERE my_class.id_user=? AND my_class.id_class=?`;

    connect.query(queryString, [id, course], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

const addSubClass = (subClassName, idClass) => {
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

const isSubClassScored = (idUserClass, idSubClass, idClass) => {
  return new Promise((resolve, reject) => {
    const queryString = `SELECT score FROM users_progress WHERE id_user_class = ? AND id_sub_class = ? AND id_class = ?`;

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

const addSubClassScore = (idUserClass, idSubClass, idClass, score) => {
  return new Promise((resolve, reject) => {
    const queryString = `INSERT INTO users_progress(id_user_class, id_sub_class, id_class, score) VALUES (?, ?, ?, ?)`;

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

const updateSubClassScore = (idUserClass, idSubClass, idClass, score) => {
  return new Promise((resolve, reject) => {
    const queryString = `UPDATE users_progress SET score = ? WHERE id_user_class = ? AND id_sub_class = ? AND id_class = ?`;

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
  getSubClass,
  addSubClass,
  isSubClassScored,
  addSubClassScore,
  updateSubClassScore,
};
