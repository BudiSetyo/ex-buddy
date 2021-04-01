const connect = require('../database/connection');

const updateProfile = (fullName, phoneNumber, id) => {
  return new Promise((resolve, reject) => {
    const queryString = `UPDATE users SET fullname=?, phone_number=? WHERE id=?`;

    connect.query(queryString, [fullName, phoneNumber, id], (err, result) => {
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
};
