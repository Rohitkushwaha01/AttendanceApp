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

mongoose.connect(
  `mongodb+srv://${process.env.MONGOUSERID}:${process.env.MONGOPASS}@cluster0.gotayl4.mongodb.net/AttendanceDB`
);

const UsersSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const StudentsSchema = new mongoose.Schema({
  name: String,
  rollno: String,
});

const PresentStudentSchema = new mongoose.Schema({
  id: Number,
  name: String,
  rollno: String,
  date: Date,
});

const User = new mongoose.model("User", UsersSchema);
const Student = new mongoose.model("Student", StudentsSchema);
const PresentStudent = new mongoose.model("PresentStudent", PresentStudentSchema);

app.listen(3000, () => {
  console.log("Server is running on 3000");
});

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/StudentLogin", (req, res) => {
  res.render("StudentLogin");
});

app.get("/StudentRegister", (req, res) => {
  res.render("StudentRegister");
});

app.get("/FacultyLogin", (req, res) => {
  res.render("FacultyLogin");
});

app.get("/FacultyRegister", (req, res) => {
  res.render("FacultyRegister");
});

app.get("/FacultyPage", (req, res) => {
  res.render("FacultyPage");
});

app.post("/FacultyRegister", (req, res) => {
  const newFaculty = User({
    name: req.body.facultyName,
    email: req.body.facultyEmail,
    password: req.body.facultyPassword,
  });

  console.log(newFaculty);

  newFaculty.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log(`you are Registered`);
      res.redirect("/FacultyPage");
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
  console.log(req.body)
  // const newPresentStudents = PresentStudent({
  //   id: req.body.sid,
  //   name: req.body.sname,
  //   rollno: req.body.srollno,
  //   date: req.body.date
  // })

  // console.log(newPresentStudents)

  // newPresentStudents.save(function(err){
  //   if(err){
  //     console.log(err);
  //   } else {
  //     console.log(`Presenty added`);
  //     res.redirect("/Presenty");
  //   }
  // })
});

app.get("/Presenty", (req, res) => {
  res.render("Presenty");
});

// app.post("/Presenty", (req, res) => {

// });


// <% Present.forEach(function(student){ %>
//   <tr>
//     <th scope="row"><%=id%></th>
//     <td><input type="checkbox" ></td>
//     <td ><%= student.name %></td>
//     <td ><%= student.rollno %></td>
//   </tr>
//    <% }) %>