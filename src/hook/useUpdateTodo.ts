import { useState } from "react";
import axiosInstance from "../lib/axiosInstance";
import { isAxiosError } from "axios";

// Type definitions
interface UpdateTodoInput {
  title?: string;
  priority?: "high" | "medium" | "low";
  description?: string;
  date?: string;
  time?: string;
  visibility?: "public" | "private";
  accountId: string; // ✅ REQUIRED by backend
}

interface TodoType {
  id: string;
  title: string;
  priority: "high" | "medium" | "low";
  description?: string;
  date?: string;
  time?: string;
  visibility: "public" | "private";
}

export const useUpdateTodo = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = async (
    todoId: string,
    data: UpdateTodoInput
  ): Promise<TodoType | null> => {
    setLoading(true);
    setError(null);

    try {
      if (!data.accountId) {
        throw new Error("accountId is required to update a todo.");
      }

      const res = await axiosInstance.put(`/todo/update/${todoId}`, data);
      return res.data.todo || res.data; // handle both response formats
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to update todo");
      } else {
        setError("An unexpected error occurred");
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { update, loading, error };
};
