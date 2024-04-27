// const courses = require('../models/Course');
// const express = require("express")
// const courserouter  = express.Router()
// const csvtojson = require('csvtojson')
// const multer = require('multer');

// // Add the data 
// courserouter.post('/',async(request,response)=>{
//     try
//     {
//         const course = new courses(request.body);
//         await course.save();
//         response.status(200).json(course);
//     }
//     catch(e)
//     {
//         response.status(400).json({message:e.message})
//     }
// });

// // get all the data 

// courserouter.get('/',async (request,response)=>{
//     try
//     {
//         const course = await courses.find();
//         response.json(course); 
//     }
//     catch(e)
//     {
//         response.status(400).json({message:e.message})
//     }
// })


// // get by ID
// async function getCourses(request,response,next)
// {
//     let course;
//     try
//     {
//         course = await courses.findById(request.params.id);
//         if(course==null)
//       {
//         return response.status(404).json({message:"Record Not Found"})
//       }
//     }
//     catch(e)
//     {
//         return response.status(400).json({message:e.message})
//     }
//     response.course=course;
//     next();
// }

// courserouter.get('/:id',getCourses,async(request,response)=>{
//    response.json(response.course)
// })

// // Update by Id

// courserouter.put('/:id', getCourses,async(request,response)=>{
//     if(request.body.coursecode!=null)
//     {
//         response.course.coursecode = request.body.coursecode;
//     }
//     if(request.body.coursename!=null)
//     {
//         response.course.coursename = request.body.coursename;
//     }
//     if(request.body.year!=null)
//     {
//         response.course.year = request.body.year;
//     }

//     try
//     {
//         const updatedcourse = await response.courses.save()
//         response.json(updatedcourse)
//     }
//     catch(e)
//     {
//      response.status(400).json({message:e.message})
//     }
// })

// // delete bt Id

// courserouter.delete('/:id',getCourses,async (request,response)=>{
//     try
//     {
//         await response.course.deleteOne();
//          response.json({message:"Course is deleted successfully"})
//     }
//     catch(e)
//     {
//         response.status(400).json({message:e.message})
//     }
// })

// // uploading

// const storage = multer.memoryStorage();
// const upload = multer({storage:storage})
// courserouter.post('/upload',upload.single('file'), async(request,response)=>{
//     if(!request.file)
//     {
//         return response.status(400).json('No File Uploaded');
//     }
//     try
//     {
//         const jsonarray = await csvtojson().fromString(request.file.buffer.toString())
//         await courses.insertMany(jsonarray);
//         response.json({message:"CSV File Uploaded Successfully"})
//     }
//     catch(e)
//     {
//         return response.status(500).json({error:e.message});

//     }
// })

// module.exports = courserouter

