import express from "express";
import dotenv from "dotenv";
import usersRouter from "./routes/users.routes.js";

dotenv.config(); 

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/users", usersRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

