import React from 'react'
import {
    Home,
    Users,
    UserCheck,
    Mail,
    Pill,
    Handshake,
  } from "lucide-react";
const Sidebar = () => {
  return (
     <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white w-16 hover:w-64 transition-all duration-300 ease-in-out flex flex-col items-center py-8">
          <div className="space-y-6 w-full group">
            {[
              ["Dashboard", Home],
              ["Residents", Users],
              ["Staff", UserCheck],
              ["Messages", Mail],
              ["Handover", Handshake],
              ["Medications", Pill],
            ].map(([label, Icon], idx) => (
              <div
                key={idx}
                className="flex items-center justify-center hover:bg-gray-700 p-2 rounded-full w-full cursor-pointer group-hover:justify-start"
              >
                <Icon className="ml-2" />
                <span className="ml-4 text-sm hidden group-hover:block">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
  )
}

export default Sidebar
