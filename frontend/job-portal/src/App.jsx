import React from  'react'
import {Routes,Route} from 'react-router-dom'
import ProtectedRoutes from './routes/ProtectedRoutes'
import LandingPage from './pages/LandingPages/LandingPage'
import Login from './pages/Auth/Login'
import SignUp from './pages/Auth/SignUp'
import EmployeeRoutes from './routes/EmployeeRoutes'
import JobSeekerRoutes from './routes/JobSeekerRoutes'

const App = ()=>
{
  return (
    <Routes>
      <Route path = "/" element = {<LandingPage/>}/>
      <Route path = "/login" element = {<Login/>}/>
      <Route path = "/signup" element = {<SignUp/>}/>
      <Route element = {<ProtectedRoutes requiredRole = "employee"/>}>
        <Route path = "/employee/*" element = {<EmployeeRoutes/>}/>
      </Route>
      <Route element = {<ProtectedRoutes requiredRole = "jobseeker"/>}>
        <Route path = "/jobseeker/*" element = {<JobSeekerRoutes/>}/>
      </Route>
    </Routes>
  )
}

export default App