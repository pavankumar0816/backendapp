const Student = require("../models/Student")
const Event = require("../models/Event")
const Assessment = require("../models/Assessment")
const Cour = require("../models/Course")
const StudentAssessment = require("../models/StudentAssessment")

const StudentCourseMapping = require("../models/StudentCourseMapping");

const multer = require('multer')
const path = require('path')
const fs = require('fs')


const checkstudentlogin = async (request, response) => 
{
   try 
   {
     const input = request.body
     const student = await Student.findOne(input)
     response.json(student)
   } 
   catch (error) 
   {
     response.status(500).send(error.message);
   }
 };

 const studentprofile = async (request, response) => 
 {
    try 
    {
      const studentid = request.params.studentid
      const student = await Student.findOne({studentid})
      if(student)
      {
        response.json(student)
      }
      else
      {
        return response.status(200).send('Student not found with the provided Student Id');
      }
      
    } 
    catch (error) 
    {
      response.status(500).send(error.message);
    }
  };

 const viewcourses = async(request,response) =>
{
  try
  {
     const courses = await Cour.find();
     if(courses.length==0)
     {
      response.status(200).send("DATA NOT FOUND");
     }
     else
     {
      response.json(courses);
     }
  }
  catch(e)
  {
     response.status(500).send(e.message);
  }
};

const registerCourse = async (req, res) => {
  try {
    const courseCode = req.params.coursecode;
    
    // Find the course in the database based on the course code
    const course = await Cour.findOne({ coursecode: courseCode });
    
    if (!course) {
      return res.status(404).send('Course not found');
    }

    // Implement your registration logic here...
    // For example, you could associate the course with the student in another collection.

    res.send('Course Registered Successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

 const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './media/'); // Destination folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // File naming convention
  }
});

const upload = multer({ storage: storage }).single('file');

const uploadassessment = async(req,res) =>{
  try 
  {
    upload(req, res, async function (err) 
    {
      if (err) 
      {
        console.error(err);
        return res.status(500).send(err.message);
      }
      
      
      const fileName = req.file ? req.file.filename : undefined; // Extracting file name

      const newContent = new StudentAssessment({
        file: fileName // Save only the file name
      });

      await newContent.save();
      res.status(200).send('Assessment Uploaded Successfully');
    });
  } 
  catch (error) 
  {
    console.error(error);
    res.status(500).send(error.message);
  }
};


 const viewcontent = async (req, res) => 
{
  try 
  {
    const content = await Event.find();
    res.status(200).json(content);
  } 
  catch (error) 
  {
    res.status(500).send(error.message);
  }
};

const contentfile = async (req, res) => 
{
  const filename = req.params.filename;
  const filepath = path.join(__dirname, '../media', filename);
  console.log(filepath)

    fs.readFile(filepath, (err, data) => {
      if (err) 
      {
        console.error(err);
        return res.status(500).send('Error reading image file');
      }
     
    const ext = path.extname(filename).toLowerCase();
    let contentFile = 'application/octet-stream'; // Default to octet-stream (binary data)

if (ext === '.png') {
  contentType = 'image/png';
} else if (ext === '.jpg' || ext === '.jpeg') {
  contentType = 'image/jpeg';
} else if (ext === '.pdf') {
  contentType = 'application/pdf';
} else if (ext === '.txt') {
  contentType = 'text/plain';
}

    res.setHeader('Content-Type', contentFile);
      res.send(data);
    })
}

const viewassessment = async (req, res) => 
{
  try 
  {
    const assessment = await Assessment.find();
    res.status(200).json(assessment);
  } 
  catch (error) 
  {
    res.status(500).send(error.message);
  }
};

const assessmentfile = async (req, res) => 
{
  const filename = req.params.filename;
  const filepath = path.join(__dirname, '../media', filename);
  console.log(filepath)

    fs.readFile(filepath, (err, data) => {
      if (err) 
      {
        console.error(err);
        return res.status(500).send('Error reading image file');
      }
     
    const ext = path.extname(filename).toLowerCase();
    let contentFile = 'application/octet-stream'; // Default to octet-stream (binary data)

if (ext === '.png') {
  contentType = 'image/png';
} else if (ext === '.jpg' || ext === '.jpeg') {
  contentType = 'image/jpeg';
} else if (ext === '.pdf') {
  contentType = 'application/pdf';
} else if (ext === '.txt') {
  contentType = 'text/plain';
}

    res.setHeader('Content-Type', contentFile);
      res.send(data);
    })
}

const viewStudentMappedCourses = async (request, response) => {
  try {

      const mappings = await StudentCourseMapping.find();

      if (mappings.length === 0) {
          return response.status(404).json({ message: 'No mapped courses found' });
      }

      let mappedCourses = [];

      for (let mapping of mappings) {
          
          const course = await Cour.findOne({ coursecode: mapping.coursecode });

          if (course) {
              mappedCourses.push({
                  studentId: mapping.studentid,
                  course
              });
          }
      }

      response.json(mappedCourses);
  } catch (error) {
      response.status(500).json({ message: error.message });
  }
};



 module.exports = {checkstudentlogin,studentprofile,viewcourses,registerCourse,viewcontent,contentfile,viewassessment,assessmentfile,viewStudentMappedCourses,uploadassessment}