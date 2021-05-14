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
    res.status(400).send({
      message: 'Username already taken',
    });
    return;
  }

  const emailTaken = (await authModel.getUserByEmail(email)) || [];

  if (emailTaken.length > 0) {
    res.status(400).send({
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
  const user = req.body.user || '';
  const password = req.body.password || '';

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const loginWith = validateEmail(user);

  if (loginWith === true) {
    const emailTaken = (await authModel.getUserByEmail(user)) || [];

    if (emailTaken.length < 1) {
      return writeResponse(res, null, 404, 'User not found');
    }

    authModel
      .getUserByEmail(user)
      .then((result) => {
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
            const payload = { id, username: user_name, role };
            const options = {
              expiresIn: process.env.EXPIRE,
              issuer: process.env.ISSUER,
            };
            jwt.sign(payload, process.env.SECRET_KEY, options, (err, token) => {
              if (err) return res.status(500).send(err);

              res.status(200).send({
                message: 'success',
                user: payload,
                token,
              });
            });
          }
        });
      })
      .catch((err) => {
        return writeError(res, 500, err);
      });
  }

  if (loginWith === false) {
    const userTaken = (await authModel.getUserByUsername(user)) || [];

    if (userTaken.length < 1) {
      return writeResponse(res, null, 404, 'User not found');
    }

    authModel
      .getUserByUsername(user)
      .then((result) => {
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
            const payload = { id, username: user_name, role };
            const options = {
              expiresIn: process.env.EXPIRE,
              issuer: process.env.ISSUER,
            };
            jwt.sign(payload, process.env.SECRET_KEY, options, (err, token) => {
              if (err) return res.status(500).send(err);

              res.status(200).send({
                message: 'success',
                user: payload,
                token,
              });
            });
          }
        });
      })
      .catch((err) => {
        console.log(err);
        return writeError(res, 500, err);
      });
  }
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

const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const emailTaken = (await authModel.getUserByEmail(email)) || [];
    // console.log(emailTaken);

    if (emailTaken.length < 1) {
      return res.status(404).send('User does not exist');
    }

    const otp = Math.floor(Math.random() * 9000) + 1000;
    const expired = new Date().getTime() + 60 * 60 * 1000;

    await authModel.updateOtp(otp, expired, email);

    return res.status(200).send({
      message: 'Otp already sended',
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

const otpVerif = async (req, res) => {
  try {
    const { otp, email } = req.body;

    if (otp.length < 4) {
      res.status(402).send({
        message: 'Invalid otp',
      });
    }

    const expired = await authModel.checkOtp(otp, email);
    // console.log(expired[0]);

    if (expired) {
      if (new Date(expired[0].otp_expired) < new Date()) {
        return writeResponse(res, null, 410, 'Otp code is expired');
      }

      return writeResponse(res, null, 200, 'Please input your new password');
    }
  } catch (err) {
    // console.log(err);
    return writeError(res, 500, err);
  }
};

const newPassword = async (req, res) => {
  try {
    const { otp, email, password } = req.body;

    const hashPassword = await bcrypt.hash(password, saltRounds);
    console.log(hashPassword);
    const update = await authModel.newPassword(otp, email, hashPassword);

    if (!update) {
      return writeResponse(res, null, 400, 'Failed to change password');
    }

    return writeResponse(res, null, 200, 'Password changed successfully');
  } catch (err) {
    console.log(err);
    return writeError(res, 500, err);
  }
};

module.exports = {
  register,
  login,
  logout,
  sendOtp,
  otpVerif,
  newPassword,
};
