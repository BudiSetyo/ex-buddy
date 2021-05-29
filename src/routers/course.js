const Router = require('express').Router();

const courseHandler = require('../handlers/course');
const Authorize = require('../middlewares/authorize');
const Authenticate = require('../middlewares/authenticate');
const multerUploadImage = require('../middlewares/uploadImages');

Router.get('/', courseHandler.getAllCourse);
Router.get('/:id/userCourse/', courseHandler.getCourseUser);
Router.get('/:id/subCourse/', courseHandler.getSubCourse);
Router.get('/fasilitatorCourse/:id', courseHandler.getCourseFasilitator);
Router.get('/:id', courseHandler.getCourseById);

Router.post(
  '/:idFasilitator',
  multerUploadImage.single('image'),
  courseHandler.postCourse
);
Router.post('/:id/register', courseHandler.registerCourse);
Router.post('/subCourse', courseHandler.addSubCourse);
Router.post('/subCourse/score', courseHandler.addSubCourseScore);

Router.patch('/:id', courseHandler.updateCourse);
Router.patch('/subCourse/score', courseHandler.updateSubCourseScore);

Router.delete('/:id', courseHandler.deleteCourse);

module.exports = Router;
