import { Opportunity } from "../types/types";

interface RawOpportunity {
  title?: string | null;
  opportunity_type?: string | null;
  deadline?: string | null;
  eligibility?: string | null;
  required_documents?: string[] | null;
  location?: string | null;
  link?: string | null;
}

export function normalizeOpportunity(data: unknown): Opportunity {
  const rawData = (data ?? {}) as RawOpportunity;

  return {
    title: rawData.title || null,
    opportunity_type: rawData.opportunity_type?.toLowerCase() || null,
    deadline: rawData.deadline ? new Date(rawData.deadline) : null,
    eligibility: rawData.eligibility || null,
    required_documents: rawData.required_documents || [],
    location: rawData.location?.toLowerCase() || null,
    link: rawData.link || null,
  };
}