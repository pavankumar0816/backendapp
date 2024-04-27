const mongoose = require('mongoose')


const facultyschema = new mongoose.Schema({
    facultyid:{
        type: Number,
        unique:true,
        required: true,
    },
    facultyname:{
        type: String,
        required: true,
    },
    facultydept:{
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        default:"faculty"
      },
    qualification:{
        type: String,
        required: true,
    },
    designation:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
      },
      contact: {
        type: String,
        required: true,
        unique:true
      },

});

const faculty = mongoose.model('faculty', facultyschema);

module.exports = faculty;