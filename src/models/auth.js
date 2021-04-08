const connect = require('../database/connection');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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

const login = (body) => {
  return new Promise((resolve, reject) => {
    const { username, password } = body;
    const queryString = `SELECT * FROM users WHERE user_name=?`;

    connect.query(queryString, username, (err, result) => {
      // console.log(result);
      if (err) {
        // console.log(err);
        reject({ msg: err, status: 500 });
      }
      if (result.length === 0)
        return reject({ msg: 'Email or Password is Wrong', status: 500 });

      bcrypt.compare(password, result[0].password, (err, isPasswordValid) => {
        if (err) {
          // console.log(err);
          reject({ msg: err, status: 500 });
        }
        if (!isPasswordValid)
          return reject({ msg: 'Email or Password is Wrong', status: 401 });

        const { user_name, role } = result[0];
        const payload = { user_name, role };

        const options = {
          expiresIn: process.env.EXPIRE,
          issuer: process.env.ISSUER,
        };
        jwt.sign(payload, process.env.SECRET_KEY, options, (err, token) => {
          // console.log(err);
          if (err) return reject({ msg: err, status: 500 });
          resolve(token);
          console.log(token);
        });
      });
    });
  });
};

module.exports = {
  register,
  getUserByUsername,
  getUserByEmail,
  updatePasswordByEmail,
  login,
};
