const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const AVATAR_PATH = "/uploads/instructor";
//since instructor is a different entity from the course, so we have to make different schema of it and use it as a foreign key in course schema
const instructorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: {
    type: String,
  },
  linkedin: {
    type: String,
  },
  university: {
    type: String,
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "courseModel",
    },
  ],
  password: {
    type: String,
    required: true,
  },
});

//manually configured diskStorage, in a way, that we have provided a name to the file also.
/*
if we dont want to give a name to the file.. we can only use
const upload = multer({dest:"path"});
*/
const STORAGE = multer.diskStorage({
  //providing the path of the folder where files needed to be stored
  destination: function (req, file, cb) {
    //cb takes 2 arg
    /*
        1. error
        2. path
        */
    cb(null, path.join(__dirname, "..", AVATAR_PATH));
  },
  //providing the name to the file
  filename: function (req, file, cb) {
    //cb takes 2 arg
    /*
        1. error
        2. filename
        */
    cb(null, file.fieldname + "-" + Date.now());
  },
});
//static methods attached to instructor schema
instructorSchema.statics.uploadedAvatar = multer({ storage: STORAGE }).single(
  "avatar"
);
instructorSchema.statics.avatarPath = AVATAR_PATH;

const instructorModel = mongoose.model("instructorModel", instructorSchema);

module.exports = instructorModel;
