const connect = require('../database/connection');

const getClassUser = (idUser, searchValue) => {
  let queryString = `SELECT * FROM mysclass INNER JOIN class ON mysclass.idclass = class.id INNER JOIN levels ON class.level = levels.id INNER JOIN categories ON class.category = categories.id WHERE iduser=? AND classname LIKE ?`;

  let paramData = [idUser, searchValue];

  return new Promise((resolve, reject) => {
    connect.query(queryString, paramData, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = {
  getClassUser,
};
