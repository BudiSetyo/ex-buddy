const Router = require('express').Router();

const profileHandler = require('../handlers/profile');
const multerUploadImage = require('../middlewares/uploadImages');

Router.patch(
  '/',
  multerUploadImage.single('image'),
  profileHandler.updateProfile
);

Router.patch('/pass/', profileHandler.updatePassword);

Router.get('/', profileHandler.getProfile);

module.exports = Router;
