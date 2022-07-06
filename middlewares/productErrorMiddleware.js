const errorMiddleware = (err, _req, res, _next) => {
  switch (err.message) {
    case '"name" length must be at least 5 characters long':
      res.status(422).json({ message: err.message });
      break;
    case '"name" is required':
      res.status(400).json({ message: err.message });
      break;
    case 'Product not found':
      res.status(404).json({ message: err.message });
      break;
    default:
      res.status(err.status).json(err.message);
      break;
  }
};

module.exports = errorMiddleware;