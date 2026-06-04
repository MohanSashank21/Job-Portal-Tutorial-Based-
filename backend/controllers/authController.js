const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (id) =>{

  return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"60d"});

};

exports.register = async (req,res) => {
  try
  {
    console.log(req.body);
    const {fullName, email, password, confirmPassword, avatar, role} = req.body;
    if(!fullName || !email || !password || !role){
      return res.status(400).json({message:"Name, email, password and role are required"});
    }
    if(password !== confirmPassword){
      return res.status(400).json({message:"Passwords do not match"});
    }
    const userExists = await User.findOne({email});
    if(userExists)
    return res.status(400).json({message:"User already Exists"});
    const user = await User.create({fullName,email,password,role,avatar});
    res.status(201).json({
      _id:user._id,
      name:user.fullName,
      email:user.email,
      avatar:user.avatar,
      role:user.role,
      token:generateToken(user._id),
      companyName:user.companyName || '',
      companyDescription:user.companyDescription || '',
      companyLogo:user.companyLogo || '',
      resume : user.resume || '',
    });
  }
  catch(err)
  {
    // console.error(err);
    // console.error(err.stack);
    res.status(500).json({message:err.message});
  }

};

exports.login = async(req,res)=>{
  try{
    const {email,password} = req.body;

    const user = await User.findOne({email});

    if(!user || !(await user.matchPassword(password)))
      return res.status(401).json({message:"Invalid email or password"});
    
    res.status(201).json(
      {
      _id:user._id,
      name:user.name,
      email:user.email,
      token:generateToken(user._id),
      avatar:user.avatar,
      role:user.role,
      companyName :user.companyName || '',
      companyDescription:user.companyDescription || '',
      companyLogo :user.companyLogo || '',
      resume :user.resume || '',
    }
  );
  }

  catch(err){
    res.status(500).json({message:err.message});
  }

};

exports.getMe = async(req,res)=>{
  res.json(req.user);
};

exports.uploadFunc = (req,res)=> {

  if(!req.file){
    res.status(400).json({message:"no file uploaded"});
  }

  const imageURL = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

  res.status(200).json({imageURL}); }