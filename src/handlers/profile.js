const profileModels = require('../models/profile');
const { response } = require('../helpers/response');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const validatePassword = (password) => {
  if (password.length > 7) {
    return true;
  }
  return false;
};

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
      return response(res, 200, 'Update profile success', {
        result,
        file: req.file,
        url,
      });
    })
    .catch((err) => {
      // console.log(err);
      return res, 500, err, null;
    });
};

const getProfile = (req, res) => {
  const { id } = req.params;

  profileModels
    .getProfile(id)
    .then((result) => {
      return response(res, 200, 'Success', { result });
    })
    .catch((err) => {
      return response(res, 500, err, null);
    });
};

const updatePassword = (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  if (!validatePassword(password)) {
    return response(
      res,
      400,
      'Password must be more than eight caracters',
      null
    );
  }

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) return response(res, 500, err, null);

    profileModels
      .updatePassword(hash, id)
      .then((result) => {
        return response(res, 200, 'Password successfully changed', null);
      })
      .catch((err) => {
        // console.log(err);
        return response(res, 500, err, null);
      });
  });
};

module.exports = {
  updateProfile,
  getProfile,
  updatePassword,
};
