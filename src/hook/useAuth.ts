// src/hooks/useAuth.ts
import { useEffect, useState } from "react";
import axiosInstance from "../lib/axiosInstance";

// Define user and account types
type Account = {
  id: string;
  username: string;
  // Add more fields if needed
};

type User = {
  id: string;
  name: string;
  email: string;
  accounts: Account[];
  activeAccountId: string;
  // Add other user fields as per your backend response
};

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeAccountId, setActiveAccountId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    try {
      const res = await axiosInstance.get("/auth/user/me");
      const fetchedUser: User = res.data.user;
      setUser(fetchedUser);
      setActiveAccountId(fetchedUser.activeAccountId);
      setError(null); // Clear any previous error
    } catch (err: any) {
      console.error("❌ Auth error:", err);
      setError(err.response?.data?.message || "Failed to fetch user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return {
    user,
    activeAccountId,
    loading,
    error,
    setUser,
    setActiveAccountId,
    refetchUser: fetchUser,
  };
};
