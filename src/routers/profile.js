const Router = require('express').Router();

const profileHandler = require('../handlers/profile');

Router.patch('/:id', profileHandler.updateProfile);

module.exports = Router;
