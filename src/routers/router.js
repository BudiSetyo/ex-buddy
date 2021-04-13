const Router = require('express').Router();
const auth = require('./auth');
const classRoute = require('./class');
const profile = require('./profile');
const subClass = require('./subClass');
const multerUploadImage = require('../middlewares/uploadImages');

Router.use('/auth', auth);
Router.use('/class', classRoute);
Router.use('/profile', profile);
Router.use('/subClass', subClass);

Router.post('/upload', multerUploadImage.single('image'), (req, res) => {
  const file = req.file || {};
  let url = '';

  if (file.filename) {
    url = `/images/${file.filename}`;
  }

  res.status(200).json({
    msg: 'Upload Success',
    file: req.file,
    url,
  });
});

module.exports = Router;
