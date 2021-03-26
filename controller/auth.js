const connect = require('../connection');

exports.register = (req, res) => {
  const username = req.body.username || '';
  const email = req.body.email || '';
  const password = req.body.password || '';

  if (!email) {
    res.status(400).json({
      message: 'email is required',
    });
    return;
  }

  if (!username) {
    res.status(400).json({
      message: 'username is required',
    });
    return;
  }

  if (!password) {
    res.status(400).json({
      message: 'password is required',
    });
    return;
  }

  const get = `SELECT * FROM users WHERE username=?`;

  connect.query(get, [username], (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result.length);
    if (result.length > 1) {
      res.status(400).json({
        message: 'username already exist',
      });
      return;
    }
  });

  const insert = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;

  connect.query(insert, [username, email, password], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: 'terjadi kesalahan pada sistem',
      });
    }

    res.status(200).json({
      message: 'berhasil menambahkan data',
      result,
    });
  });
};
