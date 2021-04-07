const Router = require('express').Router();

const subClassHandler = require('../handlers/subClass');

Router.get('/:id', subClassHandler.getSubClass);

module.exports = Router;
