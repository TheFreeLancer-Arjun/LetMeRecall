"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import {
  FaBars,
  FaTasks,
  FaSearch,
  FaFlag,
  FaListAlt,
  FaCodeBranch,
  FaLock,
} from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

export default function Runway() {
  const containerRef = useRef(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    cardRefs.current.forEach((card, index) => {
      gsap.fromTo(
        card,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
          delay: index * 0.1,
        }
      );
    });
  }, []);

  return (
    <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-6 p-2">
      {/* Left Section - Scroll Cards */}
      <div
        className="w-[16cm] h-[20cm] bg-[#FCF7B3] text-black rounded-3xl flex flex-col justify-start items-center shadow-lg gap-5 overflow-y-auto pt-5 scroll-smooth custom-scrollbar border-[3px]"
        ref={containerRef}
      >
        <div>
          {/* Title */}
          <div
            style={{ fontFamily: "Rationale" }}
            className="text-center font-medium text-[#5C3609] text-2xl"
          >
            Features In Ower Todo App
          </div>

          {/* Search Bar */}
          <div className="w-[11cm] flex justify-center p-3">
            <div className="flex items-center w-full max-w-2xl px-4 py-2 rounded-full shadow-md bg-white border border-gray-300 focus-within:shadow-lg transition-shadow">
              <FaBars className="text-[#5C3609] text-xl mr-3 cursor-pointer font-light" />
              <input
                type="text"
                placeholder="Search in accounts"
                className="flex-1 text-[#5C3609] placeholder-[#5C3609]/80 bg-transparent focus:outline-none text-base"
              />
              <div className="flex items-center justify-center bg-gray-200 w-10 h-10 rounded-full cursor-pointer hover:bg-amber-500 transition-colors">
                <Image
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGv7iOCr9fVQsZg0U-OgCqn2jxcLxWnuxW-Q&s"
                  alt="User Avatar"
                  width={30}
                  height={30}
                  className="rounded-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-xl font-medium text-[#5C3609] flex justify-start items-center w-full pl-5">
          Features
        </h2>

        <div className="bg-white p-2 rounded-t-4xl pt-[cm]">
          {cards.map((card, index) => (
            <div
              key={index}
              className="pl-6 opacity-0 mb-5"
              ref={(el) => {
                if (el) cardRefs.current[index] = el;
              }}
            >
              <div className="flex justify-start items-end gap-1  mt-10">
                {card.leftCircle && (
                  <div
                    className="h-11 w-11 rounded-full flex justify-center items-center text-2xl text-white"
                    style={{ backgroundColor: card.color }}
                  >
                    {card.icon && React.createElement(card.icon)}
                  </div>
                )}
                <div>
                  <h1 className="text-md pl-4 mb-2 text-start font-medium text-[#5C3609]">
                    {card.title}
                  </h1>
                  <p
                    className="text-md text-white w-[9cm] py-2 px-4 rounded-3xl "
                    style={{ backgroundColor: card.color }}
                  >
                    {card.description}
                  </p>
                </div>
                {!card.leftCircle && (
                  <div
                    className="h-11 w-11 rounded-full flex justify-center items-center text-2xl text-white"
                    style={{ backgroundColor: card.color }}
                  >
                    {card.icon && React.createElement(card.icon)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Video */}
      <div className="w-full h-[20cm] overflow-hidden rounded-3xl border-2">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          src="https://cdn.runway.com/marketing-website/product/product-reports.mp4"
        />
      </div>
    </div>
  );
}

const cards = [
  {
    title: "Add & Track Tasks",
    description:
      "Create todos with title, description, date, and time. Stay ahead of your schedule.",
    color: "#1154ED",
    leftCircle: true,
    icon: FaTasks,
  },
  {
    title: "Quick Search",
    description:
      "Instantly find any task using filters, keywords, or tag search.",
    color: "#01BAFD",
    leftCircle: false,
    icon: FaSearch,
  },
  {
    title: "Set Priorities",
    description:
      "Mark tasks as High, Medium, or Low priority so you focus on what matters.",
    color: "#347433",
    leftCircle: true,
    icon: FaFlag,
  },
  {
    title: "Smart Organization",
    description:
      "Automatically sort todos by type, priority, and tags without lifting a finger.",
    color: "#6667F8",
    leftCircle: false,
    icon: FaListAlt,
  },
  {
    title: "Add Subtasks",
    description:
      "Break big tasks into smaller subtasks for better tracking and management.",
    color: "#2B0C35",
    leftCircle: true,
    icon: FaCodeBranch,
  },
  {
    title: "Control Privacy",
    description:
      "Choose to make your task public or private — you're always in control.",
    color: "#FCB78B",
    leftCircle: false,
    icon: FaLock,
  },
];
