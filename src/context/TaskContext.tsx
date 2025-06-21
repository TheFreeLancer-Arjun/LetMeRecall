"use client";

import React, {
  createContext,
  useContext,
  ReactNode,
} from "react";
import { useTodos, TodoType } from "../hook/useTodos"; // Adjust path if needed

type TaskContextType = {
  todayTasks: TodoType[];
  tomorrowTasks: TodoType[];
  weekTasks: TodoType[];
  refetchAll: () => void;
  loading: boolean;
  error: string | null;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

interface TaskProviderProps {
  accountId: string;
  children: ReactNode;
}

export const TaskProvider = ({ accountId, children }: TaskProviderProps) => {
  const {
    todos: todayTasks,
    loading: loadingToday,
    error: errorToday,
    refetch: refetchToday,
  } = useTodos("today", accountId);

  const {
    todos: tomorrowTasks,
    loading: loadingTomorrow,
    error: errorTomorrow,
    refetch: refetchTomorrow,
  } = useTodos("tomorrow", accountId);

  const {
    todos: weekTasks,
    loading: loadingWeek,
    error: errorWeek,
    refetch: refetchWeek,
  } = useTodos("week", accountId);

  const refetchAll = () => {
    refetchToday();
    refetchTomorrow();
    refetchWeek();
  };

  const loading = loadingToday || loadingTomorrow || loadingWeek;
  const error = errorToday || errorTomorrow || errorWeek;

  return (
    <TaskContext.Provider
      value={{
        todayTasks,
        tomorrowTasks,
        weekTasks,
        refetchAll,
        loading,
        error,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};
