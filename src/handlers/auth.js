const authModel = require('../models/auth');

const { writeResponse, writeError } = require('../helpers/response');

const bcrypt = require('bcrypt');
const saltRounds = 10;
// const { get } = require('../routers/auth');

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

// const login = async (req, res) => {
//   const username = req.body.username || '';
//   const password = req.body.password || '';

//   // console.log({ username, password });

//   const usernameTaken = (await authModel.getUserByUsername(username)) || [];

//   if (usernameTaken.length < 1) {
//     res.status(500).send({
//       message: 'username does not exist',
//     });
//     return;
//   }

//   bcrypt.compare(password, usernameTaken[0].password, (err, passwordValid) => {
//     if (passwordValid) {
//       writeResponse(res, null, 200, usernameTaken[0]);
//     } else if (!passwordValid) {
//       res.status(500).send({
//         message: 'wrong password',
//       });
//     } else {
//       writeError(res, 500, err);
//     }
//   });
// };

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

const login = (req, res) => {
  authModel
    .login(req.body)
    .then((result) => {
      writeResponse(res, null, 200, { token: result });
    })
    .catch((err) => {
      writeError(res, err.status, err.msg);
    });
};

module.exports = {
  register,
  login,
  reset,
};
