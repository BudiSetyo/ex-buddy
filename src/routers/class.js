const Router = require('express').Router();

const classHandler = require('../handlers/class');

Router.get('/', classHandler.getAllClass);
Router.get('/:id', classHandler.getCLassById);
Router.post('/', classHandler.postCLass);

module.exports = Router;
