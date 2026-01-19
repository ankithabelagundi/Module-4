import fs from "fs";

const DB_PATH = "./src/db.json";

const uniqueEmailMiddleware = (req, res, next) => {
  const { email } = req.body;
  const db = JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));

  const exists = db.users.some((u) => u.email === email);

  if (exists) {
    return res.status(409).json({
      error: "Email already exists",
    });
  }

  next();
};

export default uniqueEmailMiddleware;
