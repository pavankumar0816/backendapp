// student routes

const studentcontroller = require("../controllers/studentcontroller");

const express = require("express");
const multer = require("multer");
const studentrouter = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./media/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

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

studentrouter.get("/viewcontent", studentcontroller.displaycontent);
studentrouter.get(
  "/contentfile/:filename",
  studentcontroller.displaycontentfile,
);

studentrouter.get("/viewassessment", studentcontroller.viewassessment);
studentrouter.get(
  "/assessmentfile/:filename",
  studentcontroller.studentassessmentfile,
);

studentrouter.get(
  "/viewstudentmappedcourses",
  studentcontroller.viewStudentMappedCourses,
);

studentrouter.post(
  "/uploadstudentassessment",
  upload.single("file"),
  studentcontroller.uploadstudentassessment,
);

module.exports = studentrouter;
