const Router = require('express').Router();
const auth = require('./auth');
const profile = require('./profile');
const course = require('./course');
const dashboard = require('./dashboard');
// const multerUploadImage = require('../middlewares/uploadImages');

Router.use('/auth', auth);
Router.use('/profile', profile);
Router.use('/course', course);
Router.use('/dashboard', dashboard);

// Router.post('/upload', multerUploadImage.single('image'), (req, res) => {
//   const file = req.file || {};
//   let url = '';

//   if (file.filename) {
//     url = `/images/${file.filename}`;
//   }

//   res.status(200).json({
//     msg: 'Upload Success',
//     file: req.file,
//     url,
//   });
// });

module.exports = Router;
