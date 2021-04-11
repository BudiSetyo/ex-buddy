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

module.exports = {
  getSubClass,
};
