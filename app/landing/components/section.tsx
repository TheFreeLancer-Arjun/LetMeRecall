"use client";

import React, { useState } from "react";
import Sidebar from "./sidebar";
import Today from "./today";


export default function Dashboard() {
  const [selectedSection, setSelectedSection] = useState("today");

  return (
    <section className=" flex pl-2 pr-2  gap-6 w-full h-screen">
      <div className="w-[23%] h-full">
        <Sidebar
          selectedSection={selectedSection}
          setSelectedSection={setSelectedSection}
        />
      </div>
      <div className="w-[75%] h-full">
        <Today />
      </div>
    </section>
  );
}
