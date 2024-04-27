const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
  course: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  file: {
    type: String, //URL
    required: true,
  },
});
const assessment = mongoose.model('Assessment',assessmentSchema);
module.exports = assessment;
