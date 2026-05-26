import React from 'react'
import { Briefcase } from 'lucide-react'
const Footer = () =>{
    return (
      <footer className ="relative bg-gray-50 text-gray-900 overflow-hidden">
        <div className = "relative px-6 py-16">
          <div className = "max-w-6xl mx-auto">
            {/* main footer content */}
            <div className = "text-center space-y-8">
            {/* logo-brand */}
            </div>
            <div className="space-y-4">
  <div className="flex flex-col items-center justify-center space-y-4 mb-6">

    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
      <Briefcase className="w-6 h-6 text-white" />
    </div>

    <h3 className="text-2xl font-bold text-gray-800">
      Job Portal
    </h3>

    <p className="text-sm text-gray-600 max-w-md mx-auto text-center leading-relaxed">
      Connecting talented professionals with innovative companies worldwide.
      Your career success is our mission
    </p>
      <p className = "text-sm text-gray-600 space-y-2">
              {new Date().getFullYear()} Time To Program
      </p>

  </div>
            </div>
          </div>
        </div>
      </footer>
    )
}
export default Footer