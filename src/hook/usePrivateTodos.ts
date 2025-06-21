// src/hooks/usePrivateTodos.ts
import { useEffect, useState } from "react";
import axiosInstance from "../lib/axiosInstance";
import { isAxiosError } from "axios";

// Optional: define the shape of your todo
export interface TodoType {
  id: string;
  title: string;
  description?: string;
  links?: string[];
  priority?: "high" | "medium" | "low";
  visibility?: "private" | "public";
  date?: string;
  time?: string;
}

export const usePrivateTodos = (accountId: string | null) => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPrivateTodos = async () => {
    if (!accountId) return;

    setLoading(true);
    setError(null);

    try {
      const res = await axiosInstance.get("/todo/private", {
        params: { accountId },
      });

      // Defensive parsing
      const responseData = Array.isArray(res.data)
        ? res.data
        : res.data.todos || [];

      setTodos(responseData);
    } catch (err) {
      if (isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to fetch private todos");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrivateTodos();
  }, [accountId]);

  return { todos, loading, error, refetch: fetchPrivateTodos };
};
