"use client";

import React, { useState, useEffect } from "react";
import {
  FaCalendarAlt,
  FaStickyNote,
  FaRegClock,
  FaCalendarDay,
  FaBars,
} from "react-icons/fa";
import Image from "next/image";

type Account = {
  id: string;
  username: string;
  image?: string;
};

type SidebarProps = {
  selectedSection: string;
  setSelectedSection: (section: string) => void;
};

const AvatarCircle = ({
  size = 52,
  imageUrl = "",
  username = "",
}: {
  size?: number;
  imageUrl?: string;
  username?: string;
}) => {
  const fallbackText = username ? username.charAt(0).toUpperCase() : "?";
  const showFallback = !imageUrl;

  return (
    <div
      className="relative rounded-full flex justify-center items-center font-semibold text-white bg-[#1C0424] overflow-hidden"
      style={{ width: size, height: size, fontSize: size / 2 }}
    >
      {showFallback ? (
        fallbackText
      ) : (
        <Image
          src={imageUrl}
          alt={username}
          width={size}
          height={size}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      )}
    </div>
  );
};

const menuItems = [
  {
    key: "upcoming",
    title: "Upcoming",
    description: "View upcoming tasks and events",
    icon: <FaRegClock className="text-xl" />,
    iconBg: "bg-[#FCF7B3]",
  },
  {
    key: "today",
    title: "Today",
    description: "What’s scheduled for today",
    icon: <FaCalendarDay className="text-xl " />,
    iconBg: "bg-[#FCF7B3]",
  },
  {
    key: "calendar",
    title: "Calendar",
    description: "Your full monthly calendar",
    icon: <FaCalendarAlt className="text-xl " />,
    iconBg: "bg-[#FCF7B3]",
  },
  {
    key: "sticky",
    title: "Sticky Notes",
    description: "Create and manage notes",
    icon: <FaStickyNote className="text-xl " />,
    iconBg: "bg-[#FCF7B3]",
  },
];

export default function Sidebar({
  selectedSection,
  setSelectedSection,
}: SidebarProps) {
  const [accounts, setAccounts] = useState<Account[]>([
    {
      id: "1",
      username: "Ajay",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn1jaJxrjkKQIhYMNOSwmZON_AN8FU_6QzlA&s",
    },
    {
      id: "2",
      username: "Priya",
      image:
        "https://1.bp.blogspot.com/-7akQY6xjEIU/TkAxigFmKnI/AAAAAAAACwI/EZ5ibmhoWIo/s1600/hollywood+actress+hot3.jpg",
    },
    {
      id: "3",
      username: "Iriya",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe8K2U0EXEZoBJoPjWFjmHIL0r1CCUIt_g-g&s",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newAccountName, setNewAccountName] = useState("");

  const addAccount = () => {
    if (!newAccountName.trim()) return;
    const newAcc = {
      id: Date.now().toString(),
      username: newAccountName.trim(),
    };
    setAccounts((prev) => [...prev, newAcc]);
    setNewAccountName("");
    setShowModal(false);
  };

  useEffect(() => {
    if (showModal) {
      setTimeout(() => {
        document.getElementById("new-account-input")?.focus();
      }, 100);
    }
  }, [showModal]);

  return (
    <aside className="w-full  h-screen flex flex-col bg-[#FCF7B3] rounded-4xl border-[3px] border-[#5C3609] overflow-hidden">
      {/* Your Accounts label */}
      <div
           style={{ fontFamily: "Rationale" }}
      className="text-center font-medium text-[#5C3609] p-4 text-2xl">
        Your Accounts
      </div>

      {/* Search Bar */}
      <div className="w-full flex justify-center p-3">
        <div className="flex items-center w-full max-w-2xl px-4 py-2 rounded-full shadow-md bg-white border border-gray-300 focus-within:shadow-lg transition-shadow">
          <FaBars className="text-[#5C3609] text-xl mr-3 cursor-pointer font-light" />
          <input
            type="text"
            placeholder="Search in accounts"
            className="flex-1 text-[#5C3609] placeholder-[#5C3609]/80 bg-transparent focus:outline-none text-base"
          />
          <div className="flex items-center justify-center bg-[#FCF7B3] w-10 h-10 rounded-full cursor-pointer hover:bg-[#FAB981] transition-colors">
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGv7iOCr9fVQsZg0U-OgCqn2jxcLxWnuxW-Q&s"
              alt="User Avatar"
              width={35}
              height={35}
              className="rounded-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Modal for Adding New Account */}
      {showModal && (
        <div className="absolute left-[320px] top-10 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-64">
            <h2 className="text-xl font-semibold mb-4 text-[#FCF7B3]">
              Add New Account
            </h2>
            <input
              id="new-account-input"
              value={newAccountName}
              onChange={(e) => setNewAccountName(e.target.value)}
              className="w-full border px-3 py-2 rounded mb-4"
              placeholder="Enter account name"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={addAccount}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Menu Title */}
      <h2 className="text-xl font-medium text-[#5C3609] ml-3 mt-4 mb-2">Menu</h2>

      {/* Menu Items */}
      <div className="bg-white h-full rounded-t-3xl    ">
        <ul className="space-y-4">
          {menuItems.map((item) => (
            <li
              key={item.key}
              className={`cursor-pointer flex items-center gap-4 p-4 rounded-2xl transition-all ${
                selectedSection === item.key
                  ? "bg-[#FCF7B3] font-semibold "
                  : "hover:bg-[#F5C3FE]/20 "
              }`}
              onClick={() => setSelectedSection(item.key)}
            >
              <div
                className={`p-3 rounded-full ${item.iconBg} flex items-center justify-center text-[#5C3609]`}
              >
                {item.icon}
              </div>
              <div className="flex flex-col">
                <span className="text-base font-medium text-[#5C3609] ">{item.title}</span>
                <span className="text-sm opacity-80 font-light">
                  {item.description}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
