export interface Opportunity {
  title: string | null;
  opportunity_type: string | null;
  deadline: Date | null;
  eligibility: string | null;
  required_documents: string[];
  location: string | null;
  link: string | null;
}

export interface ScoredOpportunity extends Opportunity {
  score: number;
  reasons: string[];
}

export interface StudentProfile {
  degree: string;
  semester: number;
  cgpa: number;
  skills: string[];
  preferred_types: string[];
  location: string;
}