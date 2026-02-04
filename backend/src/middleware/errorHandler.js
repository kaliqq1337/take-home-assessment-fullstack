function errorHandler(err, _req, res, _next) {
  console.error('Error:', err.message);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message,
  });
}

module.exports = { errorHandler };
