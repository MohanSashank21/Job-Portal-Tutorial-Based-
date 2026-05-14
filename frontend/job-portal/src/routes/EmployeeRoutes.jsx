import {Route,Routes} from 'react-router-dom'
import Dashboard from '../pages/Employee/Dashboard';
import Profile from '../pages/Employee/Profile';
import JobPosting from '../pages/Employee/JobPosting';
import ManageJobs from '../pages/Employee/ManageJobs';
import Applicants from '../pages/Employee/Applicants';

const EmployeeRoutes = () =>(
  <Routes>
    <Route path = "dashboard" element = {<Dashboard/>}/>
    <Route path = "profile" element = {<Profile/>}/>
    <Route path = "new-job" element = {<JobPosting/>}/>
    <Route path = "mange-job"  element = {<ManageJobs/>}/>
    <Route path = "applicant" element = {<Applicants/>}/>
  </Routes>
);

export default EmployeeRoutes
