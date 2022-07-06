const errorEncoding = (code, message) => {
  const error = Error();
  error.name = code;
  error.message = message;
  throw error;
};

module.exports = errorEncoding;