const Router = require('express').Router();

const classHandler = require('../handlers/class');

// get
Router.get('/', classHandler.getAllClass);
Router.get('/:id', classHandler.getCLassById);
Router.get('/myclass/:idUser', classHandler.getUserClass);

// post
Router.post('/', classHandler.postCLass);

module.exports = Router;
