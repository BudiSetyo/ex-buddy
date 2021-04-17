const Router = require('express').Router();

const courseHandler = require('../handlers/course');
// const Authorize = require('../middlewares/authorize');
const multerUploadImage = require('../middlewares/uploadImages');

Router.get('/', courseHandler.getAllCourse);
Router.get('/:id/userCourse/', courseHandler.getCourseUser);
Router.get('/:id/subCourse/', courseHandler.getSubCourse);

Router.post('/', multerUploadImage.single('image'), courseHandler.postCourse);
Router.post('/register', courseHandler.registerCourse);
Router.post('/subCourse', courseHandler.addSubCourse);
Router.post('/subCourse/score', courseHandler.addSubCourseScore);

Router.patch('/:id', courseHandler.updateCourse);
Router.patch('/subCourse/score', courseHandler.updateSubCourseScore);

Router.delete('/:id', courseHandler.deleteCourse);

module.exports = Router;
