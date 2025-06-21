import React from "react";
import { FaRegSmile } from "react-icons/fa";

export default function Blue() {
  return (
    <div className="w-full max-w-[10cm] h-[8.5cm] bg-[#C585FD]  rounded-3xl p-5 flex flex-col  gap-5">
      {/* Top Controls */}
      <div className="flex justify-between items-center">
        {/* Arrow Button */}
        <div className="px-5 py-5 bg-[#FF9099] text-[#6B0E21] rounded-full text-2xl cursor-pointer hover:bg-[#6B0E21] transition   border-dashed  border-[2px] border-[#6B0E21]">
          →
        </div>

        {/* Toggle Buttons */}
        <div className="border-2 border-[#FADFFE] bg-[#FADFFE] rounded-3xl flex items-center">
          <button className="bg-[#812AC7] text-[#F1C1FD] font-semibold rounded-3xl px-4 py-1 text-xl sm:text-2xl">
            Weekly
          </button>
          <span className="text-black/30 font-medium text-xl sm:text-2xl px-4 py-1">
            Monthly
          </span>
        </div>
      </div>

      {/* Progress Content */}
      <div className="text-[#F1C1FD]   flex ">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold mb-2">
            Your Progress
          </h2>

          <div className="flex flex-col sm:flex-row justify-between items-center  w-[4cm]  text-[#360362]">
            {/* Message */}
            <span className="text-4xl  font-bold   ">
              You Are Doing{" "}
              <span className="flex pt-2 gap-2">
                Well <FaRegSmile className="text-[#360362]  text-6xl" />
              </span>
            </span>
          </div>
        </div>

        {/* Score */}
        <h1 className="text-6xl font-semibold   flex justify-center  items-end  pb-4  text-[#6B0E21]">
          78%
        </h1>
      </div>
    </div>
  );
}
