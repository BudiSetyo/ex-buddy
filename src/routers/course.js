const Router = require('express').Router();

const courseHandler = require('../handlers/course');
const {
  studentOtorization,
  teacherOtorization,
} = require('../middlewares/authorize');
const multerUploadImage = require('../middlewares/uploadImages');

Router.get('/', courseHandler.getAllCourse);
Router.get('/userCourse/', studentOtorization, courseHandler.getCourseUser);
Router.get('/subCourse/', courseHandler.getSubCourse);
Router.get('/fasilitatorCourse/:id', courseHandler.getCourseFasilitator);
Router.get('/:id', courseHandler.getCourseById);

Router.post(
  '/:idFasilitator',
  teacherOtorization,
  multerUploadImage.single('image'),
  courseHandler.postCourse
);
Router.post('/:id/register', studentOtorization, courseHandler.registerCourse);
Router.post('/subCourse', teacherOtorization, courseHandler.addSubCourse);
Router.post(
  '/subCourse/score',
  teacherOtorization,
  courseHandler.addSubCourseScore
);

Router.patch('/:id', teacherOtorization, courseHandler.updateCourse);
Router.patch(
  '/subCourse/score',
  teacherOtorization,
  courseHandler.updateSubCourseScore
);

Router.delete('/:id', teacherOtorization, courseHandler.deleteCourse);

module.exports = Router;
