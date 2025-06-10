"use client";

import React, { useState } from "react";
import Calendar from "@/app/dashboard/components/calendar";
import Sidebar from "@/app/dashboard/components/SideBar";
import StickyWall from "@/app/dashboard/components/sticky";
import Task from "@/app/dashboard/components/task";
import Upcoming from "@/app/dashboard/components/upcommimg";

export default function Dashboard() {
  const [selectedSection, setSelectedSection] = useState<"upcoming" | "today" | "calendar" | "sticky" | "custom">("upcoming");
  const [customLists, setCustomLists] = useState<string[]>([]);
  const [activeListName, setActiveListName] = useState<string | null>(null);

  const handleAddNewList = () => {
    const name = prompt("Enter list name");
    if (name) {
      setCustomLists([...customLists, name]);
      setSelectedSection("custom");
      setActiveListName(name);
    }
  };

  const handleListClick = (name: string) => {
    setSelectedSection("custom");
    setActiveListName(name);
  };

  return (
    <div className="flex p-3 justify-center items-center gap-5 rounded-3xl">
      {/* Sidebar */}
      <Sidebar
        selectedSection={selectedSection}
        setSelectedSection={setSelectedSection}
        customLists={customLists}
        handleAddNewList={handleAddNewList}
        handleListClick={handleListClick}
      />

      {/* Main Section */}
      <div className="flex-1 flex rounded-2xl bg-gray-100 font-sans overflow-y-auto max-h-screen">
        {selectedSection === "upcoming" && <Upcoming />}
        {selectedSection === "today" && <Task title="Today" />}
        {selectedSection === "calendar" && <Calendar />}
        {selectedSection === "sticky" && <StickyWall />}
        {selectedSection === "custom" && activeListName && (
          <Task title={activeListName} />
        )}
      </div>
    </div>
  );
}
