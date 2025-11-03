const mongoose = require("mongoose");

const StudentAssessmentSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],

  file: { type: String, required: true },
  description: { type: String },
  saveAs: { type: String },
  uploadedBy: {
    type: String,
    enum: ["faculty", "student"],
    default: "student",
  },
});

const StudentAssessment = mongoose.model(
  "StudentAssessment",
  StudentAssessmentSchema,
);
module.exports = StudentAssessment;
