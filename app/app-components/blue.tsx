import React from 'react'
import { FaRegSmile } from 'react-icons/fa'

export default function Blue() {
  return (
    <div className="w-full max-w-[10cm] h-[8.5cm] bg-[#BBE7EF]  rounded-3xl p-5 flex flex-col  gap-5">
      
      {/* Top Controls */}
      <div className="flex justify-between items-center">
        {/* Arrow Button */}
        <div className="px-5 py-5 bg-white text-gray-600 rounded-full text-2xl cursor-pointer hover:bg-gray-200 transition   border-dashed  border-[2px]">
          →
        </div>

        {/* Toggle Buttons */}
        <div className="border-2 border-[#1F1F1F] bg-[#1F1F1F] rounded-3xl flex items-center">
          <button className="bg-[#BBE7EF] text-black font-semibold rounded-3xl px-4 py-1 text-xl sm:text-2xl">
            Weekly
          </button>
          <span className="text-white font-medium text-xl sm:text-2xl px-4 py-1">
            Monthly
          </span>
        </div>
      </div>

      {/* Progress Content */}
      <div className="text-[#101828]   flex ">
      <div>
          <h2 className="text-2xl sm:text-3xl font-semibold mb-2">Your Progress</h2>
        
        <div className="flex flex-col sm:flex-row justify-between items-center  w-[4cm]">
          {/* Message */}
          <h1 className="text-4xl  font-bold   ">
            You Are Doing <h1 className='flex pt-2 gap-2'>
              Well <FaRegSmile className="text-[#101828]  text-6xl" />
            </h1>
          </h1>

      
        </div>
      </div>

            {/* Score */}
          <h1 className="text-6xl font-semibold   flex justify-center  items-end  pb-4 ">78%</h1>
      </div>
    </div>
  )
}
