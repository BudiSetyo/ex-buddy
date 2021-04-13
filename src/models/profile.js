const connect = require('../database/connection');

const updateProfile = (fullName, phoneNumber, url, id) => {
  return new Promise((resolve, reject) => {
    const queryString = `UPDATE users SET full_name=?, phone_number=?, profile_img=? WHERE id=?`;

    connect.query(
      queryString,
      [fullName, phoneNumber, url, id],
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
  updateProfile,
};
