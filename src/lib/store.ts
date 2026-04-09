import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Resume, User } from "./types";

interface AppState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  resumes: Resume[];
  isLoading: boolean;

  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setAuthenticated: (value: boolean) => void;
  setResumes: (resumes: Resume[]) => void;
  addResume: (resume: Resume) => void;
  removeResume: (id: string) => void;
  setLoading: (loading: boolean) => void;
  clearAuth: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      resumes: [],
      isLoading: false,

      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      setResumes: (resumes) => set({ resumes }),
      addResume: (resume) =>
        set((state) => ({ resumes: [resume, ...state.resumes] })),
      removeResume: (id) =>
        set((state) => ({ resumes: state.resumes.filter((r) => r.id !== id) })),
      setLoading: (isLoading) => set({ isLoading }),
      clearAuth: () => set({ user: null, token: null, isAuthenticated: false }),
    }),
    {
      name: "app-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
