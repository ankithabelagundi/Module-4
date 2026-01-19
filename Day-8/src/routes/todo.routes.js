import express from "express";
import {
  createTodo,
  getTodos,
  getTodo,
  editTodo,
  removeTodo,
} from "../controllers/todo.controller.js";

const router = express.Router();

router.post("/add", createTodo);
router.get("/", getTodos);
router.get("/:todoId", getTodo);
router.put("/update/:todoId", editTodo);
router.delete("/delete/:todoId", removeTodo);

export default router;

