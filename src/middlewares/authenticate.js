const client = require('../database/redis');

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

module.exports = {
  authenticateToken,
};
