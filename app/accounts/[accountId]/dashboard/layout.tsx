// app/aacount/[accountid]/dashboard/layout.tsx

"use client";

import React from "react";
import Sidebar from "../../../../src/components/SideBar";
import { DashboardProvider } from "../../../../src/context/DashboardContext";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardProvider>
      <div className="flex rounded-3xl">
        <div className="">
          <Sidebar />
        </div>
        <div className="flex-1 flex overflow-y-scroll  max-h-screen">
          {children}
        </div>
      </div>
    </DashboardProvider>
  );
}
