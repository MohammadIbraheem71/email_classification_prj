import { Opportunity } from "../types/types";

export function normalizeOpportunity(data: any): Opportunity {
  return {
    title: data.title || null,
    opportunity_type: data.opportunity_type?.toLowerCase() || null,
    deadline: data.deadline ? new Date(data.deadline) : null,
    eligibility: data.eligibility || null,
    required_documents: data.required_documents || [],
    location: data.location?.toLowerCase() || null,
    link: data.link || null,
  };
}