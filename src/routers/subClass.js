const Router = require('express').Router();

const subClassHandler = require('../handlers/subClass');

Router.get('/:id', subClassHandler.getSubClass);
Router.post('/', subClassHandler.addSubClass);
Router.get('/paginate', (req, res) => {
  console.log('hallo');
  res.status(200).send({
    msg: 'berhasil',
  });
});

module.exports = Router;
