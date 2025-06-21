// src/hooks/useTodosWithMedia.ts
import { useEffect, useState } from "react";
import axiosInstance from "../lib/axiosInstance";
import { isAxiosError } from "axios";

// ✅ Define the shape of a Todo object
export interface TodoType {
  id: string;
  title: string;
  description?: string;
  mediaUrls?: string[]; // optional, if media URLs are returned
  date?: string;
  time?: string;
  visibility?: "public" | "private";
  priority?: "high" | "medium" | "low";
}

export const useTodosWithMedia = (accountId: string | null) => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTodosWithMedia = async () => {
    if (!accountId) return;

    setLoading(true);
    setError(null);

    try {
      const res = await axiosInstance.get("/todo/with-media", {
        params: { accountId },
      });

      const result = Array.isArray(res.data)
        ? res.data
        : res.data.todos || [];

      setTodos(result);
    } catch (err) {
      if (isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to fetch media todos");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodosWithMedia();
  }, [accountId]);

  return { todos, loading, error, refetch: fetchTodosWithMedia };
};
