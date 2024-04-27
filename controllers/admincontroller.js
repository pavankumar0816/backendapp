const Course = require("../models/Course")
const Faculty = require("../models/Faculty")
const Student = require("../models/Student")
const Admin = require("../models/Admin")



const FacultyCourseMapping = require("../models/FacultyCourseMapping")
const StudentCourseMapping = require("../models/StudentCourseMapping")


     

const checkadminlogin = async (request, response) => 
{
   try 
   {
     const input = request.body
     console.log(input)
     const admin = await Admin.findOne(input)
     response.json(admin)
   } 
   catch (error) 
   {
     response.status(500).send(error.message);
   }
 };

 const changeadminpwd = async (request, response) => {
     try 
     {
       const { username, oldpassword, newpassword } = request.body;
 
       const admin = await Admin.findOne({ username, password: oldpassword });
       
        if (!admin) 
       {
         response.status(400).send('Invalid Old Password');
       }
       else
       {
           if(oldpassword==newpassword)
           {
             response.status(400).send('Both Passwords are Same');
           }
           else
           {
             await Admin.updateOne({username},{ $set: { password: newpassword } });
              response.json('Password Updated Successfully');
           }
         
       }
     } 
     catch (error) 
     {
       response.status(500).send(error.message);
     }
   };
   
 const addstudent = async (request, response) =>{
     try
     {
          const input = request.body;
          const student = new Student(input);
          await student.save();
          response.send('Student Added Successfully')
     }
     catch(e)
     {
           response.status(500).send(e.message)
     }
};

const viewstudent = async (request, response) =>{
     try
     {
          const student = await Student.find();
          if(student.length==0)
          {
               response.send("Students NOT FOUND")
          }
          else
          {
               response.json(student)
          }
     }
     catch(e)
     {
          response.status(500).send(e.message)
     }
};

const deletestudent = async (request,response) =>{
     try
     {
          const studentid = request.params.studentid
          const student  = await Student.findOne({"studentid":studentid})
          if(student!=null)
          {
               await Student.deleteOne({"studentid":studentid})
               response.send("Student Deleted Successfully")
          }
          else
          {
               response.send("Student Id   Not Found")
          }
     }
     catch(e)
     {
          response.status(500).send(e.message);
     }
};

const updatestudent = async (req,res) =>
{
     try
     {
        const input = request.body;
        const studentid = input.studentid;
        const student = await Student.findOne({ studentid })
        if(!student)
        {
          response.status(200).send('Student not found with the provided student id')
        }
        for( const key in input)
        {
          if(key !=='studentid' && input[key])
          {
               student[key] = input[key];
          }
        }
        await student.save();
        response.status(200).send('Student Data Updated Successfully')
     }
     catch(e)
     {
          response.status(500).send(e.message);
     }
}
 

const addcourse = async(request,response) =>{
     try
  {
    const input = request.body;
    const course = new Course(input);
    await course.save();
    response.send('Courses Added Successfully')
  }
  catch(e)
  {
     response.status(500).send(e.message);
  }
   
};

const viewcourses = async (request,response) =>{
     try
     {
          const courses = await Course.find();
          if(courses.length==0)
          {
               response.send("Courses Not Found")
          }
          else
          {
               response.json(courses);
          }

     }
     catch(error)
     {
           response.status(500).send(error.message)
     }
}
 
    

const deletecourse = async (request,response) =>{
     try
     {
          const coursecode = request.params.coursecode
          const course = await Course.findOne({"coursecode":coursecode})
          if(course!=null)
          {
               await Course.deleteOne({"coursecode":coursecode})
               response.send("Course Deleted Successfully")
          }
          else
          {
               response.send("Course Code   Not Found")
          }
     }
     catch(e)
     {
          response.status(500).send(e.message);
     }
};

const addfaculty = async (request, response) =>{
     try
     {
          const input = request.body;
          const faculty = new Faculty(input);
          await faculty.save();
          response.send('Faculty Added Successfully')
     }
     catch(e)
     {
           response.status(500).send(e.message)
     }
}

const viewfaculty = async (request, response) =>{
     try
     {
          const faculty = await Faculty.find();
          if(faculty.length==0)
          {
               response.send("Faculties NOT FOUND")
          }
          else
          {
               response.json(faculty)
          }
     }
     catch(e)
     {
          response.status(500).send(e.message)
     }
};


const deletefaculty = async (request,response) =>{
     try
     {
          const facultyid = request.params.facultyid
          const faculty = await Faculty.findOne({"facultyid":facultyid})
          if(faculty!=null)
          {
               await Faculty.deleteOne({"facultyid":facultyid})
               response.send("Faculty Deleted Successfully")
          }
          else
          {
               response.send("Faculty Code   Not Found")
          }
     }
     catch(e)
     {
          response.status(500).send(e.message);
     }
};

//FacultyCourseMap
const mapFacultyCourse = async (request, response) => {
     const { facultyid, coursecode } = request.body;  
     try {
         // Check if the mapping already exists
         const existingMapping = await FacultyCourseMapping.findOne({ facultyid, coursecode });
         if (existingMapping) {
             return response.status(200).json({ message: 'Mapping already exists' });
         }
 
         // Create a new mapping
         const newMapping = new FacultyCourseMapping({ facultyid, coursecode });
         await newMapping.save();
 
         response.status(201).json({ message: 'Mapping created successfully' });
     } catch (error) {
         response.status(500).json({ message: error.message });
     }
 };

 
 //StudentCourseMap
const mapStudentCourse = async (request, response) => {
     const { studentid, coursecode } = request.body;  
     try {
         // Check if the mapping already exists
         const existingMapping = await StudentCourseMapping.findOne({ studentid, coursecode });
         if (existingMapping) {
             return response.status(200).json({ message: 'Mapping already exists' });
         }
 
         // Create a new mapping
         const newMapping = new StudentCourseMapping({ studentid, coursecode });
         await newMapping.save();
 
         response.status(201).json({ message: 'Mapping created successfully' });
     } catch (error) {
         response.status(500).json({ message: error.message });
     }
 };

//  const analysis = async (req, res) => {
//      try 
//      {
//          const student = await Student.countDocuments();
//          const faculty = await Faculty.countDocuments();
//          const course = await Course.countDocuments();
//          res.json({student,faculty,course});
//      } 
//      catch (error) 
//      {
//          res.status(500).send(error.message);
//      }
//    };   

module.exports = {checkadminlogin,changeadminpwd,addstudent,viewstudent,deletestudent,updatestudent,addcourse,viewcourses,deletecourse,addfaculty,viewfaculty,deletefaculty,mapFacultyCourse,mapStudentCourse}