import express from "express";
import fs from "fs";

const router = express.Router();
const DB_PATH = "./src/db.json";

const readDB = () => JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
const writeDB = (data) =>
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));

router.post("/add", (req, res) => {
  const db = readDB();
  const newUser = {
    id: Date.now(),
    ...req.body,
  };

  db.users.push(newUser);
  writeDB(db);

  res.status(201).json({ message: "User added", user: newUser });
});

router.get("/", (req, res) => {
  const db = readDB();
  res.status(200).json(db.users);
});

router.get("/:userId", (req, res) => {
  const db = readDB();
  const user = db.users.find(
    (u) => u.id === Number(req.params.userId)
  );

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);
});

router.put("/update/:userId", (req, res) => {
  const db = readDB();
  const index = db.users.findIndex(
    (u) => u.id === Number(req.params.userId)
  );

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  db.users[index] = { ...db.users[index], ...req.body };
  writeDB(db);

  res.status(200).json({ message: "User updated", user: db.users[index] });
});

router.delete("/delete/:userId", (req, res) => {
  const db = readDB();
  const index = db.users.findIndex(
    (u) => u.id === Number(req.params.userId)
  );

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  db.users.splice(index, 1);
  writeDB(db);

  res.status(200).json({ message: "User deleted" });
});

export default router;
