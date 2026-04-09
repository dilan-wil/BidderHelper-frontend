"use client";

import { createContext, useContext, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { User } from "@/lib/types";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  signup: (
    name: string,
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const {
    setUser,
    setToken,
    setAuthenticated,
    setLoading,
    clearAuth,
    user,
    isAuthenticated,
    isLoading,
  } = useAppStore();

  const login = async (email: string, password: string) => {
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.message || "Login failed" };
      }

      setUser(data.user);
      setToken(data.token);
      setAuthenticated(true);
      localStorage.setItem("token", data.token);

      return { success: true };
    } catch (error) {
      return { success: false, error: "Network error" };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.message || "Signup failed" };
      }

      setUser(data.user);
      setToken(data.token);
      setAuthenticated(true);
      localStorage.setItem("token", data.token);

      return { success: true };
    } catch (error) {
      return { success: false, error: "Network error" };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    clearAuth();
    localStorage.removeItem("token");
    router.push("/auth/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isLoading, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
