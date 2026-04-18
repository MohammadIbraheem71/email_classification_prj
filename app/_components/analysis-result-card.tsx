"use client";

import type { EmailAnalysisState } from "@/src/types/types";

interface AnalysisResultCardProps {
  analysisState: EmailAnalysisState;
  onRetryAnalysis: () => void;
  showRetryButton?: boolean;
}

interface OpportunityViewModel {
  title: string;
  opportunity_type: string;
  deadline: string | null;
  eligibility: string | null;
  required_documents: string[];
  location: string | null;
  link: string | null;
  score: number;
  reasons: string[];
}

const parseDeadline = (deadline: string | null) => {
  if (!deadline) return null;
  const isDateOnly = /^\d{4}-\d{2}-\d{2}$/.test(deadline);
  const parsed = new Date(isDateOnly ? `${deadline}T23:59:59` : deadline);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const formatDeadlineLocal = (deadline: string | null) => {
  const parsed = parseDeadline(deadline);
  if (!parsed) return "No deadline found";
  const hasTime = deadline?.includes("T");
  const formatter = new Intl.DateTimeFormat(undefined, hasTime ? { dateStyle: "medium", timeStyle: "short" } : { dateStyle: "medium" });
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return `${formatter.format(parsed)} (${timezone})`;
};

const getDeadlineState = (deadline: string | null) => {
  const parsed = parseDeadline(deadline);
  if (!parsed) return { label: "No deadline", tone: "text-[#989ca4]" };
  const daysLeft = (parsed.getTime() - Date.now()) / (1000 * 60 * 60 * 24);
  if (daysLeft >= 0 && daysLeft < 3) return { label: "Urgent", tone: "text-[#f87171]" };
  return { label: "On track", tone: "text-[#22c55e]" };
};

const parsePayload = (payload: unknown): OpportunityViewModel[] => {
  if (!Array.isArray(payload)) return [];
  return payload.map((item) => {
    const data = item as Partial<OpportunityViewModel>;
    return {
      title: data.title ?? "Untitled opportunity",
      opportunity_type: data.opportunity_type ?? "unspecified",
      deadline: data.deadline ?? null,
      eligibility: data.eligibility ?? null,
      required_documents: data.required_documents ?? [],
      location: data.location ?? null,
      link: data.link ?? null,
      score: data.score ?? 0,
      reasons: data.reasons ?? [],
    };
  });
};

const iconClass = "size-[14px] text-[#989ca4]";

export const AnalysisResultCard = ({
  analysisState,
  onRetryAnalysis,
  showRetryButton = true,
}: AnalysisResultCardProps) => {
  if (analysisState.status === "loading") {
    return <p className="text-sm text-[#d1d3d6]">Analyzing email with AI...</p>;
  }

  if (analysisState.status === "error") {
    return (
      <div className="space-y-3">
        <p className="text-sm text-[#f87171]">{analysisState.error ?? "Analysis failed."}</p>
        {showRetryButton ? (
          <button className="rounded-[6px] border border-[#2b2c30] px-3 py-2 text-[14px] text-[#d1d3d6] hover:bg-[#2b2c30]" onClick={onRetryAnalysis} type="button">
            Retry Analysis
          </button>
        ) : null}
      </div>
    );
  }

  if (analysisState.status !== "success") {
    return <p className="text-sm text-[#989ca4]">Analysis has not started yet.</p>;
  }

  const opportunities = parsePayload(analysisState.payload);
  if (opportunities.length === 0) {
    return <p className="text-sm text-[#989ca4]">No opportunity extracted from this email.</p>;
  }

  return (
    <div className="space-y-4">
      {opportunities.map((opportunity, index) => {
        const deadline = getDeadlineState(opportunity.deadline);
        return (
          <div className="rounded-[8px] border border-[#323338] bg-[#232427] p-4" key={`analysis-${index}`}>
            <div className="mb-3 flex items-start justify-between gap-3">
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-[#f4f4f5]">{opportunity.title}</h3>
                <p className="text-xs uppercase tracking-wide text-[#a1a1aa]">{opportunity.opportunity_type}</p>
              </div>
              <span className="rounded-[6px] border border-[#323338] px-2 py-1 text-xs text-[#d1d3d6]">Score {opportunity.score}</span>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="space-y-2 text-xs text-[#d1d3d6]">
                <p className="flex items-center gap-2"><span className={iconClass}>◷</span>{formatDeadlineLocal(opportunity.deadline)}</p>
                <p className={`text-xs font-medium ${deadline.tone}`}>{deadline.label}</p>
                <p className="flex items-center gap-2"><span className={iconClass}>⌖</span>{opportunity.location ?? "Location not provided"}</p>
              </div>
              <div className="space-y-2 text-xs text-[#d1d3d6]">
                <p>{opportunity.eligibility ?? "Eligibility not provided"}</p>
                <p>{opportunity.link ? <a className="text-[#93c5fd] underline" href={opportunity.link} rel="noreferrer" target="_blank">Open application link</a> : "No link provided"}</p>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {opportunity.required_documents.length > 0 ? opportunity.required_documents.map((document, docIndex) => (
                <span className="rounded-full bg-[#1f2022] px-2 py-1 text-xs text-[#d1d3d6]" key={`doc-${docIndex}`}>{document}</span>
              )) : <span className="text-xs text-[#989ca4]">No required documents extracted</span>}
            </div>
            {opportunity.reasons.length > 0 ? (
              <div className="mt-3 border-t border-[#2b2c30] pt-3">
                <p className="mb-2 text-xs text-[#a1a1aa]">Scoring reasons</p>
                <div className="flex flex-wrap gap-2">
                  {opportunity.reasons.map((reason, reasonIndex) => (
                    <span className="rounded-[6px] border border-[#323338] px-2 py-1 text-xs text-[#d1d3d6]" key={`reason-${reasonIndex}`}>{reason}</span>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};
