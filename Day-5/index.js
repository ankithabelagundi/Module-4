import express from "express";
import fs from "fs";

const app = express();
const PORT = 3000;
const DB_FILE = "./db.json";


app.use(express.json());


const readData = () => {
  const data = fs.readFileSync(DB_FILE, "utf-8");
  return JSON.parse(data);
};


const writeData = (data) => {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};


app.get("/students", (req, res) => {
  const data = readData();
  res.status(200).json({
    success: true,
    students: data.students
  });
});

app.post("/students", (req, res) => {
  const { id, name, course, year } = req.body;


  if (!id || !name || !course || !year) {
    return res.status(400).json({
      success: false,
      message: "All fields (id, name, course, year) are required."
    });
  }

  const data = readData();

  const exists = data.students.find((s) => s.id === id);
  if (exists) {
    return res.status(409).json({
      success: false,
      message: "Student with this ID already exists."
    });
  }

  const newStudent = { id, name, course, year };
  data.students.push(newStudent);
  writeData(data);

  res.status(201).json({
    success: true,
    message: "Student added successfully.",
    student: newStudent
  });
});

app.put("/students", (req, res) => {
  const { id, name, course, year } = req.body;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Student ID is required for update."
    });
  }

  const data = readData();
  const studentIndex = data.students.findIndex((s) => s.id === id);

  if (studentIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Student not found."
    });
  }

 
  if (name) data.students[studentIndex].name = name;
  if (course) data.students[studentIndex].course = course;
  if (year) data.students[studentIndex].year = year;

  writeData(data);

  res.status(200).json({
    success: true,
    message: "Student updated successfully.",
    student: data.students[studentIndex]
  });
});

app.delete("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const data = readData();

  const studentIndex = data.students.findIndex((s) => s.id === id);

  if (studentIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Student not found."
    });
  }

  const deletedStudent = data.students.splice(studentIndex, 1);
  writeData(data);

  res.status(200).json({
    success: true,
    message: "Student deleted successfully.",
    student: deletedStudent[0]
  });
});



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
