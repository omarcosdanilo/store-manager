const error = [
  { status: 404, message: { message: 'Product not found' } },
  { status: 400, message: { message: '"name" is required' } },
  {
    status: 422,
    message: { message: '"name" length must be at least 5 characters long' },
  },
];

module.exports = error;