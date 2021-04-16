const Router = require('express').Router();

const courseHandler = require('../handlers/course');
// const Authorize = require('../middlewares/authorize');
const multerUploadImage = require('../middlewares/uploadImages');

Router.get('/', courseHandler.getAllCourse);

Router.post('/', multerUploadImage.single('image'), courseHandler.postCourse);
Router.post('/register', courseHandler.registerCourse);

Router.patch('/:id', courseHandler.updateCourse);

Router.delete('/:id', courseHandler.deleteCourse);

module.exports = Router;
