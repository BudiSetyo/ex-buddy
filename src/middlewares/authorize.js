const jwt = require('jsonwebtoken');
const { writeError, response } = require('../helpers/response');

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
    if (decodeToken.role === '1') {
      req.userId = decodeToken.id;
      req.tokenExp = decodeToken.exp;
      req.token = token;
      return next();
    }

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
    if (decodeToken.role === '2') {
      req.userId = decodeToken.id;
      req.tokenExp = decodeToken.exp;
      req.token = token;
      return next();
    }

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

    req.userId = decodeToken.id;
    req.tokenExp = decodeToken.exp;
    req.token = token;
    next();
  });
};

const studentOtorization = (req, res, next) => {
  const role = req.role;

  console.log(typeof role);

  if (role === 1) {
    return next();
  }

  return response(res, 403, 'Forbidden access');
};

const teacherOtorization = (req, res, next) => {
  const role = req.role;

  if (role === 2) {
    return next();
  }

  return response(res, 403, 'Forbidden access');
};

module.exports = {
  student,
  teacher,
  verifyToken,
  studentOtorization,
  teacherOtorization,
};
