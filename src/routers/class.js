const Router = require('express').Router();

const classHandler = require('../handlers/class');
const Authorize = require('../middlewares/authorize');
const multerUploadImage = require('../middlewares/uploadImages');

Router.get('/', Authorize.student, classHandler.getAllClass);
Router.get('/:id', classHandler.getCLassById);
Router.get('/myclass/:idUser', classHandler.getUserClass);
Router.get('/ping', (req, res) => {
  console.log('ping');
  res.status(200).send({
    msg: 'yolo',
  });
});
Router.post(
  '/',
  Authorize.teacher,
  multerUploadImage.single('image'),
  classHandler.postCLass
);

module.exports = Router;
