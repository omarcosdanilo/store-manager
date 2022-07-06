const errorMiddleware = (err, _req, res, _next) => {
  res.status(err.name).json({ message: err.message });
};

module.exports = errorMiddleware;
