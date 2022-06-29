const errors = [{ status: 404, message: { message: 'Product not found' } }];

const errorMiddleware = (err, _req, res, _next) => {
  res.status(errors[err].status).json(errors[err].message);
};

module.exports = errorMiddleware;