const mongoose = require("mongoose");

const studentassessmentSchema = new mongoose.Schema({
  file: {
    type: String,
    required: true,
  },
});

const studentassessment = mongoose.model(
  "StudentAssessment",
  studentassessmentSchema,
);
module.exports = studentassessment;
