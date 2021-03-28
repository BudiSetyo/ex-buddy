const authModel = require('../models/auth');

const { writeResponse, writeError } = require('../helpers/response');

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

const login = async (req, res) => {
  const username = req.body.username || '';
  const password = req.body.password || '';

  console.log({ username, password });

  const usernameTaken = (await authModel.getUserByUsername(username)) || [];

  if (usernameTaken.length < 1) {
    res.status(500).send({
      message: 'username does not exist',
    });
    return;
  }

  const hash = usernameTaken[0].password;

  bcrypt.compare(password, hash, (err, result) => {
    if (result) {
      writeResponse(res, null, 200, usernameTaken[0]);
    } else if (hash !== password) {
      res.status(500).send({
        message: 'wrong password',
      });
    } else {
      writeError(res, 500, err);
    }
  });
};

module.exports = {
  register,
  login,
};