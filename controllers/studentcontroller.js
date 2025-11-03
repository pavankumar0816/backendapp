const Student = require("../models/Student");
const Event = require("../models/Event");
const Assessment = require("../models/Assessment");
const Cour = require("../models/Course");
const StudentAssessment = require("../models/StudentAssessment");

const StudentCourseMapping = require("../models/StudentCourseMapping");

const multer = require("multer");
const path = require("path");
const fs = require("fs");

const checkstudentlogin = async (request, response) => {
  try {
    const input = request.body;
    const student = await Student.findOne(input);
    response.json(student);
  } catch (error) {
    response.status(500).send(error.message);
  }
};

const studentprofile = async (request, response) => {
  try {
    const studentid = request.params.studentid;
    const student = await Student.findOne({ studentid });
    if (student) {
      response.json(student);
    } else {
      return response
        .status(200)
        .send("Student not found with the provided Student Id");
    }
  } catch (error) {
    response.status(500).send(error.message);
  }
};

const viewcourses = async (request, response) => {
  try {
    const courses = await Cour.find();
    if (courses.length == 0) {
      response.status(200).send("DATA NOT FOUND");
    } else {
      response.json(courses);
    }
  } catch (e) {
    response.status(500).send(e.message);
  }
};

const registerCourse = async (req, res) => {
  try {
    const courseCode = req.params.coursecode;

    // Find the course in the database based on the course code
    const course = await Cour.findOne({ coursecode: courseCode });

    if (!course) {
      return res.status(404).send("Course not found");
    }

    // Implement your registration logic here...
    // For example, you could associate the course with the student in another collection.

    res.send("Course Registered Successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const uploadstudentassessment = async (req, res) => {
  try {
    console.log("Received body:", req.body);
    console.log("Received file:", req.file);

    const { studentId, courseId, description, saveAs } = req.body;

    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }

    // ✅ Find student and course using Cour (not Course)
    const student =
      (await Student.findOne({ _id: studentId })) ||
      (await Student.findOne({ studentid: studentId }));

    const course =
      (await Cour.findOne({ _id: courseId })) ||
      (await Cour.findOne({ coursecode: courseId }));

    if (!student || !course) {
      return res.status(400).send("Invalid studentId or courseId");
    }

    // ✅ Create and save assessment
    const newAssessment = new StudentAssessment({
      student: student._id,
      courses: [course._id],
      file: req.file.filename,
      description,
      saveAs,
      uploadedBy: "student",
    });

    await newAssessment.save();
    console.log("Saved Assessment:", newAssessment);
    res.status(200).send("Assessment uploaded successfully");
  } catch (error) {
    console.error("Error uploading assessment:", error);
    res.status(500).send("Error uploading assessment");
  }
};

const studentassessmentfile = async (req, res) => {
  const filename = req.params.filename;
  const filepath = path.join(__dirname, "../media", filename);

  res.sendFile(filepath, (err) => {
    if (err) {
      console.error(err);
      res.status(404).send("File not found");
    }
  });
};

const displaycontent = async (req, res) => {
  try {
    const content = await Event.find();
    res.status(200).json(content);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const displaycontentfile = async (req, res) => {
  const filename = req.params.filename;
  const filepath = path.join(__dirname, "../media", filename);
  console.log(filepath);

  fs.readFile(filepath, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error reading image file");
    }

    const ext = path.extname(filename).toLowerCase();
    let contentFile = "application/octet-stream"; // Default to octet-stream (binary data)

    if (ext === ".png") {
      contentType = "image/png";
    } else if (ext === ".jpg" || ext === ".jpeg") {
      contentType = "image/jpeg";
    } else if (ext === ".pdf") {
      contentType = "application/pdf";
    } else if (ext === ".txt") {
      contentType = "text/plain";
    }

    res.setHeader("Content-Type", contentFile);
    res.send(data);
  });
};

const viewassessment = async (req, res) => {
  try {
    const assessment = await Assessment.find();
    res.status(200).json(assessment);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const viewStudentMappedCourses = async (request, response) => {
  try {
    const mappings = await StudentCourseMapping.find();

    if (mappings.length === 0) {
      return response.status(404).json({ message: "No mapped courses found" });
    }

    let mappedCourses = [];

    for (let mapping of mappings) {
      const course = await Cour.findOne({ coursecode: mapping.coursecode });

      if (course) {
        mappedCourses.push({
          studentId: mapping.studentid,
          course,
        });
      }
    }

    response.json(mappedCourses);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

module.exports = {
  checkstudentlogin,
  studentprofile,
  viewcourses,
  registerCourse,
  displaycontent,
  displaycontentfile,
  viewassessment,
  studentassessmentfile,
  viewStudentMappedCourses,
  uploadstudentassessment,
};
