const Router = require('express').Router();

const profileHandler = require('../handlers/profile');

Router.get('/', profileHandler.updateProfile);

module.exports = Router;
