const Faculty = require("../models/Faculty")
const Cour = require("../models/Course")
const Event = require("../models/Event")
const Assessment = require("../models/Assessment")

const StudentAssessment = require("../models/StudentAssessment")

const FacultyCourseMapping = require("../models/FacultyCourseMapping")


const multer = require('multer')
const path = require('path')
const fs = require('fs')

const checkfacultylogin = async(request, response) =>
{
   try
   {
      const input = request.body
      const faculty = await Faculty.findOne(input)
      response.json(faculty)
   }
   catch(error)
   {
       response.status(500).send(error.message)
   }
};

const facultyprofile = async (request, response) => 
{
   try 
   {
     const facultyid = request.params.facultyid
     const faculty = await Student.findOne({facultyid})
     if(faculty)
     {
       response.json(faculty)
     }
     else
     {
       return response.status(200).send('Faculty not found with the provided Faculty Id');
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

const viewMappedCourses = async (request, response) => {
  try {
      // Find all mappings
      const mappings = await FacultyCourseMapping.find();

      // If no mappings found, return empty array
      if (mappings.length === 0) {
          return response.status(404).json({ message: 'No mapped courses found' });
      }

      // Array to store mapped courses
      let mappedCourses = [];

      // Iterate through mappings and fetch course information for each mapping
      for (let mapping of mappings) {
          // Find course details based on coursecode
          const course = await Cour.findOne({ coursecode: mapping.coursecode });

          // Add course details to mappedCourses array
          if (course) {
              mappedCourses.push({
                  facultyId: mapping.facultyid,
                  course
              });
          }
      }

      response.json(mappedCourses);
  } catch (error) {
      response.status(500).json({ message: error.message });
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

const uploadcontent = async(req,res) =>{
   try 
   {
     upload(req, res, async function (err) 
     {
       if (err) 
       {
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
         file: fileName // Save only the file name
       });
 
       await newContent.save();
       res.status(200).send('Content Uploaded Successfully');
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
      
      const { course, description, date} = req.body;
      const fileName = req.file ? req.file.filename : undefined; // Extracting file name

      const newAssessment = new Assessment({
        course,
         description,
         date,
         file: fileName // Save only the file name
      });

      await newAssessment.save();
      res.status(200).send('Assessment Uploaded Successfully');
    });
  } 
  catch (error) 
  {
    console.error(error);
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

const viewstudentassessment = async (req, res) => 
{
  try 
  {
    const studentassessment = await StudentAssessment.find();
    res.status(200).json(studentassessment);
  } 
  catch (error) 
  {
    res.status(500).send(error.message);
  }
};

const viewstudentassessmentfile = async (req, res) => 
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



module.exports = {checkfacultylogin,facultyprofile,viewcourses,uploadcontent,viewcontent,contentfile,uploadassessment,assessmentfile,viewMappedCourses,viewstudentassessment,viewstudentassessmentfile}