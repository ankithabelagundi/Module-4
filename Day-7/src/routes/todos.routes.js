import express from "express";
import fs from "fs";
import rateLimiter from "../middleware/rateLimiter.middleware.js";
import validateTodo from "../middleware/validateTodo.middleware.js";

const router = express.Router();
const DB_PATH = "./src/db.json";

const readDB = () =>
  JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));

const writeDB = (data) =>
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));

router.post("/add", validateTodo, (req, res) => {
  const db = readDB();
  const newTodo = {
    id: Date.now(),
    title: req.body.title,
  };

  db.todos.push(newTodo);
  writeDB(db);

  res.status(201).json(newTodo);
});

router.get("/", rateLimiter, (req, res) => {
  const db = readDB();
  res.status(200).json(db.todos);
});

router.get("/:todoId", (req, res) => {
  const db = readDB();
  const todo = db.todos.find(
    (t) => t.id === Number(req.params.todoId)
  );

  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }

  res.status(200).json(todo);
});

router.put("/update/:todoId", (req, res) => {
  const db = readDB();
  const index = db.todos.findIndex(
    (t) => t.id === Number(req.params.todoId)
  );

  if (index === -1) {
    return res.status(404).json({ error: "Todo not found" });
  }

  db.todos[index] = {
    ...db.todos[index],
    ...req.body,
  };

  writeDB(db);
  res.status(200).json(db.todos[index]);
});

router.delete("/delete/:todoId", (req, res) => {
  const db = readDB();
  const index = db.todos.findIndex(
    (t) => t.id === Number(req.params.todoId)
  );

  if (index === -1) {
    return res.status(404).json({ error: "Todo not found" });
  }

  db.todos.splice(index, 1);
  writeDB(db);

  res.status(200).json({ message: "Todo deleted" });
});

export default router;
