const app = require('express');
const router = app.Router();

const showClass = require('../controller/class');

router.get('/', showClass.getClass);

module.exports(router);
