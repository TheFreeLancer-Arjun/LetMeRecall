// src/components/AuthContext.tsx
import { createContext, useContext, useState } from "react";
import { User } from "../hook/useAccounts";

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  activeAccountId: string;
  setActiveAccountId: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [activeAccountId, setActiveAccountId] = useState("");

  return (
    <AuthContext.Provider
      value={{ user, setUser, activeAccountId, setActiveAccountId }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
