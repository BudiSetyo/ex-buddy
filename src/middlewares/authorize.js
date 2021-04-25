const jwt = require('jsonwebtoken');
const { writeError } = require('../helpers/response');
const client = require('../database/redis');

const student = (req, res, next) => {
  const token = (req.header('x-acces-token') || '').split(' ')[1];
  console.log(token);
  const options = {
    issuer: process.env.ISSUER,
  };

  jwt.verify(token, process.env.SECRET_KEY, options, (err, decodeToken) => {
    if (err && err.name === 'TokenExpiredError')
      return writeError(res, 401, err);
    if (err && err.name === 'JsonWebTokenError')
      return writeError(res, 400, err);
    if (decodeToken.role === '1') return next();

    writeError(res, 403, { msg: 'Forbidden' });
  });
};

const teacher = (req, res, next) => {
  const token = req.header('x-acces-token').split(' ')[1];
  const options = {
    issuer: process.env.ISSUER,
  };

  jwt.verify(token, process.env.SECRET_KEY, options, (err, decodeToken) => {
    if (err && err.name === 'TokenExpiredError')
      return writeError(res, 401, err);
    if (err && err.name === 'JsonWebTokenError')
      return writeError(res, 400, err);
    if (decodeToken.role === '2') return next();

    writeError(res, 403, { msg: 'Forbidden' });
  });
};

const verifyToken = (req, res, next) => {
  const token = req.header('x-acces-token').split(' ')[1];

  if (!token) {
    res.status(403).send({
      message: 'no token provided',
    });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decodeToken) => {
    if (err) {
      res.status(401).send({
        status: 'error',
        message: err.message,
      });
    }

    client.get(`blacklist:${token}`, (err, blacklisted) => {
      if (err) {
        res.status(500).send(err);
      }

      if (blacklisted) {
        res.status(401).send({
          message: 'token blacklisted',
        });
      }

      req.userId = decodeToken.id;
      req.tokenExp = decodeToken.exp;
      req.token = token;
      next();
    });
  });
};

module.exports = {
  student,
  teacher,
  verifyToken,
};
