const connect = require('../database/connection');

const getAllClass = (searchValue, sortBy, order, limitPage, offset) => {
  let queryString = [
    `SELECT c.id, c.class_name, c.description, ca.category_name, l.level_name, c.pricing FROM class c LEFT JOIN categories ca ON c.category = ca.id LEFT JOIN levels l ON c.level = l.id WHERE c.class_name LIKE ?`,
  ];

  let paramData = [searchValue];

  if (sortBy && order) {
    queryString.push('ORDER BY ? ?');
    paramData.push(sortBy, order);
  }

  queryString.push('LIMIT ? OFFSET ?');
  paramData.push(limitPage, offset);

  return new Promise((resolve, reject) => {
    connect.query(queryString.join(' '), paramData, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const getCountClass = () => {
  return new Promise((resolve, reject) => {
    const queryString = `SELECT COUNT(id) AS "count" FROM class`;

    connect.query(queryString, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const getClassById = (id) => {
  const queryString = `SELECT * FROM class WHERE id=?`;

  return new Promise((resolve, reject) => {
    connect.query(queryString, [id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const postCLass = (
  classname,
  description,
  day,
  starttime,
  endtime,
  categories,
  level,
  price,
  url
) => {
  return new Promise((resolve, reject) => {
    const queryString = `INSERT INTO class (class_name, description, day, start_time, end_time, category, level, pricing, class_img) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    connect.query(
      queryString,
      [
        classname,
        description,
        day,
        starttime,
        endtime,
        categories,
        level,
        price,
        url,
      ],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

const getClassUser = (idUser, searchValue) => {
  let queryString = `SELECT * FROM my_class INNER JOIN class ON my_class.id_class = class.id INNER JOIN levels ON class.level = levels.id INNER JOIN categories ON class.category = categories.id WHERE id_user=? AND class_name LIKE ?`;

  let paramData = [idUser, searchValue];

  return new Promise((resolve, reject) => {
    connect.query(queryString, paramData, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

// const getClassPaginate = (searchValue) => {
//   return new Promise((resolve, reject) => {
//     let queryString = `SELECT * FROM class c LEFT JOIN categories ca ON c.category = ca.id LEFT JOIN levels l ON c.level = l.id WHERE c.class_name LIKE ?`;

//     let paramData = [searchValue];

//     // if (sortBy && order) {
//     //   queryString += ` ORDER BY ? ? `;
//     //   paramData = [...paramData, sortBy, order];
//     // }

//     // queryString += ` LIMIT ? OFFSET ? `;
//     // paramData = [...paramData, limitPage, offset];

//     // let total = 0;

//     console.log(queryString);

//     connect.query(queryString, paramData, (err, result) => {
//       if (err) {
//         reject(err);
//       } else {
//         console.log(result);
//         resolve(result);
//       }

//       // const queryStringCount = `SELECT COUNT(id) AS total FROM class`;

//       // connect.query(queryStringCount, (errCount, resultCount) => {
//       //   console.log(resultCount);
//       //   if (errCount) return reject(errCount);
//       //   total = resultCount[0].total;
//       //   return resolve({ data: result, total });
//       // });
//     });
//   });
// };

module.exports = {
  getAllClass,
  getClassById,
  postCLass,
  getClassUser,
  getCountClass,
};
