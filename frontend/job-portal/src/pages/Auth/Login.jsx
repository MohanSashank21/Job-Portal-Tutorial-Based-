import React from 'react'
import {motion} from 'framer-motion'
import {Mail,Lock,Eye,EyeOff,Loader,AlertCircle,CheckCircle} from 'lucide-react'
import { useState } from 'react'
// login all related data in one object where as error, loading showpassword and success these are four different states is it ok  
const Login = () =>
{
// form data Object
const [formData ,setFormData] = useState({
email:'',
password:'',
rememberMe:false
});

const[errors,setErrors] = useState({});

const[success,setSuccess] = useState(false);

const[loading,setLoading] = useState(false);

const[showPassword,setShowPassword] = useState(false);

const validateEmail = (email) =>{
  if(!email.trim())
  return 'Email is required';
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  if(!emailRegex.test(email)) return 'please enter a valid email address';
  return '';
};

const validatePassword = (password) =>{
if(!password)
return 'Please enter password';
return '';
};

const handleInputChange = (e) =>{
    const {name,value} = e.target;
    setFormData(prev =>({
      ...prev,
      [name] : value 
    }));

    if(errors[name]){
      setFormData(prev=>({
        ...prev,
        errors : {...prev.errors.name,[name]:''}
      }));
    }
};

const validateForm = () =>{
    const errors = {
      email : validateEmail(formData.email),
      password :validatePassword(formData.password)
    }
    Object.keys(errors).forEach(key =>{
      if(!errors[key])delete errors[key];
    })
    setErrors(prev=>(errors));
    return Object.keys(errors).length===0;
};
const handleSubmit = async (e) =>{
    e.preventDefault();
    if(!validateForm())
    return;
    setLoading(true);
    try{
      // Login API Integration
    }
    catch(error){
      setLoading(false);
      setFormData(prev =>({...prev,errors:{
        submit:error.response?.data?.message || 'Login failed.Please check your credentials.'
      }}))
     

    }
};
if(true){
  <div className = "min-h-screen flex items-center justofy-center bg-gray-50 px-4">
    <motion.div
    initial = {{opacity:0,scale:0.9}}
    animate = {{opacity:1,scale:1}}
    className = "text-center max-w-md w-full bg-white shadow-lg p-8">
        <CheckCircle className = "w-16 h-16 text-green-500 mx-auto mb-4"></CheckCircle>
        <h2 className = "text-2xl font-bold text-gray-900 mb-2"></h2>
        <p className = "text-gray-500 mb-4">You have been successfully logged in </p>
        <div className = "animate-spin w-6 h-6 border-blue border-t-transparent rounded-full mx-auto">
          <p className = "text-sm text-gray-500 mb-2">Redirecting to your dashboard....</p>
        </div>
    </motion.div>
  </div>
}
  return (
    <div className = "min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <motion.div
    initial = {{opacity:0,y:30}}
    animate = {{opacity:1,y:0}}
    transition = {{duration : 0.6}}
    
    className = "bg-white px-8 rounded-xl hover:shadow-lg max-w-md w-full">
    
        <div className = "text-center mb-8 mt-6">
          <h2 className = "text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
          <p className = "text-gray-500">Sign in your JobPortal account </p>
        </div>

        <form onSubmit = {handleSubmit} className = "space-y-6">
          <div>
            <label className = "block text-sm font-medium text-gray-700 mb-2">
            Email:
            </label>
            <div className = "relative">
              <Mail className = "absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"></Mail>
              <input
              type = "email"
              name = "email"
              value = {formData.email}
              onChange = {handleInputChange}
              placeholder = "Enter your email"
              className = {`w-full pl-10 pr-4 py-3 rounded-lg border-2 ${
             errors.email?'border-red-500':'border-gray-300' } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}>
              </input>
            </div>
            {errors.email && (
              <p className = "text-red-500 text-sm  flex items-center">
                  <AlertCircle className = "w-4 h-4 mr-1"></AlertCircle>
                  {errors.email}
              </p>
            )}
          </div>

          <div className = "mb-4">
            <label className = "block text-sm font-medium text-gray-700 mb-2 ">
              Password:
            </label>
              
            <div className = "relative ">
              <Lock className = "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5"></Lock>   
              <input 
              type = {showPassword ? 'text' : 'password'}
              name = 'password'
              value = {formData.password}
              onChange = {handleInputChange}
              placeholder = "Enter you Password"
              className = {`w-full pl-10 pr-5 py-3 rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}>
              </input>

              <button
              type = "button"
              onClick = {()=>{setShowPassword(prev=> !prev)}} className = "absolute right-3 top-1/2 transform-y-1/2 text-gray-400 hover:text-gray-600">
                {showPassword?<Eye className = "w-5 h-5"></Eye> : <EyeOff className ="w-5 h-5"></EyeOff>}
              </button>
            </div>
            {errors.password && (
              <p className = "text-red-500 text-sm  flex items-center">
                <AlertCircle className = "w-4 h-4"></AlertCircle>
                {errors.password}
              </p>
            )}
          </div>
          {errors.submit && <div>
           <p className = "bg-red-50 border-red-200 rounded-lg p-3">
             <AlertCircle className = "text-red-700 text-sm flex items-center"></AlertCircle>
             {errors.submit}
            </p>
            </div>}
            <button
            type = "submit"
            disabled = {loading}
            className = "w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center py-3 rounded-lg font-semibold">
              {loading ? (<><Loader className = "w-5 h-5 animate-spin"/>
              <span className = "">Signing In ....</span></>) : (<span>Sign In</span>)}           
            </button>
            <div className = "text-center mb-4">
              <p className = "text-gray-600">
                Don't have an account?{' '}
                <a href = "/signup" className = "text-blue-600 hover:text-blue-700 font-medium">create one here</a>
              </p>
            </div>
        </form>
    </motion.div>
    </div>
  );
}

export default Login