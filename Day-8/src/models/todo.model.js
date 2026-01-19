import fs from "fs";

const DB_PATH = "./src/db.json";

const readDB = () => {
  const data = fs.readFileSync(DB_PATH, "utf-8");
  return JSON.parse(data);
};

const writeDB = (data) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
};

export const getAllTodos = () => {
  const db = readDB();
  return db.todos;
};

export const getTodoById = (id) => {
  const db = readDB();
  return db.todos.find((todo) => todo.id === id);
};

export const addTodo = (todo) => {
  const db = readDB();
  db.todos.push(todo);
  writeDB(db);
  return todo;
};

export const updateTodo = (id, updatedData) => {
  const db = readDB();
  const index = db.todos.findIndex((todo) => todo.id === id);

  if (index === -1) return null;

  db.todos[index] = { ...db.todos[index], ...updatedData };
  writeDB(db);
  return db.todos[index];
};

export const deleteTodo = (id) => {
  const db = readDB();
  const index = db.todos.findIndex((todo) => todo.id === id);

  if (index === -1) return false;

  db.todos.splice(index, 1);
  writeDB(db);
  return true;
};
