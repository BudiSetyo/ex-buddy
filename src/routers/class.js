const Router = require('express').Router();

const classHandler = require('../handlers/class');

Router.get('/', classHandler.getAllClass);
Router.post('/addclass', classHandler.postCLass);

module.exports = Router;
