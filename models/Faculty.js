const mongoose = require("mongoose");

const FacultyUsersSchema = new mongoose.Schema({
  name: String,
  email: String,
  designation: String,
  contact: Number,
  password: String,
});

module.exports = FacultyUsersSchema;
