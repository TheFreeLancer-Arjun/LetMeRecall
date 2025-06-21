"use client";

import React, { useState } from "react";
import {
  FaBars,
  FaCalendarAlt,
  FaStickyNote,
  FaRegClock,
  FaCalendarDay,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";
import { Plus, SwitchCamera, Trash2 } from "lucide-react";
import { useDashboard } from "../context/DashboardContext";
import { useAccounts } from "../hook/useAccounts";
import Image from "next/image";

// AvatarCircle component
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
        />
      )}
    </div>
  );
};

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const {
    user,
    activeAccountId,
    showModal,
    setShowModal,
    newAccountName,
    setNewAccountName,
    addAccount,
    switchAccount,
    deleteAccount,
  } = useAccounts();

  const { selectedSection, setSelectedSection } = useDashboard();

  const activeUser = user?.accounts?.find((acc) => acc.id === activeAccountId);

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
      icon: <FaCalendarDay className="text-xl" />,
      iconBg: "bg-[#FCF7B3]",
    },
    {
      key: "calendar",
      title: "Calendar",
      description: "Your full monthly calendar",
      icon: <FaCalendarAlt className="text-xl" />,
      iconBg: "bg-[#FCF7B3]",
    },
    {
      key: "sticky",
      title: "Sticky Notes",
      description: "Create and manage notes",
      icon: <FaStickyNote className="text-xl" />,
      iconBg: "bg-[#FCF7B3]",
    },
  ];

  return (
    <aside
      className={`${
        isCollapsed ? "w-[130px]" : "w-[370px]"
      } transition-all duration-300 h-screen p-4 flex flex-col justify-between bg-[#FCF7B3] border-[3px] border-[#5C3609] rounded-3xl relative`}
    >
      {/* ✅ FaBars for Small Screens */}
      <div className="absolute top-4 left-4 z-50 block lg:hidden">
        <FaBars
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-[#5C3609] text-2xl cursor-pointer"
        />
      </div>

      <div>
        {/* 👤 Active User Name */}
        <div
          style={{ fontFamily: "Rationale" }}
          className="text-center font-medium text-[#5C3609] p-2 text-2xl"
        >
          {activeUser?.username || "Your Account"}
        </div>

        {/* 🔍 Search Bar + Avatar */}
        <div className="w-full flex justify-center mt-4">
          <div className="flex items-center w-full py-2 rounded-full shadow-md bg-white border border-gray-300 focus-within:shadow-lg transition-shadow p-2 relative group">
            {/* 🖐 Toggle Collapse Icon */}
            <div className="hidden lg:block">
              {isCollapsed ? (
                <FaAngleRight
                  onClick={() => setIsCollapsed(false)}
                  className="text-[#5C3609] text-2xl cursor-pointer font-light ml-2"
                />
              ) : (
                <FaAngleLeft
                  onClick={() => setIsCollapsed(true)}
                  className="text-[#5C3609] text-2xl cursor-pointer font-light ml-2"
                />
              )}
            </div>

            {!isCollapsed && (
              <input
                type="text"
                placeholder="Search in accounts"
                className="flex-1 text-[#5C3609] placeholder-[#5C3609]/80 focus:outline-none text-base ml-2.5 w-[2cm]"
              />
            )}

            {/* Avatar and Dropdown */}
            <div className="flex items-center justify-center relative ml-2">
              {!isCollapsed && (
                <AvatarCircle
                  size={35}
                  imageUrl={activeUser?.image || ""}
                  username={activeUser?.username || ""}
                />
              )}

              {!isCollapsed && (
                <div className="absolute top-12 z-50 w-72 bg-white rounded-2xl p-4 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <div className="flex justify-between items-center mb-3">
                    <h1 className="text-sm font-bold text-[#5C3609]">
                      Accounts
                    </h1>
                    <button
                      onClick={() => setShowModal(true)}
                      className="bg-blue-500 text-white px-2 py-1 rounded text-sm flex items-center gap-1"
                    >
                      <Plus size={16} /> Add
                    </button>
                  </div>
                  <ul className="space-y-2 max-h-60 overflow-y-auto">
                    {user?.accounts?.map((account) => (
                      <li
                        key={account.id}
                        className={`flex justify-between items-center p-2 rounded-xl ${
                          account.id === activeAccountId
                            ? "bg-[#FCF7B3] text-[#5C3609] font-semibold"
                            : "bg-gray-100 text-black"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <AvatarCircle
                            size={32}
                            imageUrl={account.image}
                            username={account.username}
                          />
                          <span>{account.username}</span>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => switchAccount(account.id)}
                            className="bg-green-200 p-1 rounded"
                            title="Switch"
                          >
                            <SwitchCamera size={16} />
                          </button>
                          <button
                            onClick={() => deleteAccount(account.id)}
                            className="bg-red-200 p-1 rounded"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ➕ Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-96">
              <h2 className="text-xl font-semibold mb-4 text-black">
                Add New Account
              </h2>
              <input
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
      </div>

      {/* 📋 Bottom Menu */}
      <div className="bg-white h-full rounded-t-3xl mt-6 flex justify-center items-start">
        <ul className="space-y-4 p-4">
          {menuItems.map((item) => (
            <li
              key={item.key}
              className={`cursor-pointer flex items-center gap-4 p-4 rounded-2xl transition-all ${
                selectedSection === item.key
                  ? "bg-[#FCF7B3] font-semibold"
                  : "hover:bg-[#F5C3FE]/20"
              }`}
              onClick={() => setSelectedSection(item.key)}
            >
              <div
                className={`p-3 rounded-full ${item.iconBg} flex items-center justify-center text-[#5C3609]`}
              >
                {item.icon}
              </div>
              {!isCollapsed && (
                <div className="flex flex-col">
                  <span className="text-base font-medium text-[#5C3609]">
                    {item.title}
                  </span>
                  <span className="text-sm opacity-80 font-light">
                    {item.description}
                  </span>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
