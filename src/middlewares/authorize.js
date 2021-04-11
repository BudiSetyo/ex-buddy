const jwt = require('jsonwebtoken');
const { writeError } = require('../helpers/response');

const student = (req, res, next) => {
  const token = (req.header('x-acces-token') || '').split(' ')[1];
  console.log(token);
  const options = {
    issuer: process.env.ISSUER,
  };

  jwt.verify(token, process.env.SECRET_KEY, options, (err, decodeToken) => {
    // console.log(decodeToken);
    // console.log(decodeToken.role);
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

module.exports = {
  student,
  teacher,
};
