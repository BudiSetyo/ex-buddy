const Router = require('express').Router();

const profileHandler = require('../handlers/profile');
const multerUploadImage = require('../middlewares/uploadImages');

Router.patch(
  '/:id',
  multerUploadImage.single('image'),
  profileHandler.updateProfile
);

module.exports = Router;
