"use client";

import { createContext, useContext } from "react";
import { useAuthLogic } from "../hook/useAuthLogic";

export type Account = {
  id: string;
  username: string;
};

export type User = {
  id: string;
  email: string;
  accounts: Account[];
};

export type AuthContextType = {
  user: User | null;
  activeAccountId: string | null;
  setUser: (user: User | null) => void;
  setActiveAccountId: (id: string) => void;
  loading: boolean;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuthLogic();

  return (
    <AuthContext.Provider value={auth}>
      {!auth.loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
