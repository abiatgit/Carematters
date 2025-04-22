import React from 'react'

const Stats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
    {/* Staff-to-Resident Ratio */}
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-start justify-between hover:shadow-lg transition-shadow duration-300">
      <h4 className="text-sm font-medium text-gray-500 mb-2">
        Staff-to-Resident Ratio
      </h4>
      <p className="text-3xl font-bold text-blue-600">1:5</p>
      <span className="text-xs text-gray-400 mt-1">
        Target: 1:4
      </span>
    </div>

    {/* Room Occupancy */}
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-start justify-between hover:shadow-lg transition-shadow duration-300">
      <h4 className="text-sm font-medium text-gray-500 mb-2">
        Room Occupancy
      </h4>
      <p className="text-3xl font-bold text-green-600">85%</p>
      <span className="text-xs text-gray-400 mt-1">
        20 of 24 rooms occupied
      </span>
    </div>

    {/* Medication Compliance */}
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-start justify-between hover:shadow-lg transition-shadow duration-300">
      <h4 className="text-sm font-medium text-gray-500 mb-2">
        Medication Compliance
      </h4>
      <p className="text-3xl font-bold text-indigo-600">92%</p>
      <span className="text-xs text-gray-400 mt-1">This week</span>
    </div>
  </div>
  )
}

export default Stats
