const authModel = require('../models/auth');
const client = require('../database/redis');

const { response } = require('../helpers/response');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const validateUser = (user) => {
  if (user.length > 4) {
    return true;
  }
  return false;
};

const validatePassword = (password) => {
  if (password.length > 7) {
    return true;
  }
  return false;
};

const register = async (req, res) => {
  const username = req.body.username || '';
  const email = req.body.email || '';
  const password = req.body.password || '';

  if (!validateUser(username)) {
    return response(
      res,
      400,
      'Username must be more than four characters',
      null
    );
  }

  if (!validateEmail(email)) {
    return response(res, 400, 'Email is not valid', null);
  }

  if (!validatePassword(password)) {
    return response(
      res,
      400,
      'Password must be more than eight characters',
      null
    );
  }

  if (!username || !email || !password) {
    return response(res, 400, 'Some fields cannot be empty', null);
  }

  const usernameTaken = (await authModel.getUserByUsername(username)) || [];

  if (usernameTaken.length > 0) {
    return response(res, 400, 'Username already taken', null);
  }

  const emailTaken = (await authModel.getUserByEmail(email)) || [];

  if (emailTaken.length > 0) {
    return response(res, 400, 'Email already taken', null);
  }

  bcrypt.hash(password, saltRounds, (err, hash) => {
    authModel
      .register(username, email, hash)
      .then(() => {
        return response(res, 200, 'Login success', null);
      })
      .catch((err) => {
        return response(res, 500, err, null);
      });
  });
};

const login = async (req, res) => {
  const user = req.body.user || '';
  const password = req.body.password || '';

  if (!validateUser(user)) {
    return response(
      res,
      400,
      'Username or email must be more than four characters',
      null
    );
  }

  if (!validatePassword(password)) {
    return response(
      res,
      400,
      'Password must be more than eight characters',
      null
    );
  }

  const loginWith = validateEmail(user);

  if (loginWith === true) {
    const emailTaken = (await authModel.getUserByEmail(user)) || [];

    if (emailTaken.length < 1) {
      return response(res, 404, 'User not Found', null);
    }

    authModel
      .getUserByEmail(user)
      .then((result) => {
        bcrypt.compare(password, result[0].password, (err, passwordValid) => {
          if (err) return response(res, 500, err, null);

          if (!passwordValid) {
            return response(res, 500, 'Wrong password', null);
          }

          if (passwordValid) {
            const { id, user_name, role, profile_img } = result[0];
            const payload = {
              id,
              username: user_name,
              role,
              image: profile_img,
            };
            const options = {
              expiresIn: process.env.EXPIRE,
              issuer: process.env.ISSUER,
            };
            jwt.sign(payload, process.env.SECRET_KEY, options, (err, token) => {
              if (err) return response(res, 500, err, null);

              return response(res, 200, 'Login success', {
                data: payload,
                token,
              });
            });
          }
        });
      })
      .catch((err) => {
        console.log(err);
        return response(res, 500, err, null);
      });
  }

  if (loginWith === false) {
    const userTaken = (await authModel.getUserByUsername(user)) || [];

    if (userTaken.length < 1) {
      return response(res, 404, 'User not Found', null);
    }

    authModel
      .getUserByUsername(user)
      .then((result) => {
        bcrypt.compare(password, result[0].password, (err, passwordValid) => {
          if (err) return response(res, 500, err, null);

          if (!passwordValid) {
            return response(res, 500, 'Wrong password', null);
          }

          if (passwordValid) {
            const { id, user_name, role, profile_img } = result[0];
            const payload = {
              id,
              username: user_name,
              role,
              image: profile_img,
            };
            const options = {
              expiresIn: process.env.EXPIRE,
              issuer: process.env.ISSUER,
            };
            jwt.sign(payload, process.env.SECRET_KEY, options, (err, token) => {
              if (err) {
                console.log(err);
                return response(res, 500, err, null);
              }

              return response(res, 200, 'Login success', {
                data: payload,
                token,
              });
            });
          }
        });
      })
      .catch((err) => {
        console.log(err);
        return response(res, 500, err, null);
      });
  }
};

const logout = (req, res) => {
  const { userId, token } = req;

  client.get(userId, (err, data) => {
    if (err) {
      return response(res, 500, err, null);
    }

    if (data) {
      const parseData = JSON.parse(data);
      parseData[userId].push(token);
      client.setex(userId, 3600, JSON.stringify(parseData));
      return response(res, 200, 'Logout success', null);
    }

    const blacklistData = {
      [userId]: [token],
    };

    client.setex(userId, 3600, JSON.stringify(blacklistData));
    return response(res, 200, 'Logout success', null);
  });
};

const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!validateEmail(email)) {
      return response(res, 400, 'Email is not valid', null);
    }

    const emailTaken = (await authModel.getUserByEmail(email)) || [];

    if (emailTaken.length < 1) {
      return response(res, 404, 'User does not exist', null);
    }

    const otp = Math.floor(Math.random() * 9000) + 1000;
    const expired = new Date().getTime() + 60 * 60 * 1000;

    await authModel.updateOtp(otp, expired, email);

    return response(res, 200, 'Otp already sended');
  } catch (err) {
    return response(res, 500, err, null);
  }
};

const otpVerif = async (req, res) => {
  try {
    const { otp, email } = req.body;

    if (!validateEmail(email)) {
      return response(res, 400, 'Email is not valid', null);
    }

    if (otp.length < 4) {
      return response(res, 402, 'Invalid otp', null);
    }

    const expired = await authModel.checkOtp(otp, email);
    if (expired.length < 1) {
      return response(res, 410, 'Otp code is expired', null);
    }

    if (expired) {
      if (new Date(expired[0].otp_expired) < new Date()) {
        return response(res, 410, 'Otp code is expired', null);
      }

      return response(res, 200, 'Please input your new password', null);
    }
  } catch (err) {
    // console.log(err);
    return response(res, 500, err, null);
  }
};

const newPassword = async (req, res) => {
  try {
    const { otp, email, password } = req.body;

    if (otp.length < 4) {
      return response(res, 402, 'Invalid otp', null);
    }

    if (!validateEmail(email)) {
      return response(res, 400, 'Email is not valid', null);
    }

    if (!validatePassword(password)) {
      return response(
        res,
        400,
        'Password must be more than eight characters',
        null
      );
    }

    const hashPassword = await bcrypt.hash(password, saltRounds);
    // console.log(hashPassword);
    const update = await authModel.newPassword(otp, email, hashPassword);

    if (!update) {
      return response(res, 400, 'Failed to change password', null);
    }

    return response(res, 200, 'Password changed successfully', null);
  } catch (err) {
    // console.log(err);
    return response(res, 200, err, null);
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
