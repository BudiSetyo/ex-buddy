const authModel = require('../models/auth');
const client = require('../database/redis');

const { writeResponse, writeError } = require('../helpers/response');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const register = async (req, res) => {
  const username = req.body.username || '';
  const email = req.body.email || '';
  const password = req.body.password || '';

  if (!username || !email || !password) {
    res.status(500).send({
      message: `some fields cannot be empty`,
    });
    return;
  }

  const usernameTaken = (await authModel.getUserByUsername(username)) || [];

  if (usernameTaken.length > 0) {
    res.status(500).send({
      message: 'Username already taken',
    });
    return;
  }

  const emailTaken = (await authModel.getUserByEmail(email)) || [];

  if (emailTaken.length > 0) {
    res.status(500).send({
      message: 'Email already taken',
    });
    return;
  }

  bcrypt.hash(password, saltRounds, (err, hash) => {
    authModel
      .register(username, email, hash)
      .then(() => {
        res.status(200).send({
          message: 'success',
        });
      })
      .catch((err) => {
        writeError(res, 500, err);
      });
  });
};

const reset = async (req, res) => {
  const password = req.body.password || '';
  const email = req.body.email || '';

  if (!email || !password) {
    res.status(500).send({
      message: `some fields cannot be empty`,
    });
    return;
  }

  const emailAvail = (await authModel.getUserByEmail(email)) || [];

  if (emailAvail.length < 1) {
    res.status(500).send({
      message: 'Email not found',
    });
    return;
  }

  bcrypt.hash(password, saltRounds, (err, hash) => {
    authModel
      .updatePasswordByEmail(hash, email)
      .then((result) => {
        res.status(200).send({
          message: 'success',
          result,
        });
      })
      .catch((err) => {
        writeError(res, 500, err);
      });
  });
};

const login = async (req, res) => {
  const username = req.body.username || '';
  const password = req.body.password || '';

  const usernameTaken = (await authModel.getUserByUsername(username)) || [];

  if (usernameTaken.length < 1) {
    res.status(500).send({
      message: 'username does not exist',
    });
    return;
  }

  authModel
    .login(username, password)
    .then((result) => {
      // console.log(result);
      bcrypt.compare(password, result[0].password, (err, passwordValid) => {
        if (err)
          return res.status(500).send({
            message: err,
          });

        if (!passwordValid) {
          res.status(500).send({
            message: 'wrong password',
          });
        }

        if (passwordValid) {
          const { id, user_name, role } = result[0];
          const payload = { id, user_name, role };
          const options = {
            expiresIn: process.env.EXPIRE,
            issuer: process.env.ISSUER,
          };
          jwt.sign(payload, process.env.SECRET_KEY, options, (err, token) => {
            if (err) return res.status(500).send(err);

            res.status(200).send({
              message: 'success',
              username: user_name,
              role,
              token,
            });
          });
        }
      });
    })
    .catch((err) => {
      writeError(res, 500, err);
    });
};

const logout = (req, res) => {
  const { userId, token } = req;

  client.get(userId, (err, data) => {
    if (err) {
      res.status(500).send(err);
    }

    if (data) {
      const parseData = JSON.parse(data);
      parseData[userId].push(token);
      client.setex(userId, 3600, JSON.stringify(parseData));
      return res.status(200).send({
        message: 'logout success',
      });
    }

    const blacklistData = {
      [userId]: [token],
    };

    client.setex(userId, 3600, JSON.stringify(blacklistData));
    return res.status(200).send({
      message: 'logout success',
    });
  });
};

module.exports = {
  register,
  login,
  reset,
  logout,
};
