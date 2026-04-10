# 🤖 BidderHelper

> Intelligent Resume Matching & Cover Letter Generation Platform

## 📋 Overview

BidderHelper is a powerful platform that uses AI and vector embeddings to intelligently match resumes with job descriptions and generate personalized cover letters. Built with modern technologies, it provides a seamless experience for job seekers to optimize their application process.

## ✨ Features

### 📄 Resume Management

- Upload multiple resumes (PDF, DOCX, DOC, TXT formats)
- Automatic text extraction and parsing
- Vector embedding generation for semantic search
- Resume library with detailed preview
- File size and type information

### 🎯 Intelligent Matching

- Semantic similarity scoring between resumes and job descriptions
- Ranked results with confidence scores
- Visual similarity indicators with animated circular progress
- Support for text or file-based job descriptions
- Match history tracking

### 📝 Cover Letter Generation

- AI-powered cover letter generation based on matched resumes
- Regeneration capability for improved results
- Copy to clipboard functionality
- Download as text file
- Persistent storage with history

### 👤 User Management

- Secure authentication with JWT
- User profile management
- Protected routes for authenticated access
- Persistent login sessions

### 🎨 Modern UI/UX

- Glass morphism design with backdrop blur effects
- Dark theme optimized
- Responsive layout for all devices
- Animated transitions with Framer Motion
- Loading skeletons for better UX
- Toast notifications for feedback

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom theming
- **UI Components**: shadcn/ui
- **State Management**: Zustand with persistence
- **Animations**: Framer Motion
- **HTTP Client**: Native Fetch API

### Backend

- **Framework**: NestJS
- **Database**: PostgreSQL(Neon) with Prisma ORM
- **Authentication**: JWT
- **File Storage**: Cloudinary
- **AI/ML**: Vector embeddings for similarity matching and text generation from Gemini

## 📁 Project Structure

bidderhelper/
├── app/
│ ├── (auth)/
│ │ ├── login/
│ │ └── signup/
│ ├── (dashboard)/
│ │ ├── dashboard/
│ │ ├── resumes/
│ │ ├── match/
│ │ └── cover-letters/
│ └── layout.tsx
├── components/
│ ├── ui/
│ ├── ProtectedRoute.tsx
│ ├── UploadModal.tsx
│ └── ThemeToggle.tsx
├── lib/
│ ├── api.ts
│ ├── store.ts
│ └── utils.ts
├── contexts/
│ └── AuthContext.tsx
└── public/

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL
- npm or yarn or pnpm

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/bidderhelper.git
cd bidderhelper
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Setup .env**

```bash
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

4. **Setup DB**

```bash
npx prisma migrate dev
npx prisma generate
```

5. **Run**

```bash
npm run dev
# or
yarn dev
```

6. **Open browser**

```bash
Navigate to http://localhost:3000
```

## 🔐 Authentication Flow

- Sign Up - Create a new account with name, email, and password
  -Login - Authenticate with existing credentials
  -Protected Routes - Automatically redirect unauthenticated users
  -Session Persistence - Stay logged in across page refreshes
  -Logout - Clear session and redirect to login

### 🎯 Usage Guide

## Uploading Resumes

-Navigate to the Resumes page
-Click "Upload Resume" or drag & drop files
-Supported formats: PDF, DOCX, DOC, TXT
-View uploaded resumes in your library

## Matching with Job Descriptions

-Go to the Match page
-Paste job description text or upload a file
-Click "Run Match Engine"
-View ranked results with similarity scores
-Select the best match for cover letter generation

## Generating Cover Letters

-From match results, click "Build Cover Letter"
-AI generates personalized content
-Copy to clipboard or download as text
-Regenerate for different variations
-Access history from Cover Letters page

### 🎨 Design System

## Color Palette

-Primary: Cyan (199° 100% 45%)
-Secondary: Purple gradient accents
-Background: Dark blue/black theme
-Cards: Glass morphism with backdrop blur

## Typography

-Sans: Inter (Geist fallback)
-Mono: JetBrains Mono

## Animations

-Page transitions with fade/slide effects
-Hover states with glow effects
-Loading skeletons for async operations
-Smooth modal entrances/exits

### 🔌 API Integration

Go to api.ts

### 📈 Performance Optimizations

-Image Optimization: Next.js Image component
-Code Splitting: Dynamic imports for heavy components
-State Persistence: Zustand with localStorage
-API Caching: React Query ready (optional)
-Bundle Analysis: next bundle-analyzer
