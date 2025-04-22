import React from 'react'

const MessageCard = () => {
  return (
    <div className="bg-gradient-to-br from-white to-gray-100 shadow-xl rounded-2xl p-5 border border-gray-200">
    <h3 className="text-xl font-semibold text-gray-800 mb-4">
      📬 Live Messages
    </h3>

    <div className="space-y-4">
      <div className="flex items-start gap-2 p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition">
        <span className="text-blue-500 mt-1">💊</span>
        <p className="text-sm text-gray-700">
          <span className="font-medium">Update:</span> New update on
          medications...
        </p>
      </div>
      <div className="flex items-start gap-2 p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition">
        <span className="text-green-500 mt-1">👩‍⚕️</span>
        <p className="text-sm text-gray-700">
          <span className="font-medium">Notice:</span> Staff update
          needed...
        </p>
      </div>
      <div className="flex items-start gap-2 p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition">
        <span className="text-yellow-500 mt-1">⏰</span>
        <p className="text-sm text-gray-700">
          <span className="font-medium">Reminder:</span> Don’t forget
          handover at 6 PM.
        </p>
      </div>
    </div>
  </div>
  )
}

export default MessageCard
