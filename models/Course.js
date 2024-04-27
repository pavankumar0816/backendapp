const mongoose = require('mongoose')

const courseschema = new mongoose.Schema({
   department:
   {
      type:String,
      required:true,
   },
   academicyear:
   {
       type: String,
       required: true,
   },
   program:
   {
    type:String,
    required:true,
   },
   semester:
   {
       type: String,
       required: true,
   },    
   year:
   {
       type: String,
       required: true,
   },
    coursecode:
    {
        type: String,
        unique:true,
        required: true,
    },
    coursename:
    {
        type : String,
        required: true,
    },
    
});

const course = mongoose.model('course', courseschema);
module.exports = course;