const validateTodo = (req, res, next) => {
  const keys = Object.keys(req.body);

  if (!req.body.title || keys.length !== 1) {
    return res.status(400).json({
      error: "Invalid request body. Only 'title' is allowed",
    });
  }

  next();
};

export default validateTodo;
