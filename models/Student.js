const mongoose = require("mongoose");

const StudentsSchema = new mongoose.Schema({
  name: String,
  rollno: String,
  email: String,
});

module.exports = StudentsSchema;
