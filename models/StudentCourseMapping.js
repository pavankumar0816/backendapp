const mongoose = require("mongoose");

const studentCourseMappingSchema = new mongoose.Schema({
  studentid: {
    type: Number,
    required: true,
  },
  coursecode: {
    type: String,
    required: true,
  },
});

const studentmapcourse = mongoose.model(
  "StudentCourseMapping",
  studentCourseMappingSchema,
);
module.exports = studentmapcourse;
