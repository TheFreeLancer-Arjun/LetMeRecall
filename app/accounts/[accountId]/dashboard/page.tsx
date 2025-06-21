// ✅ DashboardPage.tsx
"use client";

import React, { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/src/components/AuthContext";
import { useDashboard } from "@/src/context/DashboardContext";

import Upcoming from "@/src/components/upcommimg";
import Task from "@/src/components/task";
import StickyWall from "@/src/components/sticky";
import Calendar from "@/src/components/calendar";

export default function DashboardPage() {
  const { accountId } = useParams();
  const router = useRouter();
  const auth = useAuth();
  const { selectedSection, activeListName } = useDashboard();

  useEffect(() => {
    if (!auth?.loading && !auth?.isAuthenticated) {
      router.push("/signin");
    }
  }, [auth?.loading, auth?.isAuthenticated, router]);

  if (auth?.loading || !auth?.user || !accountId) {
    return (
      <div className="p-14">
        <div className="w-screen h-screen bg-gray-100 rounded-2xl flex items-center justify-center">
          <p className="text-lg text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {selectedSection === "upcoming" && <Upcoming />}  {/* ✅ No props passed */}
      {selectedSection === "today" && <Task title="Today" />}
      {selectedSection === "calendar" && <Calendar />}
      {selectedSection === "sticky" && <StickyWall />}
      {selectedSection === "custom" && activeListName && (
        <Task title={activeListName} />
      )}
    </>
  );
}