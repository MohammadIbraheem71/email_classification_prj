"use client";

import { useEffect, useMemo, useState } from "react";
import { AnalysisResultCard } from "@/app/_components/analysis-result-card";
import type {
  BatchEmailAnalysisRequestItem,
  BatchEmailAnalysisResultItem,
  EmailAnalysisState,
} from "@/src/types/types";

interface BatchAnalysisModalProps {
  selectedEmails: BatchEmailAnalysisRequestItem[];
  onClose: () => void;
}

export const BatchAnalysisModal = ({
  selectedEmails,
  onClose,
}: BatchAnalysisModalProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<BatchEmailAnalysisResultItem[]>([]);
  const [bestEmailId, setBestEmailId] = useState<string | null>(null);

  const bestEmail = useMemo(
    () => results.find((result) => result.emailId === bestEmailId) ?? null,
    [bestEmailId, results],
  );

  useEffect(() => {
    const runBatchAnalysis = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/email-analysis/batch", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ emails: selectedEmails }),
        });
        const data = (await response.json()) as {
          results?: BatchEmailAnalysisResultItem[];
          bestEmailId?: string | null;
          error?: string;
        };

        if (!response.ok) {
          throw new Error(data.error ?? "Batch analysis failed.");
        }

        setResults(data.results ?? []);
        setBestEmailId(data.bestEmailId ?? null);
      } catch (batchError) {
        setError(
          batchError instanceof Error ? batchError.message : "Batch analysis failed.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    void runBatchAnalysis();
  }, [selectedEmails]);

  return (
    <div className="absolute inset-0 z-[70] bg-black/50 p-6">
      <div className="hide-scrollbar mx-auto max-h-full max-w-4xl overflow-auto rounded-[10px] border border-[#323338] bg-[#1f2022] p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-medium text-[#f4f4f5]">
            Batch Analysis Results
          </h2>
          <button className="rounded-[6px] border border-[#323338] px-3 py-2 text-sm text-[#d1d3d6] hover:bg-[#2b2c30]" onClick={onClose} type="button">
            Close
          </button>
        </div>

        {isLoading ? <p className="text-sm text-[#d1d3d6]">Analyzing selected emails...</p> : null}
        {error ? <p className="text-sm text-[#f87171]">{error}</p> : null}

        {!isLoading && !error ? (
          <div className="space-y-4">
            {bestEmail ? (
              <div className="rounded-[8px] border border-[#365314] bg-[#1f2a1a] p-4">
                <p className="mb-1 text-xs uppercase tracking-wide text-[#86efac]">
                  Best by score
                </p>
                <p className="text-sm text-[#f4f4f5]">{bestEmail.subject}</p>
                <p className="text-xs text-[#d1d3d6]">
                  {bestEmail.sender} · Score {bestEmail.topScore}
                </p>
              </div>
            ) : null}

            {results.map((result, index) => (
              <div className="rounded-[8px] border border-[#323338] bg-[#232427] p-4" key={result.emailId}>
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm text-[#f4f4f5]">{index + 1}. {result.subject}</p>
                    <p className="text-xs text-[#989ca4]">{result.sender}</p>
                  </div>
                  <span className="rounded-[6px] border border-[#323338] px-2 py-1 text-xs text-[#d1d3d6]">
                    Score {result.topScore ?? "-"}
                  </span>
                </div>
                <AnalysisResultCard
                  analysisState={
                    result.error
                      ? ({
                          status: "error",
                          payload: null,
                          error: result.error,
                        } satisfies EmailAnalysisState)
                      : ({
                          status: "success",
                          payload: result.payload,
                          error: null,
                        } satisfies EmailAnalysisState)
                  }
                  onRetryAnalysis={() => {}}
                  showRetryButton={false}
                />
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};
