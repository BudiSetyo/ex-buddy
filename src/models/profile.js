const connect = require('../database/connection');

const updateProfile = (valueUpdate, id) => {
  return new Promise((resolve, reject) => {
    const queryString = `UPDATE users SET ? WHERE id=?`;

    connect.query(queryString, [valueUpdate, id], (err, result) => {
      console.log(queryString);
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const getProfile = (id) => {
  return new Promise((resolve, reject) => {
    const queryString =
      'SELECT email, user_name AS username, phone_number AS phone, gender, role, profile_img AS image FROM users WHERE id = ?';

    connect.query(queryString, [id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const updatePassword = (password, id) => {
  return new Promise((resolve, reject) => {
    const queryString = 'UPDATE users SET password = ? WHERE id = ?';

    connect.query(queryString, [password, id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = {
  updateProfile,
  getProfile,
  updatePassword,
};
