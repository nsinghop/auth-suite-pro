import { createContext, useContext, useEffect, useMemo, useState } from "react";
import api from "@/lib/axios";

interface AuthContextType {
  token: string | null;
  loading: boolean;
  login: (email: string, password: string, remember: boolean) => Promise<string>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    setToken(stored);
    setLoading(false);
  }, []);

  const login = async (email: string, password: string, remember: boolean) => {
    setLoading(true);
    try {
      const res = await api.post("/api/login/", { email, password });
      const tok: string = res.data?.token || res.data?.access || res.data?.key || "";
      if (!tok) throw new Error("Invalid response from server.");
      // Persist token
      if (remember) {
        localStorage.setItem("authToken", tok);
      } else {
        sessionStorage.setItem("authToken", tok);
      }
      setToken(tok);
      return tok;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    setToken(null);
  };

  const value = useMemo(
    () => ({ token, loading, login, logout, isAuthenticated: !!token }),
    [token, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
