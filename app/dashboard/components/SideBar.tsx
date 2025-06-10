"use client";

import React from "react";
import { FaCalendarAlt, FaStickyNote } from "react-icons/fa";

interface SidebarProps {
  selectedSection: string;
  setSelectedSection: (section: string) => void;
  customLists: string[];
  handleAddNewList: () => void;
  handleListClick: (name: string) => void;
}

export default function Sidebar({
  selectedSection,
  setSelectedSection,
  customLists,
  handleAddNewList,
  handleListClick,
}: SidebarProps) {
  return (
    <aside className="w-[300px] h-[18.5cm] shadow-lg rounded-2xl p-10 flex flex-col justify-between bg-green-400">
      <div>
        <h1 className="text-2xl font-bold mb-4 text-white">Menu</h1>
        <input
          type="text"
          placeholder="Search"
          className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-lg outline-none"
        />

        {/* Tasks Section */}
        <section className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-white">Tasks</h3>
          </div>
          <ul className="space-y-2 pl-2 text-gray-700">
            <li
              className={`cursor-pointer px-2 py-1 rounded ${
                selectedSection === "upcoming"
                  ? "bg-indigo-100 text-indigo-700 font-semibold"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => setSelectedSection("upcoming")}
            >
              📅 Upcoming <span className="text-sm text-gray-500 ml-1">12</span>
            </li>
            <li
              className={`cursor-pointer px-2 py-1 rounded ${
                selectedSection === "today"
                  ? "bg-indigo-100 text-indigo-700 font-semibold"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => setSelectedSection("today")}
            >
              📌 Today <span className="text-sm text-gray-500 ml-1">5</span>
            </li>
            <li
              className={`cursor-pointer flex items-center px-2 py-1 rounded ${
                selectedSection === "calendar"
                  ? "bg-indigo-100 text-indigo-700 font-semibold"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => setSelectedSection("calendar")}
            >
              <FaCalendarAlt className="mr-2" /> Calendar
            </li>
            <li
              className={`cursor-pointer flex items-center px-2 py-1 rounded ${
                selectedSection === "sticky"
                  ? "bg-indigo-100 text-indigo-700 font-semibold"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => setSelectedSection("sticky")}
            >
              <FaStickyNote className="mr-2" /> Sticky Wall
            </li>
          </ul>
        </section>

        {/* Lists Section */}
        <section className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-white">Lists</h3>
          </div>
          <ul className="space-y-2 pl-2 text-gray-700">
            <li
              className="cursor-pointer hover:bg-gray-100 text-red-600 rounded px-2 py-1"
              onClick={() => handleListClick("Personal")}
            >
              ● Personal
            </li>
            <li
              className="cursor-pointer hover:bg-gray-100 text-blue-600 rounded px-2 py-1"
              onClick={() => handleListClick("Work")}
            >
              ● Work
            </li>
            <li
              className="cursor-pointer hover:bg-gray-100 text-yellow-600 rounded px-2 py-1"
              onClick={() => handleListClick("List 1")}
            >
              ● List 1
            </li>
            {customLists.map((list, index) => (
              <li
                key={index}
                className="cursor-pointer hover:bg-gray-100 rounded px-2 py-1"
                onClick={() => handleListClick(list)}
              >
                ● {list}
              </li>
            ))}
            <li
              className="cursor-pointer hover:bg-gray-100 rounded px-2 py-1 text-white"
              onClick={handleAddNewList}
            >
              + Add New List
            </li>
          </ul>
        </section>
      </div>
    </aside>
  );
}
