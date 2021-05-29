const profileModels = require('../models/profile');
const { writeError } = require('../helpers/response');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const updateProfile = async (req, res) => {
  const id = req.params.id;
  const file = req.file || {};
  let valueUpdate = req.body;
  let url = '';

  if (file.filename) {
    url = `/images/${file.filename}`;
    valueUpdate = { ...valueUpdate, profile_img: url };
  }

  profileModels
    .updateProfile(valueUpdate, id)
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

const getProfile = (req, res) => {
  const { id } = req.params;

  profileModels
    .getProfile(id)
    .then((result) => {
      return res.status(200).send({
        message: 'success',
        result,
      });
    })
    .catch((err) => {
      return writeError(res, 500, err);
    });
};

const updatePassword = (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    profileModels
      .updatePassword(hash, id)
      .then((result) => {
        return res.status(200).send({
          message: 'success',
        });
      })
      .catch((err) => {
        console.log(err);
        return writeError(res, 500, err);
      });
  });
};

module.exports = {
  updateProfile,
  getProfile,
  updatePassword,
};
