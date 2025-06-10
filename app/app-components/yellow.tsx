import React from "react";

export default function Yellow() {
  return (
    <div className="bg-[#F7E39A] text-gray-900 p-5 rounded-3xl w-[5cm] h-[14cm] flex justify-center items-start shadow-xl">
      <div className="flex flex-col justify-center items-center">
        <div className="text-6xl font-light mt-6">
          assain
          <div>
             task

          </div>
          <div>
             to {" "}
          </div>
          <span className="text-gray-500 font-semibold">others</span>
        </div>
        <span className="bg-white px-5 py-4 mr-[3cm] mt-2 rounded-full flex items-center justify-center ml-auto cursor-pointer border-gray-400 border-dashed border-2 text-2xl hover:bg-gray-200">
          →
        </span>
        <img
          className="w-32 h-32 rounded-full "
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV65sYRFx0UYhQleTDPqOCV5QyTw6niOxE_g&s"
          alt=""
        />
      </div>
    </div>
  );
}
