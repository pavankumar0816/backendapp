// student routes

const studentcontroller = require("../controllers/studentcontroller");

const express = require("express");
const student = require("../models/Student");
const studentrouter = express.Router();

studentrouter.post("/checkstudentlogin", studentcontroller.checkstudentlogin);
studentrouter.get(
  "/jobseekerprofile/:studentid",
  studentcontroller.studentprofile,
);

studentrouter.get("/viewcourses", studentcontroller.viewcourses);
studentrouter.post(
  "/registercourses/:coursecode",
  studentcontroller.registerCourse,
);

studentrouter.get("/viewcontent", studentcontroller.viewcontent);
studentrouter.get("/contentfile/:filename", studentcontroller.contentfile);

studentrouter.get("/viewassessment", studentcontroller.viewassessment);
studentrouter.get(
  "/assessmentfile/:filename",
  studentcontroller.assessmentfile,
);

studentrouter.get(
  "/viewstudentmappedcourses",
  studentcontroller.viewStudentMappedCourses,
);

studentrouter.post("/uploadassessment", studentcontroller.uploadassessment);

module.exports = studentrouter;
