const app = require('express');
const router = app.Router();
const register = require('../controller/auth');

// router.get('/', (req, res) => {
//   res.status(200).send('berhasil');
// });

router.post('/register', register.register);

module.exports = router;
