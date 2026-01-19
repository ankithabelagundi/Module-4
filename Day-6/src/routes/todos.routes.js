import express from "express";
import fs from "fs";

const router = express.Router();
const DB_PATH = "./src/db.json";

const readDB = () => JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
const writeDB = (data) =>
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));

router.post("/add", (req, res) => {
  const db = readDB();
  const newTodo = {
    id: Date.now(),
    ...req.body,
  };

  db.todos.push(newTodo);
  writeDB(db);

  res.status(201).json({ message: "Todo added", todo: newTodo });
});

router.get("/", (req, res) => {
  const db = readDB();
  res.status(200).json(db.todos);
});

router.get("/:todoId", (req, res) => {
  const db = readDB();
  const todo = db.todos.find(
    (t) => t.id === Number(req.params.todoId)
  );

  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  res.status(200).json(todo);
});

router.put("/update/:todoId", (req, res) => {
  const db = readDB();
  const index = db.todos.findIndex(
    (t) => t.id === Number(req.params.todoId)
  );

  if (index === -1) {
    return res.status(404).json({ message: "Todo not found" });
  }

  db.todos[index] = { ...db.todos[index], ...req.body };
  writeDB(db);

  res.status(200).json({ message: "Todo updated", todo: db.todos[index] });
});

router.delete("/delete/:todoId", (req, res) => {
  const db = readDB();
  const index = db.todos.findIndex(
    (t) => t.id === Number(req.params.todoId)
  );

  if (index === -1) {
    return res.status(404).json({ message: "Todo not found" });
  }

  db.todos.splice(index, 1);
  writeDB(db);

  res.status(200).json({ message: "Todo deleted" });
});

export default router;
