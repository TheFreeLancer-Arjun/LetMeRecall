// src/hooks/usePublicTodos.ts
import { useEffect, useState } from "react";
import axiosInstance from "../lib/axiosInstance";
import { isAxiosError } from "axios";

export interface TodoType {
  id: string;
  title: string;
  description?: string;
  links?: string[];
  priority?: "high" | "medium" | "low";
  visibility?: "public" | "private";
  date?: string;
  time?: string;
}

export const usePublicTodos = (accountId: string | null) => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPublicTodos = async () => {
    if (!accountId) return;

    setLoading(true);
    setError(null);

    try {
      const res = await axiosInstance.get("/todo/public", {
        params: { accountId },
      });

      const result = Array.isArray(res.data)
        ? res.data
        : res.data.todos || [];

      setTodos(result);
    } catch (err) {
      if (isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to fetch public todos");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublicTodos();
  }, [accountId]);

  return { todos, loading, error, refetch: fetchPublicTodos };
};
