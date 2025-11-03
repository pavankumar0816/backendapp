**Student Learning Management System** - Backend This is the **Backend** of the **Student Learning Management System (LMS)**, built using **Node.js**, **Express.js**, and **MongoDB**. It provides RESTful APIs to handle authentication, user and course management, file uploads, and data retrieval for Admin, Student, and Faculty roles.

**Brief Overview of MongoDB, Node.js, and Express.js:-**

**MongoDB:** A NoSQL database that stores data in flexible, JSON-like documents. It’s great for handling large amounts of diverse data and allows easy scaling.

**Node.js:** A JavaScript runtime environment that lets you run JavaScript code on the server side. It’s fast and efficient for building scalable network applications.

**Express.js:** A lightweight web framework for Node.js that simplifies building web servers and APIs by providing useful features and middleware.

**Project Structure** (https://github.com/user-attachments/assets/d0ed112d-118b-48ba-8f5f-d62c35c4de0f)

**backend/**

**controllers/:** Business logic separated by roles
**models/:** Mongoose schemas
**routes/:** Express route handlers
**media/:** Folder for uploaded files (assignments, content)
**.env:** Environment variables (MongoDB URL, PORT)
**Server.js:** Main server entry point

Environment Variables (.env) mongodburl=mongodb://localhost:27017/lmsproject PORT=2024

**Server.js overview:**

Connects to MongoDB using the URL from .env Sets up middleware (cors, express.json) Loads routers for admin, student, and faculty APIs Listens on port specified in .env (default 2024)

**Start the Server**: nodemon Server.js
