import React from "react";
import { FaPlus } from "react-icons/fa";

export default function Webinar() {
  return (
    <div className="w-[16cm] max-w-2xl mx-auto bg-[#B08CE1] shadow-md rounded-2xl p-6 font-sans  h-[3cm]">
      <div className="flex items-center justify-between gap-4">
        {/* Date */}
        <div className="bg-[#1F1F1F] text-white rounded-2xl px-4 py-3 text-center w-20">
          <h2 className="text-2xl font-bold">11</h2>
          <p className="text-sm">Fri</p>
        </div>

        {/* Event Info */}
        <div className="flex-1">
          <h1 className="text-lg font-semibold text-gray-800">Webinar</h1>
          <p className="text-gray-600 text-sm">Implementation of habits.</p>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button className="w-10 h-10 flex items-center justify-center bg-gray-200 hover:bg-gray-300 border border-gray-300 rounded-full text-xl">
            …
          </button>
          <button className="w-10 h-10 flex items-center justify-center bg-[#1F1F1F] text-white rounded-full text-sm font-bold">
           <FaPlus />
          </button>
        </div>
      </div>
    </div>
  );
}
