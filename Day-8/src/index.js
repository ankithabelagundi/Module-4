import express from "express";
import todoRouter from "./routes/todo.routes.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/todos", todoRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
