const mongoose = require("mongoose");

const adminschema = new mongoose.Schema({
  // mongoose.Schema in Mongoose is used to define the structure of the documents (like fields, types, validations, etc.) for a MongoDB collection.
  // it acts as a blueprint for your data
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const admin = mongoose.model("Admin", adminschema);

module.exports = admin;
