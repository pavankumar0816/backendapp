const admincontroller = require("../controllers/admincontroller")

const express = require("express")
const adminrouter = express.Router()

adminrouter.post("/checkadminlogin",admincontroller.checkadminlogin)   
adminrouter.put("/changeadminpwd",admincontroller.changeadminpwd)
adminrouter.get("/count",admincontroller.countData)

adminrouter.post("/addstudent",admincontroller.addstudent)
adminrouter.get("/viewstudent",admincontroller.viewstudent)
adminrouter.delete("/deletestudent/:studentid",admincontroller.deletestudent)
adminrouter.put("/updatestudent",admincontroller.updatestudent)

adminrouter.post("/addcourse",admincontroller.addcourse)
adminrouter.get("/viewcourses",admincontroller.viewcourses)
adminrouter.delete("/deletecourse/:coursecode",admincontroller.deletecourse)
adminrouter.put("/updatecourse",admincontroller.updatecourse)

adminrouter.post("/addfaculty",admincontroller.addfaculty)
adminrouter.get("/viewfaculty",admincontroller.viewfaculty)
adminrouter.delete("/deletefaculty/:facultyid",admincontroller.deletefaculty)
adminrouter.put("/updatefaculty",admincontroller.updatefaculty)

adminrouter.post("/facultycoursemapping",admincontroller.mapFacultyCourse)
// adminrouter.post("/studentcoursemapping",admincontroller.mapStudentCourse)

 

module.exports = adminrouter