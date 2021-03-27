const connect = require('../connection');

exports.getClass = (req, res) => {
  // const classname = req.body.classname || '';
  // const description = req.body.description || '';
  // const category = req.body.category || '';
  // const pricing = req.body.pricing || '';

  const get = `SELECT classname, description, category, pricing FROM class `;

  connect.query(
    get,
    // [classname, description, category, pricing],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: 'terjadi kesalahan pada sistem',
        });
      }

      res.status(200).json({
        message: 'menampilkan data class',
        result,
      });
    }
  );
};
