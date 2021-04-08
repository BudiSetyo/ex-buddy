const Router = require('express').Router();

const classHandler = require('../handlers/class');
const Authorize = require('../middlewares/authorize');

// get
Router.get('/', Authorize.student, classHandler.getAllClass);
Router.get('/:id', classHandler.getCLassById);
Router.get('/myclass/:idUser', classHandler.getUserClass);

// post
Router.post('/', Authorize.teacher, classHandler.postCLass);

module.exports = Router;
