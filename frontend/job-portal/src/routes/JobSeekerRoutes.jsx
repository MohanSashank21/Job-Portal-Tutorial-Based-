import {Route,Routes} from 'react-router-dom'
import Dashboard from '../pages/JobSeeker/Dashboard'
import JobDetails from '../pages/JobSeeker/JobDetails'
import Profile from '../pages/JobSeeker/Profile'
import SavedJobs from '../pages/JobSeeker/SavedJobs'

const JobSeekerRoutes = ()=>(
  <Routes>
    <Route path = "dashboard" element = {<Dashboard/>}/>
    <Route path = "JobDetails" element = {<JobDetails/>}/> 
    <Route path = "Profile" element = {<Profile/>}/>
    <Route path = "SavedJobs" element = {<SavedJobs/>}/>
  </Routes>
);

export default JobSeekerRoutes