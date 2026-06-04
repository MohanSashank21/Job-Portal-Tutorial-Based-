const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination : (req,file,cb)=>{
    cb(null,'uploads/');
  },
  filename : (req,file,cb) =>{
    cb(null,`${Date.now()}-${file.originalname}`)
  },
});

const fileFilter = (req,file,cb) =>{
  const allowedTypes = ['.jpeg','.png','.jpg','.pdf'];
  console.log(file.mimetype);
  console.log(file.originalname);
  console.log(file);
  if(allowedTypes.includes(path.extname(file.originalname).toLowerCase()))
    {
    cb(null,true);
  }
  else{
    cb(new Error('Only .jpeg .jpg .png and .pdf formats are allowed'),false);
  }
};

const upload = multer({storage,fileFilter});

module.exports = upload;