const requests = {};
const LIMIT = 15;
const WINDOW = 60 * 1000; // 1 minute

const rateLimiter = (req, res, next) => {
  const ip = req.ip;
  const currentTime = Date.now();

  if (!requests[ip]) {
    requests[ip] = { count: 1, startTime: currentTime };
    return next();
  }

  const elapsed = currentTime - requests[ip].startTime;

  if (elapsed > WINDOW) {
    requests[ip] = { count: 1, startTime: currentTime };
    return next();
  }

  if (requests[ip].count >= LIMIT) {
    return res.status(429).json({
      error: "Too many requests, please try again later",
    });
  }

  requests[ip].count++;
  next();
};

export default rateLimiter;
