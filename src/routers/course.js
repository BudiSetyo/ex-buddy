const Router = require('express').Router();

const courseHandler = require('../handlers/course');
// const Authorize = require('../middlewares/authorize');
// const multerUploadImage = require('../middlewares/uploadImages');

Router.get('/', courseHandler.getAllCourse);

module.exports = Router;
