const client = require('../database/redis');
const jwt = require('jsonwebtoken');
const { response } = require('../helpers/response');

const authenticateToken = (req, res, next) => {
  const { userId, token } = req;

  client.get(userId, (err, data) => {
    if (err) {
      res.status(500).send(err);
    }

    if (data) {
      const parseData = JSON.parse(data);
      if (parseData[userId].includes(token)) {
        res.status(500).send({
          message: 'You have to login',
        });
      }
    }

    return next();
  });
};

const authentication = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return response(res, 400, 'No token provided');
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decodeToken) => {
    if (err && err.name === 'TokenExpiredError') {
      return response(res, 401, 'Token is expired');
    }
    if (err && err.name === 'JsonWebTokenError') {
      return writeError(res, 400, err);
    }

    req.token = token;
    req.id = decodeToken.id;
    req.role = decodeToken.role;

    return next();
  });
};

module.exports = {
  authenticateToken,
  authentication,
};
