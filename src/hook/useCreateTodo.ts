// src/hooks/useCreateTodo.ts
import { useState } from "react";
import axiosInstance from "../lib/axiosInstance";
import { isAxiosError } from "axios";

export type CreateTodoPayload = {
  title: string;
  accountId: string;
  description?: string;
  date?: string;
  time?: string;
  subTasks: string[];
  tags: string[];
  links: string[];
  list: "personal" | "work";
  priority?: "high" | "medium" | "low";
  visibility?: "private" | "public";
};

export type Todo = {
   id: string;
  title: string;
  description?: string;
  date?: string;
  time?: string;
  list?: string;
  priority?: "low" | "medium" | "high";
  visibility?: "public" | "private";
  tags?: string[];
  subTasks?: string[]; // ✅ Add this line
  links?: any[];
  media?: any[];
  accountId?: string;
  // Add other fields as needed
};

export const useCreateTodo = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createTodo = async (data: CreateTodoPayload): Promise<Todo | null> => {
    setLoading(true);
    setError(null);

    try {
      const res = await axiosInstance.post("/todo/create", data);
      return res.data.todo as Todo;
    } catch (err) {
      if (isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to create todo");
      } else {
        setError("An unexpected error occurred");
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    createTodo,
    loading,
    error,
  };
};
