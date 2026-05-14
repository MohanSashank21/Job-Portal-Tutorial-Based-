import React from 'react';

import {Briefcase} from 'lucide-react';
import {Link} from 'react-router-dom';
const Header = () =>{
  const isAuthenticated = true;
  const user = {name:"Alex",role:"employee"}
  const employeePath = isAuthenticated && user?.role==="employee" ? "/employee/dashboard" : "/login"
  const dashboardPath = user?.role === "employee" ? "/employee/dashboard" : "/jobseeker/dashboard"
  const jobseekerPath = "/find-jobs"

  return (
   <header>
     <div className="">
      <div className="">
        {/* {logo} */}
        <div className="">
        <div className = "">
        <Briefcase className = ""/>
        </div>
        <span className="">JobPortal</span>
      </div>
      {/* navigation links  */}
      <nav className = "">
        <Link to = {jobseekerPath} className = "">Find Jobs</Link>
        <Link to = {employeePath} className = "">
        For Employers
        </Link>
      </nav>
      {/* <AuthButtons> */}
      <div className = "">
      {
      
      isAuthenticated?(
        <div className = "" >
<span className = "">welcome,{user?.name} </span>
<Link to = {dashboardPath} className = "">Dashboard</Link>
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
   </header>
  );
}
export default Header;