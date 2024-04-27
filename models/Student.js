const mongoose = require('mongoose')


const studentschema = new mongoose.Schema({
    studentid: {
        type : Number,
        required : true,
        unique:true
    },
    password: {
        type: String,
        required: true,
        default:"student"
      },
  studentname :{
    type: String,
    required: true,
  },
  gender : {
    type : String,
    required : true,
    enum: ['male', 'female', 'others']
  },
  department :{
    type : String,
    required: true,
  },
  program :{
    type : String,
    required: true,
  },
  semester : {
    type : String,
    required: true,
  },
  year :{
    type :Number,
    required : true
  },

});

const student = mongoose.model('student', studentschema);

module.exports = student;