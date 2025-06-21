// src/hooks/useAccounts.ts
import { useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "../lib/axiosInstance";
import { useAuth } from "../components/AuthContext"; // adjust path if needed
import { isAxiosError } from "axios";

export interface Account {
  id: string;
  username: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  accounts: Account[];
}

export const useAccounts = () => {
  const { user, setUser, activeAccountId, setActiveAccountId } = useAuth();
  const router = useRouter();

  const [newAccountName, setNewAccountName] = useState("");
  const [showModal, setShowModal] = useState(false);

  const addAccount = async () => {
    if (!newAccountName.trim()) return;

    try {
      const res = await axiosInstance.post("/auth/user/account", {
        username: newAccountName,
      });

      const newAccount = res.data.account;

      if (user) {
        const updatedUser = {
          ...user,
          accounts: [...user.accounts, newAccount],
        };
        setUser(updatedUser);
        setNewAccountName("");
        setShowModal(false);
      }
    } catch (err) {
      if (isAxiosError(err)) {
        alert(err.response?.data?.message || "Failed to create account");
      } else {
        alert("An unexpected error occurred");
      }
    }
  };

  const switchAccount = async (id: string) => {
    try {
      await axiosInstance.post("/auth/user/switch-account", {
        accountId: id,
      });
      setActiveAccountId(id);
      router.push(`/accounts/${id}/dashboard`);
    } catch (err) {
      if (isAxiosError(err)) {
        console.error("❌ Switch failed:", err.message);
      } else {
        console.error("❌ Unexpected switch error");
      }
    }
  };

  const deleteAccount = async (id: string) => {
    try {
      await axiosInstance.delete(`/auth/user/account/${id}`);
      if (!user) return;

      const updatedAccounts = user.accounts.filter((acc) => acc.id !== id);
      setUser({ ...user, accounts: updatedAccounts });

      if (activeAccountId === id && updatedAccounts.length > 0) {
        await switchAccount(updatedAccounts[0].id);
      }
    } catch (err) {
      if (isAxiosError(err)) {
        alert(err.response?.data?.message || "Failed to delete account");
      } else {
        alert("An unexpected error occurred");
      }
    }
  };

  return {
    user,
    accounts: user?.accounts || [], // ✅ ADDED HERE
    activeAccountId,
    showModal,
    setShowModal,
    newAccountName,
    setNewAccountName,
    addAccount,
    switchAccount,
    deleteAccount,
  };
};
