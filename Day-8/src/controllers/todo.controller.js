import {
  getAllTodos,
  getTodoById,
  addTodo,
  updateTodo,
  deleteTodo,
} from "../models/todo.model.js";

export const createTodo = (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const newTodo = {
      id: Date.now(),
      title,
    };

    const todo = addTodo(newTodo);
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: "Failed to create todo" });
  }
};

export const getTodos = (req, res) => {
  try {
    const todos = getAllTodos();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
};

export const getTodo = (req, res) => {
  try {
    const id = Number(req.params.todoId);
    const todo = getTodoById(id);

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch todo" });
  }
};

export const editTodo = (req, res) => {
  try {
    const id = Number(req.params.todoId);
    const updatedTodo = updateTodo(id, req.body);

    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: "Failed to update todo" });
  }
};

export const removeTodo = (req, res) => {
  try {
    const id = Number(req.params.todoId);
    const success = deleteTodo(id);

    if (!success) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete todo" });
  }
};

