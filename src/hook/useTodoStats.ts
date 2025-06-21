// src/hooks/useTodoStats.ts
import { useEffect, useState } from "react";
import axiosInstance from "../lib/axiosInstance";
import { isAxiosError } from "axios";

type StatsData = {
  total: number;
  done: number;
  rejected: number;
  pending: number;
  growthPercent: string;
  bestResult: number;
  overallScore: string;
  username: string;
};

export const useTodoStats = (accountId: string | null) => {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    if (!accountId) return;

    setLoading(true);
    setError(null);

    try {
      const res = await axiosInstance.get("/todo/stats", {
        params: { accountId },
      });

      setStats(res.data);
    } catch (err) {
      if (isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to fetch stats");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [accountId]);

  return { stats, loading, error, refetch: fetchStats };
};
