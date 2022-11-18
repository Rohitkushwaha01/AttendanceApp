require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const mongodb = require("mongodb");
const ejs = require("ejs");

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// mongoose.connect(
//   `mongodb+srv://${process.env.MONGOUSERID}:${process.env.MONGOPASS}@cluster0.gotayl4.mongodb.net/AttendanceDB`
// );

mongoose.connect("mongodb://localhost:27017/AttendanceDB");

const FacultyUsersSchema = new mongoose.Schema({
  name: String,
  email: String,
  designation: String,
  contact: Number,
  password: String,
});

const StudentsSchema = new mongoose.Schema({
  name: String,
  rollno: String,
  email: String,
});

const PresentStudentSchema = new mongoose.Schema({
  id: Number,
  name: String,
  rollno: String,
  date: Date,
});

const FacultyUser = new mongoose.model("User", FacultyUsersSchema);
const Student = new mongoose.model("Student", StudentsSchema);
const PresentStudent = new mongoose.model(
  "PresentStudent",
  PresentStudentSchema
);

app.listen(3000, () => {
  console.log("Server is running on 3000");
});

app.get("/", (req, res) => {
  res.render("FacultyRegister");
});

app.get("/StudentLogin", (req, res) => {
  res.render("StudentLogin");
});

app.post("/StudentLogin", (req, res) => {
  console.log(req.body.email);
  console.log(req.body.name);
  console.log(req.body.rollno);
  Student.find({ rollno: req.body.rollno }, function (err, results) {
    if (err) {
      console.log(err);
    } else {
      console.log(results);
      console.log(results[0].name, req.body.name);
      console.log(results[0].email, req.body.email);
      if (results[0].email == req.body.email) {
        res.render("StudentPage", { results });
      } else {
        console.log("Wrong");
      }
    }
  });
});

app.get("/FacultyLogin", (req, res) => {
  res.render("FacultyLogin");
});

app.post("/FacultyLogin", function (req, res) {
  FacultyUser.find({ password: req.body.password }, function (err, results) {
    res.render("FacultyPage", {
      facultyName: results[0].name,
      facultyEmail: results[0].email,
      facultyDesignation: results[0].designation,
      facultyNumber: results[0].contact,
    });
  });
});

app.get("/FacultyRegister", (req, res) => {
  res.render("FacultyRegister");
});

app.get("/FacultyPage", (req, res) => {
  res.render("FacultyPage");
});

app.post("/FacultyRegister", (req, res) => {
  const newFaculty = FacultyUser({
    name: req.body.facultyName,
    email: req.body.facultyEmail,
    designation: req.body.facultyDesignation,
    contact: req.body.facultyNumber,
    password: req.body.facultyPassword,
  });

  console.log(newFaculty);

  newFaculty.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log(`you are Registered`);
      res.render("FacultyPage", {
        facultyName: req.body.facultyName,
        facultyEmail: req.body.facultyEmail,
        facultyDesignation: req.body.facultyDesignation,
        facultyNumber: req.body.facultyNumber,
      });
    }
  });
});

app.get("/Compose", (req, res) => {
  res.render("Compose");
});

app.post("/Compose", (req, res) => {
  const newStudent = Student({
    name: req.body.StudentName,
    rollno: req.body.StudentRollNo,
    email: req.body.StudentEmail,
  });

  newStudent.save(function (err) {
    res.redirect("/Compose");
    console.log(`Student Added`);
  });
});

app.get("/StudentList", (req, res) => {
  Student.find({}, function (err, results) {
    const studentArray = results.map((result) => result);
    const i = 1;
    res.render("StudentList", { i, studentArray });
  });
});

app.post("/StudentList", (req, res) => {
  console.log(req.body);
});

app.get("/Presenty", (req, res) => {
  Student.find({}, function (err, results) {
    const studentArray = results.map((result) => result);
    const i = 1;
    res.render("Presenty", { i, studentArray });
  });
});

app.post("/Presenty", (req, res) => {
  console.log(req.body);
});

app.post("/delete", (req, res) => {
  const removeItemId = req.body.remove;
  Student.findByIdAndDelete({ _id: removeItemId }, function (err) {
    if (!err) {
      res.redirect("/Presenty");
    } else {
      console.log(err);
    }
  });
});
