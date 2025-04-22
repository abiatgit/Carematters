import React from 'react'

const MedicationSummary = () => {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-lg rounded-2xl p-6 sm:col-span-2 transition hover:shadow-xl">
    <h3 className="text-xl font-semibold text-gray-800 mb-4">
      💊 Medication Updates
    </h3>
    <ul className="space-y-2 text-sm text-gray-700">
      <li className="flex justify-between items-center">
        <span>Resident B - Paracetamol</span>
        <span className="text-xs text-gray-500">+500mg</span>
      </li>
      <li className="flex justify-between items-center">
        <span>Resident C - Insulin</span>
        <span className="text-xs text-gray-500">
          Updated Dosage
        </span>
      </li>
      <li className="flex justify-between items-center">
        <span>Resident D - Vitamin D</span>
        <span className="text-xs text-gray-500">
          Discontinued
        </span>
      </li>
    </ul>
  </div>
  )
}

export default MedicationSummary
