import React from 'react'

const Appointments = () => {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-lg rounded-2xl p-6 sm:col-span-2 transition hover:shadow-xl">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    🗓️ Visits & Appointments
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex justify-between items-center">
                      <span>Dr. Smith - Room 102</span>
                      <span className="text-xs text-gray-500">
                        Today, 3:00 PM
                      </span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Family Visit - John D.</span>
                      <span className="text-xs text-gray-500">
                        Tomorrow, 11:00 AM
                      </span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Eye Checkup - Resident A</span>
                      <span className="text-xs text-gray-500">
                        Fri, 10:30 AM
                      </span>
                    </li>
                  </ul>
                </div>
  )
}

export default Appointments
