import React from 'react'
import {motion} from 'framer-motion'
import {Search,ArrowRight,Users,Building2,TrendingUp} from 'lucide-react'
import {useNavigate} from 'react-router-dom'
const Hero = ()=>{
  const isAuthenticated = true
  const user = {name:"Alex",role:"employee"}
  const stats = [
    {icon:Users,label:"Active Users",value:"2.4M+"},
    {icon:Building2,label:"Companies",value:"50k+"},
    {icon:TrendingUp,label:"Jobs Posted",value:"150k+"}
  ];
  const navigate = useNavigate();
  return (
    <section className = "pt-16 sm:pt-20 pb-16 bg-white min-h-screen flex items-center">
      <div className = "container mx-auto px-4">
        <div className = "max-w-4xl mx-auto text-center">
        {/* heading */}
        <motion.h1
         initial = {{opacity:0,y:30}}
         animate = {{opacity:1,y:0}}
         transition = {{duration:0.8}}
         className = "text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
          Find Your Dream Job or <span className = "block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text mx-auto text-transparent">Perfect Hire</span>
        </motion.h1>
        {/* subHeading */}
        <motion.p
        initial = {{opacity:0,y:30}}
        animate = {{opacity:1,y:0}}
        transition = {{delay:0.2,duration:0.8}}
        className = "text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
          connect talented professionals with innovative companies.Your next carrer move or perfect move is just one click away
        </motion.p>
        {/* cta buttons */}
          <motion.div
          initial = {{opacity:0,y:30}}
          animate = {{opacity:1,y:0}}
          transition = {{delay:0.4,duration:0.8}}
          className = "flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <motion.button
            whileHover={{ scale:1.02 }}
            whileTap={{ scale:0.98 }}
            className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition all flex items-center gap-2"
            onClick = {()=>{navigate('/find-jobs')}}>
             <Search className="w-5 h-5 group-hover:translate-x-1 transition-transform"/>
             <span >Find Jobs</span>
             <ArrowRight></ArrowRight>
            </motion.button>
            <motion.button
            whileHover = {{scale:1.02}}
            whileTap = {{scale:0.98}}
            onClick = {()=>{navigate(isAuthenticated && user?.role === "employee"? "/employee/dashboard":"/login");}}
            className = "bg-white border-2 border-gray-200 text-gray-700 px-8 py-4 rounded font-semibold hover:border-gray-300 hover:bg-gray-50 transition-all">
              Post a Job
            </motion.button>
            {/* stats */}
          </motion.div>
          <motion.div initial = {{opacity:0,y:30}}
          animate = {{opacity:1,y:0}}
          transition = {{delay:0.6,duration:0.8}}
          className = "grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto mt-10">
            {
              stats.map((stat,index)=>(
              <motion.div 
              key = {index}
              initial = {{opacity:0,y:30}}
              animate ={{opacity:1,y:0}}
              transition = {{delay:0.8+index*0.15,duration:0.8}}
              className = "flex flex-col items-center  p-4 rounded hover:bg-gray-50"
              >
              <div className = "w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded flex items-center justify-center">
                <stat.icon className = "w-6 h-6 text-blue-600"/>
              </div>
                <div className = "text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className = "text-sm text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
              ))
            }
          </motion.div>

        </div>
      </div>
      <div className = "">
        <div className = ""/>
        <div className = ""/>
        <div className = ""/>
      </div>
    </section>
  );
}
export default Hero;