const { writeResponse, writeError } = require('../helpers/response');

const userClassModel = require('../models/myclass');

const getUserClass = async (req, res) => {
  const { search } = req.query;
  const searchValue = `%${search || ''}%`;
  const idUser = req.params.idUser;

  userClassModel
    .getClassUser(idUser, searchValue)
    .then((result) => {
      writeResponse(res, null, 200, result);
    })
    .catch((err) => {
      console.log(err);
      writeError(res, 500, err);
    });
};

module.exports = {
  getUserClass,
};
