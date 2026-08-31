const errorHandler = (err, req, res, next) => {
  console.error(`\x1b[31m[API Error]\x1b[0m ${req.method} ${req.originalUrl}:`, err.message);
  
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};

module.exports = errorHandler;
