const writeResponse = (res, header, status, result) => {
  let response;
  if (header) {
    res.header(header);
  }
  if (result) {
    response = {
      message: 'success',
      result,
    };
  }

  res.status(status).json(response);
};

const writeError = (res, status, err) => {
  res.status(status).json(new Error(err));
};

module.exports = {
  writeResponse,
  writeError,
};
