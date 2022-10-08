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

const User = new mongoose.model("User", UsersSchema);

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
    password: req.body.facultyPassword
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
