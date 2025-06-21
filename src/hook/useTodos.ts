// src/hooks/useTodos.ts
import { useEffect, useState } from "react";
import axiosInstance from "../lib/axiosInstance";
import { isAxiosError } from "axios";

export interface TodoType {
  id: string; // ❗️ not optional
  title: string;
  description?: string;
  links?: string[];
  priority?: "high" | "medium" | "low";
  visibility?: "public" | "private";
  tags: string[]; // ✅ type this properly
  date?: string;
  time?: string;
  list: "personal" | "work";
  subTasks: string[];
  accountId: string; // ✅ Required for Panel
}


type FetchType = "today" | "tomorrow" | "week";

export const useTodos = (type: FetchType, accountId: string | null) => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = async () => {
    if (!accountId) return;

    setLoading(true);
    setError(null);

    try {
      const res = await axiosInstance.get(`/todo/${type}`, {
        params: { accountId },
      });

      const result = Array.isArray(res.data)
        ? res.data
        : res.data.tasks || [];

      setTodos(result);
    } catch (err) {
      if (isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to fetch todos");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [accountId, type]);

  return { todos, loading, error, refetch: fetchTodos };
};
