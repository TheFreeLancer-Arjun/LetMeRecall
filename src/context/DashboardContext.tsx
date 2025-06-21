// src/context/DashboardContext.tsx

"use client";

import React, { createContext, useContext, useState } from "react";

export type SectionType =
  | "upcoming"
  | "today"
  | "calendar"
  | "sticky"
  | "custom";

interface DashboardContextType {
  selectedSection: SectionType;
  setSelectedSection: (section: SectionType) => void;
  customLists: string[];
  setCustomLists: React.Dispatch<React.SetStateAction<string[]>>;
  activeListName: string | null;
  setActiveListName: React.Dispatch<React.SetStateAction<string | null>>;
}

const DashboardContext = createContext<DashboardContextType | null>(null);

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within DashboardProvider");
  }
  return context;
};

export const DashboardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedSection, setSelectedSection] =
    useState<SectionType>("upcoming");
  const [customLists, setCustomLists] = useState<string[]>([]);
  const [activeListName, setActiveListName] = useState<string | null>(null);

  return (
    <DashboardContext.Provider
      value={{
        selectedSection,
        setSelectedSection,
        customLists,
        setCustomLists,
        activeListName,
        setActiveListName,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
