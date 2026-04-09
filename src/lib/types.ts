// User types
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

// Resume types
export interface Resume {
  id: string;
  filename: string;
  fileUrl: string;
  text: string;
  fileSize: any;
  fileType: string;
  userId: string;
  createdAt: Date;
}

// Match types
export interface Match {
  id: string;
  jobDescription: string;
  jobTitle: string;
  matchedResumes: Array<{
    resumeId: string;
    filename: string;
    fileUrl: string;
    text: string;
    similarity: number;
    rank: number;
  }>;
  createdAt: string;
}

// CoverLetter types
export interface CoverLetter {
  id: string;
  userId: string;
  resumeId: string;
  jobDescription: string;
  content: string;
  matchId: string | null;
  createdAt: Date;
}

// Extended types with relations (for when you fetch with includes)
export interface ResumeWithRelations extends Resume {
  user?: User;
  matches?: Match[];
  coverLetters?: CoverLetter[];
}

export interface MatchWithRelations extends Match {
  user?: User;
  resume?: Resume;
}

export interface CoverLetterWithRelations extends CoverLetter {
  user?: User;
  resume?: Resume;
  generatedFromMatch?: Match;
}

export interface UserWithRelations extends User {
  resumes?: Resume[];
  matches?: Match[];
  coverLetters?: CoverLetter[];
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Match specific types
export interface MatchResult {
  matchId: string;
  resumeId: string;
  resumeName: string;
  jobTitle: string;
  score: number;
  rank: number;
}

// Dashboard stats types
export interface DashboardStats {
  totalResumes: number;
  totalMatches: number;
  peakScore: number;
  topResume: string | null;
}

// Form types
export interface CreateResumeForm {
  file: File;
}

export interface MatchJobForm {
  resumeId: string;
  jobDescription: string;
}

export interface GenerateCoverLetterForm {
  resumeId: string;
  jobDescription: string;
  matchId?: string;
}
