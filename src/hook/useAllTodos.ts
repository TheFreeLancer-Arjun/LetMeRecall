import { useEffect, useState } from "react";
import axiosInstance from "../lib/axiosInstance";
import { isAxiosError } from "axios";

export type TaskType = {
  id: string;
  title: string;
  date: string;
};

export const useAllTodos = (accountId: string) => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const fetchTodos = async () => {
    if (!accountId) return;

    setLoading(true);
    try {
      const res = await axiosInstance.get<{ todos: TaskType[] }>("/todo/all", {
        params: { accountId },
      });
      setTasks(res.data.todos);
      setError("");
    } catch (err) {
      console.error("❌ Error fetching all todos:", err);
      if (isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to load todos");
      } else {
        setError("Unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [accountId]);

  return { tasks, error, loading, refetch: fetchTodos };
};
