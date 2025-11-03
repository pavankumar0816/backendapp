const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

//const dburl = "mongodb://localhost:27017/lmsproject"
// const dburl = process.env.mongodburl;
// mongoose
//   .connect(dburl)
//   .then(() => {
//     console.log("Connected to DB Successfully");
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

// MongoDb Atlas Connection
const dburl = process.env.MONGO_URI;
mongoose.connect(dburl).then(() => {
    console.log("Connected to MongoDb Atlas Successfully")
}).catch((err) => {
    console.log(err.message)
})

const app = express();
app.use(cors());
app.use(express.json());

const adminrouter = require("./routes/adminroutes");
const studentrouter = require("./routes/studentroutes");
const facultyrouter = require("./routes/facultyroutes");

app.use("", adminrouter);
app.use("", studentrouter);
app.use("", facultyrouter);

const port = process.env.PORT || 2024;
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
