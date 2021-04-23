const connect = require('../database/connection');

const getAllSchedule = (day) => {
  return new Promise((resolve, reject) => {
    const queryString = `SELECT c.day, c.start_time, c.class_name, (c.end_time - c.start_time) AS duration FROM class c WHERE c.day=?`;

    connect.query(queryString, day, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const getScheduleUser = (id, day) => {
  return new Promise((resolve, reject) => {
    const queryString = `SELECT c.day, c.start_time, c.class_name, (c.end_time - c.start_time) AS duration FROM class c LEFT JOIN my_class mc ON c.id = mc.id_class WHERE mc.id_user=? AND c.day=?`;

    connect.query(queryString, [id, day], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = {
  getAllSchedule,
  getScheduleUser,
};
