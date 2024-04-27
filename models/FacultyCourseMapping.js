const mongoose = require('mongoose')


const facultyCourseMappingSchema = new mongoose.Schema({
  facultyid: {
    type: Number,
    required: true,
},
coursecode: {
    type: String,
    required: true,
},

});

const facultymapcourse = mongoose.model('FacultyCourseMapping', facultyCourseMappingSchema);

module.exports = facultymapcourse;