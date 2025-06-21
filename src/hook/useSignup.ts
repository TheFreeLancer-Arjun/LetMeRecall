import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import axiosInstance from "../lib/axiosInstance";

interface FormData {
  email: string;
  username: string;
  password: string;
}

export const useSignup = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (form: FormData) => {
    setError("");
    setLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/signup", form);
      localStorage.setItem("activeAccountId", res.data.activeAccountId);
          router.push(`/account/${res.data.activeAccountId}/dashboard`);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 409) {
          setError("User already exists. Please login.");
        } else {
          setError(err.response?.data?.message || "Signup failed. Please try again.");
        }
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return { handleSignup, error, loading };
};
