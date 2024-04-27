const mongoose = require('mongoose');

const registerCourseSchema = new mongoose.Schema({
   department: {
      type: String,
      required: true,
   },
   academicyear: {
       type: String,
       required: true,
   },
   program: {
    type: String,
    required: true,
   },
   semester: {
       type: String,
       required: true,
   },    
   year: {
       type: String,
       required: true,
   },
    coursecode: {
        type: String,
        unique: true,
        required: true,
    },
    coursename: {
        type: String,
        required: true,
    },
    // Add a field to store the IDs of the students registered for this course
    registeredStudents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student' // Assuming you have a 'Student' model
    }]
});

const RegisteredCourse = mongoose.model('RegisteredCourse', registerCourseSchema);
module.exports = RegisteredCourse;
