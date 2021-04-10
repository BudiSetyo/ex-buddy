const profileModels = require('../models/profile');
const { writeError } = require('../helpers/response');

const updateProfile = async (req, res) => {
  const id = req.params.id;
  const { fullName, phoneNumber } = req.body;

  profileModels
    .updateProfile(fullName, phoneNumber, id)
    .then((result) => {
      res.status(200).send({
        message: 'success',
        result,
      });
    })
    .catch((err) => {
      console.log(err);
      writeError(res, 500, err);
    });
};

module.exports = {
  updateProfile,
};
