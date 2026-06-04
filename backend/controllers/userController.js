const User = require("../models/User");
const path = require('path');
const fs = require('fs').promises;

// allowing user to update name, avatar,resume and companyDetails
exports.updateProfile = async (req ,res) =>{
  try{
  const {fullName,avatar,resume,role,companyName,companyDescription,companyLogo} = req.body;

    const user = await User.findById(req.user._id);

    if(!user){
      return res.status(404).json({message:"user not found"});
    }
    user.fullName = fullName || user.fullName;
    user.avatar = avatar || user.avatar;
    user.resume = resume || user.resume;
    user.role = role || user.role;
    
    // if employee update companydetails
    
    if(user.role === "employee"){
      user.companyName = companyName || user.companyName;
      user.companyDescription = companyDescription || user.companyDescription;
      user.companyLogo = companyLogo || user.companyLogo; 
    }

    await user.save();

    res.json({
      _id:user._id,
      fullName:user.fullName,
      avatar:user.avatar,
      role:user.role,
      resume:user.resume,
      companyName:user.companyName,
      compnyDescription:user.companyDescription,
      companyLogo:user.companyLogo
  });
  }
  catch(err){
    console.log(err);
    res.status(500).json({message:err.message});
  }
};

// delete resume file only by jobseeker
exports.deleteResume = async (req,res) =>{
  try{
    const {resumeURL} = req.body; // expect the resume url to be url of the resume

    const fileName = resumeURL?.split('/')?.pop(); // get the file name from the url usually exists at the last
    
    const user = await User.findById(req.user._id);

    if(!user){
      return res.status(404).json({message:"user doesn't exist"});
    }
    
    if(user.role!== "jobseeker"){
      return res.status(403).json({message:"only jobseeker can delete resume"});
    }

    // construct the file path

    const filePath = path.join(__dirname,"../uploads",fileName); // constructing the filePath;
    
    // delete the file if the the file exists if the file not exists it will go to catch block there if the file doesnt exists it wont throw any error if not it will throw ans error.

    try {
      console.log(filePath);
      await fs.unlink(filePath)
    }
    catch(err){
        if(err.code !== "ENOENT"){
          console.log(err);
          throw err;
        }
    }
  
    user.resume = '';
    await user.save();

    res.status(200).json({message:"resume succefully deleted"});

  }
  catch(err){
    console.log(err);
    res.status(500).json({message:err.message});
  }
}
// get user public profile
exports.getPublicProfile = async (req,res) =>{
  try{
    const user = await User.findById(req.params.id).select("-password");
    console.log(user);
    if(!user){
      return res.status(404).json({message:"user not found"});
    }

    res.json(user);
  }
  catch(err){
    console.log(err);
    res.status(500).json({message:err.message});
  }
}