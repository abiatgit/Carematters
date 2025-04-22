import React from 'react'

const IncidentReport = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300 space-y-4">
                  <h3 className="text-lg font-semibold text-red-600">
                    Incident Reports Summary
                  </h3>

                  <div className="flex items-start gap-3">
                    <span className="w-2.5 h-2.5 mt-1 bg-red-500 rounded-full"></span>
                    <p className="text-sm text-gray-700">
                      3 new incident logs this week.
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-2.5 h-2.5 mt-1 bg-yellow-400 rounded-full"></span>
                    <p className="text-sm text-gray-700">
                      2 ongoing investigations in progress.
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-2.5 h-2.5 mt-1 bg-blue-500 rounded-full"></span>
                    <p className="text-sm text-gray-700">
                      1 safety alert issued today.
                    </p>
                  </div>
                </div>
  )
}

export default IncidentReport
