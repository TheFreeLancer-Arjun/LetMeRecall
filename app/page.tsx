"use client";

import React from "react";
import Blue from "@/app/app-components/blue";
import Green from "@/app/app-components/green";
import Webinar from "@/app/app-components/webinar";
import White from "@/app/app-components/white";
import WhitePublic from "@/app/app-components/white-public";
import Yellow from "@/app/app-components/yellow";
import { FaPlus } from "react-icons/fa";
import { initialTasks } from "../app/data/tasksData"; 
import Link from "next/link";

export default function Page() {
  return (
    <div className="relative  bg-[#1F1F1F] ">
      {/* Top Bar */}
      <div className="absolute bottom-10 right-0 left-0 h-[3cm] z-50 flex items-center justify-center text-white font-bold text-xl shadow-md">
        <div className="w-[15cm] h-[2cm] bg-transparent text-white border-[3px] border-white rounded-r-full rounded-l-full flex justify-between p-5 items-center gap-5 text-3xl">
      <Link href="/landing">
          <div className="bg-white text-black px-5 py-2 rounded-3xl">
            <FaPlus />
          </div> 
      </Link>
          <Link href="/profile">
          <div className="bg-white text-black px-5 py-2 rounded-3xl">
            <FaPlus />
          </div> 
      </Link>
           <Link href="/dashboard">
          <div className="bg-white text-black px-5 py-2 rounded-3xl">
            <FaPlus />
          </div> 
      </Link>
           <Link href="">
          <div className="bg-white text-black px-5 py-2 rounded-3xl">
            <FaPlus />
          </div> 
      </Link>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex">
        {/* Left Scrollable Content */}
          <div className="   p-2 bg-white  w-screen">
          <div className="flex flex-col gap-4">
            {/* Row 1 */}
            <div className="flex gap-5 bg-[#1F1F1F] p-5 rounded-2xl">
              <White />
                  <Blue />
            </div>
              <div className="flex gap-5 bg-[#1F1F1F] p-5 rounded-2xl">
          
            </div>
             <div className="flex gap-5 bg-[#1F1F1F] p-5 rounded-2xl">
               <Yellow />
            </div>
            {/* Row 2 */}
            <div className="flex gap-5 bg-[#1F1F1F] p-5 rounded-2xl mt-5">
              <WhitePublic />
           
            </div>
          </div>
          
        {/* Right Section */}
         <div className="flex-1  overflow-y-scroll space-y-4 p-5 custom-scroll">
          {/* ✅ Dynamic Green cards from task data */}
          {initialTasks.map((task, i) => (
            <Green key={i} task={task} />
          ))}
          <Webinar />
        </div>
        </div>

     
      </div>
    </div>
  );
}
