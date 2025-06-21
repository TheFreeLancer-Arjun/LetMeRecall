"use client";

import React from "react";
import Blue from "@/app/app-components/blue";
import Green from "@/app/app-components/green";
import Webinar from "@/app/app-components/webinar";
import White from "@/app/app-components/white";
import WhitePublic from "@/app/app-components/white-public";
import Yellow from "@/app/app-components/yellow";
import {
  FaExchangeAlt,
  FaPen,
  FaPlus,
  FaPowerOff,
  FaRetweet,
  FaSignOutAlt,
  FaTwitter,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import Link from "next/link";
import { useAuth } from "../src/components/AuthContext";
import { useTodos } from "../src/hook/useTodos";

export default function Page() {
  const { activeAccountId } = useAuth();
  const { todos, loading, error } = useTodos("today", activeAccountId);

  return (
    <div className="relative min-h-screen flex flex-col bg-white">
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Section */}
        <div className="w-[50%] overflow-y-auto bg-[#F5C3FE] p-4 space-y-6">
          {/* Row 1 */}
          <div className="flex gap-5 bg-[#FADFFE] p-5 rounded-2xl">
            <White />
            <Blue />
          </div>

          {/* Empty Row */}
          <div className="flex gap-5 bg-[#FADFFE] p-5 rounded-2xl min-h-[4rem]"></div>

          {/* Yellow */}
          <div className="flex gap-5 bg-[#FADFFE] p-5 rounded-2xl">
            <Yellow />
          </div>

          {/* Row 2 */}
          <div className="flex gap-5 bg-[#FADFFE] p-5 rounded-2xl">
            <WhitePublic />
          </div>
        </div>

        {/* Right Section */}
        <div className="w-[50%] bg-amber-400 overflow-y-auto p-5 space-y-4">
          {loading ? (
            <p className="text-white text-xl">Loading tasks...</p>
          ) : error ? (
            <p className="text-red-500 text-xl">Error loading tasks.</p>
          ) : todos.length === 0 ? (
            <p className="text-white text-xl">No tasks available.</p>
          ) : (
            todos.map((todo) => <Green key={todo.id} task={todo} />)
          )}
          <Webinar />
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-20 left-0 right-0  bg-transparent  z-50 flex justify-center items-center">
        <div className=" flex justify-between items-center gap-5 text-3xl ">
          {/* Left group of icons */}
          {/* Group wrapper for hover */}
          <div className="    bg-[#FFF4F8]  rounded-l-full  rounded-r-full">
            <div className=" flex justify-center gap-5 py-4 rounded-4xl bg-[#FFF4F8] pl-4 pr-4 ">
              <Link href="/social-media">
                <div className="text-[#8329C9] transition-all duration-300 ease-in-out hover:text-4xl  ">
                  <FaTwitter className="text-5xl transition-all duration-300 ease-in-out hover:text-8xl px-2  py-2 " />
                </div>
              </Link>
              <Link href="/profile">
                <div className="text-[#8329C9] transition-all duration-300 ease-in-out hover:text-4xl">
                  <FaUser className="text-5xl transition-all duration-300 ease-in-out hover:text-8xl px-2  py-2" />
                </div>
              </Link>
              <Link href="/accounts">
                <div className="text-[#8329C9] transition-all duration-300 ease-in-out hover:text-4xl flex  ">
                  <FaUsers className="text-5xl                       duration-300 ease-in-out                     hover:text-8xl px-2  py-2" />
                </div>
              </Link>

              <Link href="/logout">
                <div className="text-[#8329C9] transition-all duration-300 ease-in-out hover:text-4xl">
                  <FaPowerOff className="text-5xl transition-all duration-300 ease-in-out hover:text-8xl px-2  py-2" />
                </div>
              </Link>
            </div>
          </div>

          {/* Pen icon */}
          <div className="group">
            <div className="w-[2.5cm] h-[2.5cm] bg-[#8329C9] text-white rounded-3xl flex justify-center items-center transition-all duration-300 ease-in-out group-hover:w-[3cm] group-hover:h-[3cm]">
              <Link href={`/accounts/${activeAccountId}/dashboard`}>
                <FaPen className="text-4xl transition-all duration-300 ease-in-out group-hover:text-6xl" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
