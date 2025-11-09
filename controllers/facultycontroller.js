const Faculty = require("../models/Faculty");
const Cour = require("../models/Course");
const Event = require("../models/Event");
const Assessment = require("../models/Assessment");

const StudentAssessment = require("../models/StudentAssessment");

const FacultyCourseMapping = require("../models/FacultyCourseMapping");
const FacultyStudentMapping = require("../models/FacultyStudentMapping");

const multer = require("multer");
const path = require("path");
const fs = require("fs");

const checkfacultylogin = async (request, response) => {
  try {
    const input = request.body;
    const faculty = await Faculty.findOne(input);
    response.json(faculty);
  } catch (error) {
    response.status(500).send(error.message);
  }
};

const facultyprofile = async (request, response) => {
  try {
    const facultyid = request.params.facultyid;
    const faculty = await Student.findOne({ facultyid });
    if (faculty) {
      response.json(faculty);
    } else {
      return response
        .status(200)
        .send("Faculty not found with the provided Faculty Id");
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

const viewMappedCourses = async (req, res) => {
  try {
    const { facultyid } = req.params;

    if (!facultyid) {
      return res.status(400).json({ message: "Faculty ID is required" });
    }

    const faculty = await Faculty.findOne({ facultyid });
    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    const mappedCourses = await FacultyCourseMapping.find({
      faculty: faculty._id,
    }).populate({
      path: "course",
      select: "coursename coursecode",
    });

    if (!mappedCourses.length) {
      return res
        .status(404)
        .json({ message: "No courses mapped for this faculty" });
    }

    const courses = mappedCourses
      .map((mapping) => mapping.course)
      .filter((course) => course != null);

    if (!courses.length) {
      return res.status(404).json({ message: "No valid courses found" });
    }

    res.status(200).json({ mappedCourses: courses });
  } catch (err) {
    console.error("Error in viewMappedCourses:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

const viewMappedStudents = async (request, response) => {
  try {
    const { facultyid } = request.params;

    if (!facultyid) {
      return response.status(400).json({ message: "Faculty ID is required" });
    }

    const faculty = await Faculty.findOne({ facultyid });
    if (!faculty) {
      return response.status(404).json({ message: "Faculty not found" });
    }

    const mappedStudents = await FacultyStudentMapping.find({
      faculty: faculty._id,
    }).populate("student");

    const students = mappedStudents.map((mapping) => mapping.student);

    // Return 200 always, even if no mapped students
    return response.status(200).json({ mappedStudents: students });
  } catch (e) {
    return response
      .status(500)
      .json({ message: "Server Error", error: e.message });
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./media/"); // Destination folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // File naming convention
  },
});

const upload = multer({ storage: storage }).single("file");

const uploadcontent = async (req, res) => {
  try {
    upload(req, res, async function (err) {
      if (err) {
        console.error(err);
        return res.status(500).send(err.message);
      }

      const { course, topic, description, date } = req.body;
      const fileName = req.file ? req.file.filename : undefined; // Extracting file name

      const newContent = new Event({
        course,
        topic,
        description,
        date,
        file: fileName, // Save only the file name
      });

      await newContent.save();
      res.status(200).send("Content Uploaded Successfully");
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const viewcontent = async (req, res) => {
  try {
    const content = await Event.find();
    res.status(200).json(content);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const contentfile = async (req, res) => {
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

const uploadassessment = async (req, res) => {
  try {
    upload(req, res, async function (err) {
      if (err) {
        console.error(err);
        return res.status(500).send(err.message);
      }

      const { course, description, date } = req.body;
      const fileName = req.file ? req.file.filename : undefined; // Extracting file name

      const newAssessment = new Assessment({
        course,
        description,
        date,
        file: fileName, // Save only the file name
      });

      await newAssessment.save();
      res.status(200).send("Assessment Uploaded Successfully");
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const assessmentfile = async (req, res) => {
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

const viewStudentAssessment = async (req, res) => {
  try {
    // Populate student & course details
    const assessments = await StudentAssessment.find()
      .populate("student", "studentid studentname") // Only these fields from Student .populate() joins data from another collection — just like a foreign key join in SQL, but in MongoDB style.
      .populate("courses", "coursecode coursename"); // Only these from Course

    res.status(200).json(assessments);
  } catch (error) {
    console.error("Error fetching student assessments:", error);
    res.status(500).send("Error fetching student assessments");
  }
};

const viewstudentassessmentfile = async (req, res) => {
  const filename = req.params.filename;
  const filepath = path.join(__dirname, "../media", filename);
  console.log(filepath);

  fs.readFile(filepath, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error reading file");
    }

    const ext = path.extname(filename).toLowerCase();
    let contentType = "application/octet-stream";

    if (ext === ".png") {
      contentType = "image/png";
    } else if (ext === ".jpg" || ext === ".jpeg") {
      contentType = "image/jpeg";
    } else if (ext === ".pdf") {
      contentType = "application/pdf";
    } else if (ext === ".txt") {
      contentType = "text/plain";
    } else if (ext === ".doc" || ext === ".docx") {
      contentType =
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    }

    res.setHeader("Content-Type", contentType);
    res.send(data);
  });
};

module.exports = {
  checkfacultylogin,
  facultyprofile,
  viewcourses,
  uploadcontent,
  viewcontent,
  contentfile,
  uploadassessment,
  assessmentfile,
  viewMappedCourses,
  viewMappedStudents,
  viewStudentAssessment,
  viewstudentassessmentfile,
};
