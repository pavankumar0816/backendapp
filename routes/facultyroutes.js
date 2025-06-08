// faculty routes

const facultycontroller = require("../controllers/facultycontroller");

const express = require("express");
const facultyrouter = express.Router();

facultyrouter.post("/checkfacultylogin", facultycontroller.checkfacultylogin);
facultyrouter.get(
  "/facultyprofile/:facultyid",
  facultycontroller.facultyprofile,
);

facultyrouter.get("/viewcourses", facultycontroller.viewcourses);

facultyrouter.post("/uploadcontent", facultycontroller.uploadcontent);
// facultyrouter.get("/viewcontent",facultycontroller.viewcontent)
// facultyrouter.get("/contentfile/:filename",facultycontroller.contentfile)

facultyrouter.post("/uploadassessment", facultycontroller.uploadassessment);

facultyrouter.get(
  "/viewmappedcourses/:facultyid",
  facultycontroller.viewMappedCourses,
);

facultyrouter.get(
  "/viewstudentassessment",
  facultycontroller.viewstudentassessment,
);
facultyrouter.get(
  "/viewstudentassessmentfile/:filename",
  facultycontroller.viewstudentassessmentfile,
);

module.exports = facultyrouter;
