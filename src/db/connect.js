const mongoose = require("mongoose");
const connect = async () => {
  try {
    const uri =
      "mongodb+srv://aayushgupta023:Ayush%4012345@cluster0.bdrwh70.mongodb.net/course?retryWrites=true&w=majority";
    await mongoose.connect(uri);
    console.log("Database Connected Succesfully");
  } catch {
    throw new Error("Database could not be connected");
  }
};
connect().catch((err) => console.log(err));
