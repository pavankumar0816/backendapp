const mongoose = require("mongoose");

const facultyCourseMappingSchema = new mongoose.Schema({
  faculty: {
    type: mongoose.Schema.Types.ObjectId, // Reference to Faculty ==> This field will store the _id of a document from the faculty collection, so we can link them.
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

// Embedded array → one-to-many only.

// Mapping collection with ObjectId + ref → supports many-to-many.
