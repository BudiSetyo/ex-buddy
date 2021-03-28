const Router = require('express').Router();

const myclassHandler = require('../handlers/myclass');

Router.get('/:idUser', myclassHandler.getUserClass);

module.exports = Router;
