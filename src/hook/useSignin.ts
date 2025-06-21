import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import axiosInstance from "../lib/axiosInstance"; // Adjust if needed

interface SigninForm {
  email: string;
  password: string;
}

export const useSignin = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignin = async (form: SigninForm) => {
    setError("");
    setLoading(true);

    try {
      const res = await axiosInstance.post("/auth/user/signin", form);

      if (res.status === 200) {
        const accountId = res.data?.user?.accounts?.[0]?.id;

        if (accountId) {
          localStorage.setItem("activeAccountId", accountId);
          router.push(`/accounts/${accountId}/dashboard`);
        } else {
          throw new Error("Account ID not found");
        }
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        if (status === 404 || status === 401) {
          setError("User not found. Redirecting to signup...");
          setTimeout(() => router.push("/signup"), 2000);
        } else {
          setError(err.response?.data?.message || "Signin failed.");
        }
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return { handleSignin, error, loading };
};
