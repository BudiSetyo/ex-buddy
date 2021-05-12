const connect = require('../database/connection');

const register = (username, email, password) => {
  return new Promise((resolve, reject) => {
    const queryString = `INSERT INTO users (user_name, email, password) VALUES (?, ?, ?)`;

    connect.query(queryString, [username, email, password], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

const getUserByUsername = (username) => {
  return new Promise((resolve, reject) => {
    const queryString = `SELECT * FROM users WHERE user_name=?`;

    connect.query(queryString, [username], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const queryString = `SELECT * FROM users WHERE email=?`;

    connect.query(queryString, [email], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const updatePasswordByEmail = (password, email) => {
  return new Promise((resolve, reject) => {
    const queryString = `UPDATE users SET password=? WHERE email=?`;

    connect.query(queryString, [password, email], (err, result) => {
      if (err) {
        // console.log(err);
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const updateOtp = (otp, expired, email) => {
  console.log('otp = ' + otp);
  return new Promise((resolve, reject) => {
    const queryString =
      'UPDATE users SET otp = ?, otp_expired = ? WHERE email = ?';

    connect.query(queryString, [otp, expired, email], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};

const checkOtp = (otp, email) => {
  return new Promise((resolve, reject) => {
    const queryString =
      'SELECT otp_expired FROM users WHERE otp = ? AND  email = ?';

    connect.query(queryString, [otp, email], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const newPassword = (otp, email, password) => {
  return new Promise((resolve, reject) => {
    const queryString =
      'UPDATE users SET password = ?, otp = null WHERE email = ? AND otp = ?';

    connect.query(queryString, [password, email, otp], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = {
  register,
  getUserByUsername,
  getUserByEmail,
  updatePasswordByEmail,
  updateOtp,
  checkOtp,
  newPassword,
};
