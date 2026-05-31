import React from 'react'
import {motion} from 'framer-motion'
import {useState} from 'react'
import {Eye,EyeOff,Mail,Lock,AlertCircle,CheckCircle,Building2,User,Loader,UserCheck,Upload} from "lucide-react";
import {validateEmail,validatePassword1,validateAvatar,validateConfirmPassword} from '../../Utils/helper';

const SignUp = ()=> {
  const [formData,setFormData] = useState({
    fullName:'',
    email:'',
    password:'',
    confirmPassword:'',
    role:'',
    avatar:null
  })

  const [loading,setLoading] = useState(false);
  const [success,setSuccess] = useState(false);
  const [showPassword,setShowPassword] = useState(false);
  const [errors,setErrors] = useState({});
  const [avatarPreview,setAvatarPreview] = useState(null);

  const handleInputChange = (e) =>{
    const {name,value} = e.target;
    setFormData(prev=>({
      ...prev,
      [name]:value
    }));

    if(errors[name]){
      setErrors(prev=>({
        ...prev,
        [name]: ""
      }));
    }

  };

  const handleRoleChange = (role) =>{
  
   setFormData((prev)=>({...prev,role}));

   if(errors.role){
    setErrors((prev)=>({
      ...prev,
      role : ""
   }))
   }

  };
  const handleAvatarChange = (e) =>{

    const file = e.target.files[0];

    if(file)
    {
      const errors = validateAvatar(file);
      if(errors){
        setErrors((prev)=>({...prev,avatar :errors}));
        return;
      }
    }

    setFormData((prev)=>({...prev,avatar:file}));

    const reader = new FileReader();

    reader.onload = (e) =>{
      setAvatarPreview(e.target.result);
      setErrors((prev)=>({
        ...prev,
        avatar:""
      }));
    };
    reader.readAsDataURL(file);
  };

  const validateForm = () =>{
    const errors = {
      fullName :!formData.fullName.trim()?"Please enter fullName":"",
      email:validateEmail(formData.email),
      password :validatePassword1(formData.password),
      confirmPassword : validateConfirmPassword(formData.password,formData.confirmPassword),
      role : !formData.role?"Please select a role":"",
      avatar:"",

    };
    Object.keys(errors).forEach(key=>{
      if(!errors[key]) delete errors[key];
    })
    setErrors(errors);
    return  Object.keys(errors).length===0;
  };
  const handleSubmit = async (e)=>{
    e.preventDefault();

    if(!validateForm()) return;

    setLoading(true);
    try{

    }
    catch(error){
      console.log("error");
      setLoading(false);
      setErrors({submit:error.response?.data?.message || "Registration failed.Please try again."});
    }
  };

     if(success){
      return(
      <div className = " min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <motion.div
        initial = {{opacity:0,scale:0.9}}
        animate = {{opacity:1,scale:1}}
        transition = {{duration:0.6}}>
          <CheckCircle className = "w-16 h-16 text-green-500 mx-auto mb-4"></CheckCircle>
          <h2 className = "text-2xl font-bold text-gray-900 mb-2">Account Created</h2>
          <p className =" text-gray-500 mb-4">Welcome to JobPortal!. Your account has been successfully created</p>
          <div className = "animate-spin w-6 h-6 border-2 border-blue-500 border-t-transparent mx-auto rounded-full">
           <p className = "text-sm text-gray-500 mt-2">Redirecting to your dashboard...</p>
          </div>
        </motion.div>
      </div>);}

  return(
    <div className = "min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <motion.div 
      initial = {{opacity:0,y:30}}
      animate = {{opacity:1,y:0}}
      transition = {{duration:0.6}}
      className = "bg-white p-8 max-w-md w-full rounded-xl shadow-lg">
          <div className = "text-center mb-8">
            <h2 className = "text-xl font-bold text-gray-900 mb-2">
              Create Account
            </h2>
            <p className = "text-sm text-gray-600 font-medium">
              Join thousands of professionals finding their dream Jobs.
            </p>
          </div>
          <form onSubmit = {handleSubmit} className = "space-y-8">
          <div>
              <label className = "block text-sm font-medium text-gray-700 mb-2">
                FullName:
              </label>
              <div className = "relative">
                <User className ="absolute left-3 top-1/2 transform -translate-1/2 text-gray-400 w-5 h-5"></User>
                <input
                type = "text"
                name ="fullName"
                onChange = {handleInputChange}
                value = {formData.fullName}
                 className = {`w-full pl-10 pr-4 py-3 border rounded-lg ${
                  errors.fullName?"border-red-500":"border-gray-300"
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors `}
                placeholder = "Enter your full name">
                </input>
              </div>
              
              {errors.fullName && (
               <p className = "text-red-500 text-sm flex items-center mt-1">
                <AlertCircle className ="w-4 h-4 mr-1"></AlertCircle>
                {errors.fullName}
               </p>
              )}

          </div>

          <div >
            <label className = "block text-sm font-medium text-gray-700 mb-2">
            Email:
            </label>
            <div className ="relative ">
            <Mail className = "absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"></Mail>
            <input
            type = "email"
            name = "email"
            onChange = {handleInputChange}
            value = {formData.email}
            className = {`w-full pl-10 pr-4 py-3 rounded-lg border ${errors.email?'border-red-500':'border-gray-300'} border-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors  `}
            placeholder = "Enter your email">
            </input>
           </div>

              {errors.email && (
                <p className = "text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle className = "w-4 h-4 mr-1"></AlertCircle>
                    {errors.email}
                </p>

              )}
          </div>

          <div>
              <label className = "block text-gray-700 font-medium ">
                Password
              </label>
              <div className = "relative">
            <Lock className = "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"></Lock>
                <input 
                type = {showPassword ? 'text' : 'password'}
                name = "password"
                onChange = {handleInputChange}
                value = {formData.password}
                className ={`w-full pl-10 pr-5 py-3 rounded-lg border ${errors.password?'border-red-500':'border-gray-300'} border-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors  `} 
                placeholder = "Enter your password">
                </input>
                 <button
                  type = "button"
                  onClick = {()=>{setShowPassword(prev=>!prev)}}
                  className = "absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 w-5 h-5">
                    {showPassword?<EyeOff/>:<Eye/>}
                  </button>
              </div>
              {errors.password && (
                <p className = "text-red-500 text-sm flex items-center">
                  <AlertCircle className = "w-4 h-4 mr-1"></AlertCircle>
                  {errors.password}
                </p>
              )
              }
          </div>

          <div>
                <label className = "block font-medium font-gray-700">ConfirmPassword</label>
                <div className = "relative">
                  <Lock className = "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"></Lock>
                  <input
                  type = {showPassword?'text':'password'}
                  name = "confirmPassword"
                  onChange = {handleInputChange}
                  value = {formData.confirmPassword}
                  className = {`w-full pl-10 pr-4 py-3 rounded-lg border ${errors.confirmPassword?'border-red-500':'border-gray-300'} border-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors  `}
                  placeholder="Confirm your password"></input>
                  <button
                  type = "button"
                  onClick = {()=>{setShowPassword(prev=>!prev)}}
                  className = "absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 w-5 h-5">
                    {showPassword?<EyeOff/>:<Eye/>}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className = "text-red-500 flex items-center text-sm">
                    <AlertCircle className = "w-4 h-4 mr-1"></AlertCircle>
                    {errors.confirmPassword}
                  </p>
                )}
          </div>

          <div>
                <label className = "block  font-medium text-gray-900 mb-2">
                  Profile Picture [optional]:
                </label>

                <div className = "flex items-center space-x-4">
                  <div className = "w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                  {avatarPreview? (<img src= {avatarPreview} alt ="Avatar Preview" className = "w-full h-full object-cover"></img>):(<User className = "w-8 h-8 text-gray-400"></User>)}
                  </div>  
                  
                  <div className = "flex-1">
                    <input type = "file"
                    id = "avatar"
                    accept = ".jpg .jpeg .png"
                    onChange = {handleAvatarChange}
                    className = "hidden"></input>
                    <label
                    htmlFor = "avatar"
                    className = "cursor-pointer bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors  flex items-center space-x-2">
                  
                    <Upload className = "w-4 h-4"></Upload>
                    <span>Upload Photo </span>
                    </label>
                    <p className = "text-xs text-gray-500 mt-1">JPG,PNG up to 5MB</p>
                  </div>
                </div>
                {errors.avatar && (
                  <div className = "bg-red-50 border-red-200 rounded-lg p-3">
                  <p className = "text-red-500 flex items-center text-sm">
                  <AlertCircle className = "w-4 h-4 mr-1"></AlertCircle>
                  {errors.avatar}
                  </p>
                  </div>
                )}
          </div>

          <div>
                <label className = "block text-sm font-medium text-gray-700 mb-3">
                  I am a
                </label>
                <div className = "grid grid-cols-2 gap-4">
                <button
                type = "button"
                onClick={()=>{handleRoleChange("jobseeker")}} 
                className = {`p-4 rounded-lg border-2 transition-all ${formData.role === "jobseeker"?"border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 hover:border-gray-400"} `}>
                  <UserCheck className = "w-8 h-8 mx-auto mb-2"></UserCheck>
                  <div className = "font-medium">Job Seeker</div>
                  <div className = "text-xs text-gray-500">Looking for oppurtunities</div>
                </button>
                <button 
                type = "button"
                onClick = {()=>{handleRoleChange("employee")}}
                className = {`p-4 rounded-lg border-2 transition-all ${formData.role ==="employee" ? "border-blue-500 bg-blue-50 text-blue-700":"border-gray-200 hover:border-gray-400" } `}>
                  <Building2 className = "w-8 h-8 mx-auto mb-2"></Building2>
                  <div className = "font-medium">Employer</div>
                  <div className = "text-xs text-gray-500">Hiring talent</div>
                </button>
                </div>
                {errors.role && (
                  <div className = "bg-red-50 border-red-200 rounded-lg p-3">
                  <p className = "text-red-500 flex items-center text-sm">
                    <AlertCircle className = "w-5 h-5 mr-1"></AlertCircle>
                    {errors.role}
                    </p>
                    </div>
                )}
              </div>
                  
              <button 
              type = "submit"
              disabled = {loading}
              className = "w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2">
                  {loading ?(
                    <>
                    <Loader className = "w-5 h-5 animate-spin"></Loader>
                      <span>Creating Account...</span>
                    </>
                  ):(<span>Create Account</span>)}
              </button>
              <div className = "text-center">
                  <p className = "text-gray-700">Already have an account?{" "}<a href = "/login" className = "text-blue-600 hover:text-blue-700 font-medium">Sign in here</a></p>
              </div>
          </form>
      </motion.div> 
    </div>
  );
}

export default SignUp;

