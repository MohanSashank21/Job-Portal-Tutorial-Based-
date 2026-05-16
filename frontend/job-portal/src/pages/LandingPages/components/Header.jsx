import React from 'react';
import {motion} from 'framer-motion'
import {Briefcase} from 'lucide-react';
import {Link} from 'react-router-dom';
const Header = () =>{
  const isAuthenticated = true;
  const user = {name:"Alex",role:"employee"}
  const employeePath = isAuthenticated && user?.role==="employee" ? "/employee/dashboard" : "/login"
  const dashboardPath = user?.role === "employee" ? "/employee/dashboard" : "/jobseeker/dashboard"
  const jobseekerPath = "/find-jobs"

  return (
   <motion.header 
   initial = {{opacity:0,y:-20}}
   animate = {{opacity:1,y:0}}
   transition= {{duration:0.8}}
   className = "fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
     <div className= "container mx-auto px-4">
      <div className="flex items-center  justify-between bg-gray-50 h-12">
        {/* {logo} */}
        <div className="flex items-center gap-3">
        <div className = "w-8 h-8 bg-gradient-to-r from-blue-600 to-red-600 rounded-lg flex items-center justify-center ">
        <Briefcase className = "w-5 h-5 text-white"/>
        </div>
        <span className="text-xl font-bold ">JobPortal</span>
      </div>
      {/* navigation links  */}
      <nav className = " sm:hidden flex items-center gap-3 ">
        <Link to = {jobseekerPath} className = "text-gray-600 hover:text-gray-900 transition-colors font-medium">Find Jobs</Link>
        <Link to = {employeePath} className = "text-gray-600 hover:text-gray-900 transition-colors font-medium">
        For Employers
        </Link>
      </nav>
      {/* <AuthButtons> */}
      <div className = "flex items-center gap-3">
      {
      isAuthenticated?(
        <div className = "flex items-center gap-3" >
<span className = "">Welcome, {user?.name} </span>
<Link
  to={dashboardPath}
  className="flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg px-5 py-1"
>
  Dashboard
</Link>
        </div>
      ):
      (
       <>
        <Link to ="/login" className = "">Login</Link>
        <Link to ="/signup" className = "">Sign Up</Link>
       </>
      ) 
      }
      </div>
      </div>
     </div>
   </motion.header>
  );
}
export default Header;