const Course = require("../models/Course");
const Faculty = require("../models/Faculty");
const Student = require("../models/Student");
const Admin = require("../models/Admin");

const FacultyCourseMapping = require("../models/FacultyCourseMapping");
const FacultyStudentMapping = require("../models/FacultyStudentMapping");

const checkadminlogin = async (request, response) => {
  try {
    const input = request.body;
    console.log(input);
    const admin = await Admin.findOne(input);
    response.json(admin);
  } catch (error) {
    response.status(500).send(error.message);
  }
};

const changeadminpwd = async (request, response) => {
  try {
    const { username, oldpassword, newpassword } = request.body;

    const admin = await Admin.findOne({ username, password: oldpassword });

    if (!admin) {
      response.status(400).send("Invalid Old Password");
    } else {
      if (oldpassword == newpassword) {
        response.status(400).send("Both Passwords are Same");
      } else {
        await Admin.updateOne(
          { username },
          { $set: { password: newpassword } },
        );
        response.json("Password Updated Successfully");
      }
    }
  } catch (error) {
    response.status(500).send(error.message);
  }
};

const countData = async (req, res) => {
  try {
    const studentCount = await Student.countDocuments();
    const courseCount = await Course.countDocuments();
    const facultyCount = await Faculty.countDocuments();

    res.json({
      studentCount,
      courseCount,
      facultyCount,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const addstudent = async (request, response) => {
  try {
    const input = request.body;
    const student = new Student(input);
    await student.save();
    response.send("Student Added Successfully");
  } catch (e) {
    response.status(500).send(e.message);
  }
};

const viewstudent = async (request, response) => {
  try {
    const student = await Student.find();
    if (student.length == 0) {
      response.send("Students NOT FOUND");
    } else {
      response.json(student);
    }
  } catch (e) {
    response.status(500).send(e.message);
  }
};

const deletestudent = async (request, response) => {
  try {
    const studentid = request.params.studentid; // params is an object inside request that holds route parameters (values you pass in the URL).
    const student = await Student.findOne({ studentid: studentid });
    if (student != null) {
      await Student.deleteOne({ studentid: studentid });
      response.send("Student Deleted Successfully");
    } else {
      response.send("Student Id   Not Found");
    }
  } catch (e) {
    response.status(500).send(e.message);
  }
};

const updatestudent = async (req, res) => {
  try {
    const input = req.body;
    const studentid = input.studentid;
    const student = await Student.findOne({ studentid });

    if (!student) {
      return res
        .status(404)
        .send("Student not found with the provided student id");
    }
    for (const key in input) {
      if (key !== "studentid" && input[key] !== undefined) {
        student[key] = input[key];
      }
    }

    await student.save();

    res.status(200).send("Student Data Updated Successfully");
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const addcourse = async (request, response) => {
  try {
    const input = request.body;
    const course = new Course(input);
    await course.save();
    response.send("Courses Added Successfully");
  } catch (e) {
    response.status(500).send(e.message);
  }
};

const viewcourses = async (request, response) => {
  try {
    const courses = await Course.find();
    if (courses.length == 0) {
      response.send("Courses Not Found");
    } else {
      response.json(courses);
    }
  } catch (error) {
    response.status(500).send(error.message);
  }
};

const deletecourse = async (request, response) => {
  try {
    const coursecode = request.params.coursecode;
    const course = await Course.findOne({ coursecode: coursecode });
    if (course != null) {
      await Course.deleteOne({ coursecode: coursecode });
      response.send("Course Deleted Successfully");
    } else {
      response.send("Course Code   Not Found");
    }
  } catch (e) {
    response.status(500).send(e.message);
  }
};

const updatecourse = async (req, res) => {
  try {
    const input = req.body;
    const coursecode = input.coursecode;
    const course = await Course.findOne({ coursecode });

    if (!course) {
      return res
        .status(404)
        .send("Course not found with the provided Course Code");
    }

    for (const key in input) {
      if (key !== "coursecode" && input[key] !== undefined) {
        course[key] = input[key];
      }
    }

    await course.save();
    res.status(200).send("Course Data Updated Successfully");
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const addfaculty = async (request, response) => {
  try {
    const input = request.body;
    const faculty = new Faculty(input);
    await faculty.save();
    response.send("Faculty Added Successfully");
  } catch (e) {
    response.status(500).send(e.message);
  }
};

const viewfaculty = async (request, response) => {
  try {
    const faculty = await Faculty.find();
    if (faculty.length == 0) {
      response.send("Faculties NOT FOUND");
    } else {
      response.json(faculty);
    }
  } catch (e) {
    response.status(500).send(e.message);
  }
};

const deletefaculty = async (request, response) => {
  try {
    const facultyid = request.params.facultyid;
    const faculty = await Faculty.findOne({ facultyid: facultyid });
    if (faculty != null) {
      await Faculty.deleteOne({ facultyid: facultyid });
      response.send("Faculty Deleted Successfully");
    } else {
      response.send("Faculty Code   Not Found");
    }
  } catch (e) {
    response.status(500).send(e.message);
  }
};

const updatefaculty = async (req, res) => {
  try {
    const input = req.body;
    const facultyid = input.facultyid;
    const faculty = await Faculty.findOne({ facultyid });

    if (!faculty) {
      return res
        .status(404)
        .send("Faculty not found with the provided Faculty ID");
    }
    for (const key in input) {
      if (key !== "facultyid" && input[key] !== undefined) {
        faculty[key] = input[key];
      }
    }

    await faculty.save();

    res.status(200).send("Faculty Data Updated Successfully");
  } catch (e) {
    res.status(500).send(e.message);
  }
};

//FacultyCourseMap

const mapFacultyCourse = async (request, response) => {
  try {
    const { facultyid, coursecode } = request.body;

    // Validate input
    if (!facultyid || !coursecode) {
      return response
        .status(400)
        .json({ message: "Faculty ID and Course Code are required" });
    }

    // Step 1: Find the Faculty by facultyid
    const faculty = await Faculty.findOne({ facultyid: facultyid });
    if (!faculty) {
      return response.status(404).json({ message: "Faculty not found" });
    }

    // Step 2: Find the Course by coursecode
    const course = await Course.findOne({ coursecode: coursecode });
    if (!course) {
      return response.status(404).json({ message: "Course not found" });
    }

    // Step 3: Check if the mapping already exists
    const existingMapping = await FacultyCourseMapping.findOne({
      faculty: faculty._id,
      course: course._id,
    });

    if (existingMapping) {
      return response.status(409).json({ message: "Mapping already exists" }); // Conflict
    }

    // Step 4: Create new mapping
    const newMapping = new FacultyCourseMapping({
      faculty: faculty._id,
      course: course._id,
    });

    await newMapping.save();

    return response
      .status(201)
      .json({ message: "Mapping created successfully" });
  } catch (error) {
    console.error("❌ Backend Error:", error);
    return response
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

const mapFacultyStudent = async (req, res) => {
  try {
    const { facultyid, studentid } = req.body;

    if (!facultyid || !studentid) {
      return res
        .status(400)
        .json({ message: "Faculty ID and Student ID are required" });
    }

    const faculty = await Faculty.findOne({ facultyid: facultyid });
    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    const student = await Student.findOne({ studentid: studentid });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const existingMapping = await FacultyStudentMapping.findOne({
      faculty: faculty._id,
      student: student._id,
    });

    if (existingMapping) {
      return res.status(409).json({ message: "Mapping already exists" });
    }

    const newMapping = new FacultyStudentMapping({
      faculty: faculty._id,
      student: student._id,
    });

    await newMapping.save();
    return res.status(201).json({ message: "Mapping created successfully" });
  } catch (e) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  checkadminlogin,
  changeadminpwd,
  countData,
  addstudent,
  viewstudent,
  deletestudent,
  updatestudent,
  addcourse,
  viewcourses,
  deletecourse,
  updatecourse,
  addfaculty,
  viewfaculty,
  deletefaculty,
  updatefaculty,
  mapFacultyCourse,
  mapFacultyStudent,
};
