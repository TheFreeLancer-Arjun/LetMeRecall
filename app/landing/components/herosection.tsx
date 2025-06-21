import React from "react";
import { ArrowUp } from "@/icons/ArrowUp";
import OauthProvider from "../../../src/components/ui/OauthProviderBtn";
import Image from "next/image";
import Link from "next/link";
import {
  FaCalendarAlt,
  FaGrinSquintTears,
  FaMarsDouble,
  FaPlay,
} from "react-icons/fa";

export const HeroSection = () => {
  const currentDate = new Date().toISOString().split("T")[0]; // e.g., 2025-06-14

  return (
    <div className=" pl-2 pr-2 ">
      <div className="w-full bg-[#5C3609] p-2 rounded-4xl text-white    ">
        <div className="w-full rounded-4xl bg-white flex">
          <div className="w-[75%] h-full flex-col justify-between items-center p-1  pl-13">
            <div className="h-[25%] flex justify-start items-center">
              <div   style={{ fontFamily: "Rationale" }}    className="flex  rounded-3xl gap-2 justify-center items-center">
                <div className="  p-2 flex justify-start items-center text-xl font-semibold px-7  h-[2.5cm] rounded-4xl text-[#42214E] ">
                  <span>
                    <span className="text-3xl text-[#5C3609] "> 100</span>
                    <span className="text-[#5C3609] font-bold">% </span>
                    <span className="text-gray-500">
                      Secure Task Management
                    </span>
                  </span>
                </div>
                <span className="  text-[#5C3609] px-5 py-6 rounded-2xl font-bold text-2xl hover:scale-110 transition-transform duration-300">
                  Read Story
                </span>
              </div>
            </div>
            <div className="flex-col justify-baseline  mt-5">
              <div className="font-semibold text-[#32113E]    flex flex-col justify-start  items-start  rounded-3xl">
                {/* Headline */}
                <div className="  rounded-3xl text-center  font-bold text-gray-400   py-4 space-y-6 w-[30cm]">
                  <div className="text-8xl   ">
                    <div className=" text-start    ">
                      <div>
                        <span    style={{ fontFamily: "Rationale" }}    >Never </span>

                        <span    style={{ fontFamily: "Rationale" }}   className="">Lose </span>

                        <span    style={{ fontFamily: "Rationale" }}    >A </span>

                        <span 
                        
                          style={{ fontFamily: "DynaPuff" }}  
                        className="  text-[#5C3609]  font-headline   ">Thought</span>
                      </div>
                    </div>

                    <div className="flex justify-start items-center gap-10  text-black">
                      {/* Tags */}
                      <div   style={{ fontFamily: "DynaPuff" }} className=" text-[#5C3609]  "> Again </div>{" "}
                      <div className=" flex justify-start items-center mt-6">
                        <div className="text-xl bg-[#FCF7B3]   hover:scale-110 transition-transform duration-300     rounded-xl py-3 px-4 flex flex-wrap gap-4 justify-center items-center ">
                          <span className="flex items-center gap-2">
                            <FaCalendarAlt /> {currentDate}
                          </span>
                          <span className="px-3 py-1 rounded-2xl bg-green-100 text-green-800 font-semibold">
                            Personal
                          </span>
                          <span className="flex items-center gap-1 px-3 py-1 font-semibold">
                            <span className="w-5 h-5 bg-red-500 rounded-lg"></span>{" "}
                            Private
                          </span>
                          <span className="flex items-center gap-1 px-3 py-1 font-semibold">
                            <span className="w-5 h-5 bg-amber-400 rounded-lg"></span>{" "}
                            Low
                          </span>
                          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded font-semibold">
                            9
                          </span>
                          <span>SubTodos</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className=" text-2xl font-light text-gray-700   flex justify-start items-center   ">
                    <span className=" text-start  w-[12cm] ">
                      Helps you organize your tasks in a better, faster, and
                      more fun way.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[40%] flex justify-center items-center">
            <div className="relative h-[12cm] w-[8cm] rounded-full overflow-hidden border-[4px] border-[#5C3609] bg-white flex justify-center items-center">
              {/* Background Image */}
              <Image
                width={500}
                height={500}
                src="https://cdn.prod.website-files.com/66ba51656bf1fb9fa04683d6/675866b9eb3258ba1fc7bc8a_runway-screenshot.webp"
                alt="Preview"
                className="object-cover"
              />

              {/* Dark overlay with play icon */}
              <div className="absolute inset-0  bg-opacity-40 flex justify-center items-center">
                <div className="bg-[#FCF7B3]/50 text-[#5C3609] p-8 h-[5cm] rounded-full shadow-lg hover:scale-110 transition-transform duration-300 cursor-pointer flex  justify-center  items-center">
                  <FaPlay className="text-6xl" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-2  gap-5 h-[30%]">
          <Link href="/">
            <div className="w-[10cm] h-[4cm] bg-[#FCF7B3] text-[#5C3609] hover:scale-105 transition-transform duration-300  border-[3px] border-white rounded-4xl flex justify-center items-center">
              <div style={{ fontFamily: "Rationale" }} className="text-center">
                <div className="text-4xl  font-bold inline-block  mr-[5cm]">
                  See
                </div>
                <div className="text-4xl font-extrabold mr-[2cm] ">How</div>

                <span className="text-4xl font-bold ml-[2cm]"> It Looks ?</span>
              </div>
            </div>
          </Link>

          <div className="w-[16cm] h-[3cm] border-[3px] border-white rounded-4xl flex justify-center items-center ">
            <OauthProvider />
          </div>

          <Link href="/signup">
            <div className="w-[10cm] h-[4cm] text-black bg-[#DEFF96] hover:scale-105 transition-transform duration-300  border-[3px] border-white rounded-4xl flex justify-center items-center cursor-pointer ">
              <span
                style={{ fontFamily: "DynaPuff" }}
                className="text-5xl font-bold"
              >
                Get Started
              </span>
              <span className="rounded-full bg-[#F5C3FE] text-[#5C3609] text-4xl h-[70px] w-[70px] flex justify-center items-center border-[4px] border-[#5C3609]">
                <ArrowUp />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
