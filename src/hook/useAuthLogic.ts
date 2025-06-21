import { useEffect, useState } from "react";
import axios from "../lib/axiosInstance";
import type { User } from "../components/AuthContext";

export const useAuthLogic = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeAccountId, setActiveAccountId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const getSession = async () => {
      try {
        const res = await axios.get("/auth/user/session");

        if (res.data.message.isAuthenticated) {
          const userData: User = res.data.message.user;
          setUser(userData);
          setIsAuthenticated(true);

          const storedId = localStorage.getItem("activeAccountId");
          const defaultId = userData.accounts[0]?.id;
          const idToUse = storedId || defaultId;

          if (idToUse) {
            setActiveAccountId(idToUse);
            localStorage.setItem("activeAccountId", idToUse);
          }
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("❌ Session check failed:", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    getSession();
  }, []);

  useEffect(() => {
    if (activeAccountId) {
      localStorage.setItem("activeAccountId", activeAccountId);
    }
  }, [activeAccountId]);

  return {
    user,
    activeAccountId,
    setUser,
    setActiveAccountId,
    loading,
    isAuthenticated,
  };
};
