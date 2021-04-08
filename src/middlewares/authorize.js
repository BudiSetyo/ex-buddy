const jwt = require('jsonwebtoken');
const { writeError } = require('../helpers/response');

const student = (req, res, next) => {
  const token = req.header('x-access-token').split(' ')[1];
  const options = {
    issuer: process.env.ISSUER,
  };
  jwt.verify(token, procces.env.SECRET_KEY, options, (err, decodeToken) => {
    if (err && err.name === 'TokenExpiredError')
      return writeError(res, 401, err);
    if (err && err.name === 'JsonWebTokenError') return wri;
  });
};
