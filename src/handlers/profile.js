const profileModels = require('../models/profile');
const { writeError } = require('../helpers/response');

const updateProfile = async (req, res) => {
  const id = req.params.id;
  const file = req.file || {};
  const { fullName, phoneNumber } = req.body;
  let url = '';

  if (file.filename) {
    url = `/images/${file.filename}`;
  }

  profileModels
    .updateProfile(fullName, phoneNumber, url, id)
    .then((result) => {
      res.status(200).send({
        message: 'success',
        result,
        file: req.file,
        url,
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
