const Router = require('express').Router();

const profileHandler = require('../handlers/profile');
const multerUploadImage = require('../middlewares/uploadImages');

Router.get('/ping', (req, res) => {
  console.log('ping');
  res.status(200).send({
    msg: 'sip',
  });
});

Router.patch(
  '/:id',
  multerUploadImage.single('image'),
  profileHandler.updateProfile
);

module.exports = Router;
