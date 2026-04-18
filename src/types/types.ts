export interface Email {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  date: string;
  initial: string;
  avatarColor: string;
  isUnread: boolean;
  category: string;
}

export interface ComposeEmailInput {
  subject: string;
  bodies: string[];
}

export interface StudentProfile {
  degree: string;
  semester: number;
  cgpa: number;
  skills: string[];
  preferred_types: string[];
  location: string;
}

export type EmailAnalysisStatus = "idle" | "loading" | "success" | "error";

export interface EmailAnalysisState {
  status: EmailAnalysisStatus;
  payload: unknown | null;
  error: string | null;
}

export type EmailAnalysisCache = Record<string, EmailAnalysisState>;

export interface BatchEmailAnalysisRequestItem {
  id: string;
  sender: string;
  subject: string;
  body: string;
}

export interface BatchEmailAnalysisResultItem {
  emailId: string;
  sender: string;
  subject: string;
  payload: unknown;
  topScore: number | null;
  error: string | null;
}
