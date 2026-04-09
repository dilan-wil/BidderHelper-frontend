export interface Resume {
  id: string;
  filename: string;
  uploadDate: string;
  size: string;
  skills: string[];
  matchCount: number;
  content: string;
}

export interface MatchResult {
  id: string;
  jobTitle: string;
  company: string;
  date: string;
  bestResumeId: string;
  score: number;
  matches: { resumeId: string; score: number }[];
}

export interface CoverLetter {
  id: string;
  resumeId: string;
  matchId: string;
  content: string;
  createdAt: string;
}

export interface UserProfile {
  email: string;
  name: string;
  joinDate: string;
}

export const mockResumes: Resume[] = [
  {
    id: "res_1",
    filename: "Software_Engineer_Resume.pdf",
    uploadDate: "2023-10-12",
    size: "142 KB",
    skills: ["React", "TypeScript", "Node.js", "AWS"],
    matchCount: 3,
    content:
      "Experienced Software Engineer with a demonstrated history of working in the internet industry. Skilled in React, Node.js, and Cloud Infrastructure...",
  },
  {
    id: "res_2",
    filename: "Frontend_Dev_Creative.pdf",
    uploadDate: "2023-11-05",
    size: "210 KB",
    skills: ["React", "Framer Motion", "CSS", "UI/UX"],
    matchCount: 1,
    content:
      "Creative Frontend Developer specializing in highly interactive, accessible, and performant web applications...",
  },
  {
    id: "res_3",
    filename: "Fullstack_Enterprise.pdf",
    uploadDate: "2024-01-20",
    size: "185 KB",
    skills: ["Java", "Spring Boot", "React", "PostgreSQL"],
    matchCount: 2,
    content:
      "Senior Fullstack Developer with 8 years of experience building scalable enterprise applications...",
  },
  {
    id: "res_4",
    filename: "Product_Manager_Resume.pdf",
    uploadDate: "2024-02-15",
    size: "130 KB",
    skills: ["Agile", "Scrum", "Product Strategy", "Jira"],
    matchCount: 0,
    content:
      "Results-driven Product Manager with experience leading cross-functional teams to deliver high-impact features...",
  },
  {
    id: "res_5",
    filename: "Engineering_Manager.pdf",
    uploadDate: "2024-03-01",
    size: "155 KB",
    skills: ["Leadership", "System Design", "Mentoring", "Go"],
    matchCount: 1,
    content:
      "Engineering Manager focused on building high-performing teams and scalable distributed systems...",
  },
];

export const mockMatchResults: MatchResult[] = [
  {
    id: "match_1",
    jobTitle: "Senior Frontend Engineer",
    company: "Vercel",
    date: "2024-03-10",
    bestResumeId: "res_2",
    score: 94,
    matches: [
      { resumeId: "res_2", score: 30 },
      { resumeId: "res_1", score: 82 },
      { resumeId: "res_3", score: 71 },
    ],
  },
  {
    id: "match_2",
    jobTitle: "Full Stack Developer",
    company: "Stripe",
    date: "2024-03-15",
    bestResumeId: "res_1",
    score: 88,
    matches: [
      { resumeId: "res_1", score: 88 },
      { resumeId: "res_3", score: 85 },
      { resumeId: "res_5", score: 62 },
    ],
  },
  {
    id: "match_3",
    jobTitle: "Engineering Manager",
    company: "Linear",
    date: "2024-03-20",
    bestResumeId: "res_5",
    score: 96,
    matches: [
      { resumeId: "res_5", score: 96 },
      { resumeId: "res_3", score: 74 },
      { resumeId: "res_4", score: 68 },
    ],
  },
];

export const mockCoverLetters: CoverLetter[] = [
  {
    id: "cov_1",
    resumeId: "res_2",
    matchId: "match_1",
    createdAt: "2024-03-10",
    content:
      "Dear Hiring Manager at Vercel,\n\nI am writing to express my strong interest in the Senior Frontend Engineer position. With my background in creating highly interactive and performant web applications using React and Framer Motion, I believe I would be an excellent fit for the team.\n\nThank you for your time and consideration.",
  },
  {
    id: "cov_2",
    resumeId: "res_5",
    matchId: "match_3",
    createdAt: "2024-03-20",
    content:
      "Dear Linear Team,\n\nI am thrilled to apply for the Engineering Manager role. Linear's focus on speed and craft aligns perfectly with my philosophy of building high-performing engineering teams. In my previous role, I successfully led a team of 15 engineers to deliver complex distributed systems.\n\nI look forward to discussing how I can contribute to Linear's continued success.",
  },
];

export const mockUserProfile: UserProfile = {
  email: "alex@example.com",
  name: "Alex Developer",
  joinDate: "2023-09-01",
};
