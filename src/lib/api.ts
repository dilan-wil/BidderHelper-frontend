import { User, Resume } from "./types";
import { useAppStore } from "./store";

// Base URL from environment variable
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

// Helper function for fetch requests
async function request<T>(
  endpoint: string,
  options?: RequestInit
): Promise<{ data: T | null; error: string | null }> {
  try {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      return { data: null, error: error.message || "Request failed" };
    }

    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : "Network error",
    };
  }
}

// Helper for file uploads
async function uploadRequest<T>(
  endpoint: string,
  formData: FormData
): Promise<{ data: T | null; error: string | null }> {
  try {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      return { data: null, error: error.message || "Upload failed" };
    }

    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : "Network error",
    };
  }
}

// ============= Users API =============
export const userApi = {
  getMe: async () => {
    return request<User>("/users/me");
  },

  getAll: async () => {
    return request<Array<User>>("/users");
  },

  getById: async (id: string) => {
    return request<User>(`/users/${id}`);
  },

  update: async (
    id: string,
    data: { name?: string; email?: string; password?: string }
  ) => {
    return request<{
      id: string;
      name: string;
      email: string;
      createdAt: string;
    }>(`/users/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },

  delete: async (id: string) => {
    return request<{ message: string }>(`/users/${id}`, {
      method: "DELETE",
    });
  },
};

// ============= Resumes API =============
export const resumeApi = {
  upload: async (files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });
    return uploadRequest<{ results: Array<{ filename: string }> }>(
      "/resumes/upload",
      formData
    );
  },

  getAll: async () => {
    return request<Array<Resume>>("/resumes");
  },

  getById: async (id: string) => {
    return request<Resume>(`/resumes/${id}`);
  },

  delete: async (id: string) => {
    return request<{ message: string; id?: string }>(`/resumes/${id}`, {
      method: "DELETE",
    });
  },
};

// ============= Recommendations API =============
export const recommendationApi = {
  matchWithText: async (text: string) => {
    return request<{
      jobDescription: string;
      matches: Array<{ id: string; filename: string; similarity: number }>;
    }>("/recommendations/match", {
      method: "POST",
      body: JSON.stringify({ text }),
    });
  },

  matchWithFile: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    return uploadRequest<{
      jobDescription: string;
      matches: Array<{ id: string; filename: string; similarity: number }>;
    }>("/recommendations/match", formData);
  },

  getHistory: async () => {
    return request<
      Array<{
        id: string;
        jobDescription: string;
        createdAt: string;
        matches: Array<{ id: string; filename: string; similarity: number }>;
      }>
    >("/recommendations/history");
  },

  getMatchById: async (id: string) => {
    return request<{
      id: string;
      jobDescription: string;
      createdAt: string;
      matches: Array<{ id: string; filename: string; similarity: number }>;
    }>(`/recommendations/match/${id}`);
  },
};

// ============= Cover Letters API =============
export const coverLetterApi = {
  generate: async (
    resumeId: string,
    jobDescription: string,
    matchId?: string
  ) => {
    return request<{
      id: string;
      coverLetter: string;
      resume: { id: string; filename: string };
      createdAt: string;
    }>("/cover-letter/generate", {
      method: "POST",
      body: JSON.stringify({ resumeId, jobDescription, matchId }),
    });
  },

  getHistory: async () => {
    return request<
      Array<{
        id: string;
        content: string;
        resumeId: string;
        createdAt: string;
      }>
    >("/cover-letter/history");
  },

  getById: async (id: string) => {
    return request<{
      id: string;
      content: string;
      resumeId: string;
      createdAt: string;
      resume?: { id: string; filename: string };
    }>(`/cover-letter/${id}`);
  },

  delete: async (id: string) => {
    return request<{ message: string }>(`/cover-letter/${id}`, {
      method: "DELETE",
    });
  },

  regenerate: async (id: string) => {
    return request<{
      id: string;
      coverLetter: string;
      resume: { id: string; filename: string };
      createdAt: string;
    }>(`/cover-letter/${id}/regenerate`, {
      method: "POST",
    });
  },
};
