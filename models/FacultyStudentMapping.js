const mongoose = require("mongoose");

const FacultyStudentMappingSchema = new mongoose.Schema({
  faculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "faculty",
    required: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
});

const FacultyStudentMapping = mongoose.model(
  "FacultyStudentMapping",
  FacultyStudentMappingSchema,
);

module.exports = FacultyStudentMapping;
