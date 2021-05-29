const Router = require('express').Router();

const profileHandler = require('../handlers/profile');
const multerUploadImage = require('../middlewares/uploadImages');

Router.patch(
  '/:id',
  multerUploadImage.single('image'),
  profileHandler.updateProfile
);

Router.patch('/pass/:id', profileHandler.updatePassword);

Router.get('/:id', profileHandler.getProfile);

module.exports = Router;
