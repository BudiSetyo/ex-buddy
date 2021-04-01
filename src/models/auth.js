const connect = require('../database/connection');

const register = (username, email, password) => {
  return new Promise((resolve, reject) => {
    const queryString = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;

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
    const queryString = `SELECT * FROM users WHERE username=?`;

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

const updatePasswordByEmail = (password, email, id) => {
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

module.exports = {
  register,
  getUserByUsername,
  getUserByEmail,
  updatePasswordByEmail,
};
