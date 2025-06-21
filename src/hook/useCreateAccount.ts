// src/hooks/useCreateAccount.ts
import { useState } from "react";
import axiosInstance from "../lib/axiosInstance";
import { isAxiosError } from "axios";

// (Optional) define Account type if you expect response
type Account = {
  id: string;
  username: string;
  // add more fields if needed
};

export const useCreateAccount = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createAccount = async (username: string): Promise<Account | null> => {
    setLoading(true);
    setError(null);

    try {
      const res = await axiosInstance.post("/auth/user/accounts", { username });
      return res.data.account as Account;
    } catch (err) {
      if (isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to create account");
      } else {
        setError("An unknown error occurred");
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    createAccount,
    loading,
    error,
  };
};
