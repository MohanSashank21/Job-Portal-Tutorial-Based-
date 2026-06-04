const mongoose = require('mongoose');

const connectDB = async () =>{
  try{
    console.log(process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI,{});
    console.log("MongoDB Connected");
  }
  catch(err){
    console.log("Error in connecting the MongoDB",err);
  }
}

module.exports = connectDB;