const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const AVATAR_PATH = "/uploads/course";

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "instructorModel",
    },
    duration: {
      //in hours
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    eligibility: {
      type: String,
      required: true,
    },
    avatar: {
      //course avatar
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
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
courseSchema.statics.uploadedAvatar = multer({ storage: STORAGE }).single(
  "avatar"
);
courseSchema.statics.avatarPath = AVATAR_PATH;

const courseModel = mongoose.model("courseModel", courseSchema);

module.exports = courseModel;
