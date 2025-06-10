"use client";

import React from "react";
import { TaskType } from "../data/tasksData"; // ✅ Correct path here
import { FaChartLine, FaPlus, FaRegCalendarAlt, FaShareAlt } from "react-icons/fa";

export default function Green({ task }: { task: TaskType }) {
  return (
    <div className="flex-col justify-center items-center flex gap-5 overflow-x-auto">
      <div className="bg-[#CFE9BC] w-[16cm] rounded-3xl shrink-0">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3 w-[50%] p-5">
            <FaRegCalendarAlt className="text-[#101828] text-3xl" />
            <h1 className="text-3xl text-[#101828] font-light">{task.date}</h1>
          </div>
          <div className="flex gap-4 w-[50%] justify-end pr-6">
            <div className="text-3xl bg-white/70 px-5 py-5 rounded-full mt-[1cm] cursor-pointer">
              <FaShareAlt className="text-[#101828]" />
            </div>
            <div className="text-3xl bg-[#1F1F1F] px-5 py-5 rounded-full text-[#CFE9BC] mt-[1cm] cursor-pointer">
              <FaPlus />
            </div>
          </div>
        </div>

        <div className="p-5 text-2xl">
          <h1 className="font-medium mb-2">Tasks</h1>
          <h1 className="text-5xl font-bold flex">{task.title}</h1>
          <div className="flex gap-2 p-2 flex-wrap">
            <span className="bg-white text-orange-500 rounded-2xl text-2xl font-medium w-[4cm] h-[1.5cm] flex justify-center items-center gap-2">
              {task.priority} <FaChartLine />
            </span>
            <span className="bg-white text-orange-500 rounded-2xl text-2xl font-medium w-[4cm] h-[1.5cm] flex justify-center items-center gap-2">
              {task.priviteOrPublic} <FaChartLine />
            </span>
            <span className="bg-white text-orange-500 rounded-2xl text-2xl font-medium w-[4cm] h-[1.5cm] flex justify-center items-center gap-2">
              {task.list} <FaChartLine />
            </span>
          </div>
        </div>

        <div className="px-5">
          <div className="border-t pt-5 pb-5 text-xl font-medium text-[#1F1F1F] flex gap-5 flex-wrap">
            {task.tags.map((tag, i) => (
              <span key={i}>{`#${tag}`}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
