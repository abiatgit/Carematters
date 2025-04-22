import { Plus } from 'lucide-react'
import React from 'react'

const Units = () => {
  return (
  <div className=" grid grid-cols-1 sm:grid-cols-6 gap-2">
               <div className="bg-white shadow-md rounded-xl p-4 h-[150]  sm:col-span-1">
                 <h3 className="text-lg font-semibold">Units</h3>
                 <ul>
                   <li className="py-2 text-sm text-gray-600">Unit 1</li>
                 </ul>
               </div>
               <div className="bg-white shadow-md rounded-xl p-4  sm:col-span-1">
                 <h3 className="text-lg font-semibold">Units</h3>
                 <ul>
                   <li className="py-2 text-sm text-gray-600">Unit 1</li>
                 </ul>
               </div>
               <div className="bg-white shadow-md rounded-xl p-4  flex items-center justify-center sm:col-span-1">
                 <Plus/>
               </div>
             </div>
  )
}

export default Units
