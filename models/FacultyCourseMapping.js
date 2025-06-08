const mongoose = require("mongoose");

const facultyCourseMappingSchema = new mongoose.Schema({
  faculty: {
    type: mongoose.Schema.Types.ObjectId, // Reference to Faculty
    ref: "faculty",
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId, // Reference to Course
    ref: "course",
    required: true,
  },
});

const FacultyCourseMapping = mongoose.model(
  "FacultyCourseMapping",
  facultyCourseMappingSchema,
);
module.exports = FacultyCourseMapping;
