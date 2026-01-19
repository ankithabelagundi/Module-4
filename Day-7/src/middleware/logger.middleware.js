const loggerMiddleware = (req, res, next) => {
  const timestamp = new Date().toISOString().replace("T", " ").split(".")[0];
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next();
};

export default loggerMiddleware;
