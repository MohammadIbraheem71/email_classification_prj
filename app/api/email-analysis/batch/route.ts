import { NextResponse } from "next/server";
import { processEmails } from "@/lib/process_emails";
import type {
  BatchEmailAnalysisRequestItem,
  BatchEmailAnalysisResultItem,
} from "@/src/types/types";
import type { StudentProfile } from "@/types/types";

interface BatchAnalyzeRequestBody {
  emails?: BatchEmailAnalysisRequestItem[];
}

const defaultStudentProfile: StudentProfile = {
  degree: "unknown",
  cgpa: 0,
  skills: [],
  preferred_types: [],
  location: "unknown",
};

export const POST = async (request: Request) => {
  try {
    const body = (await request.json()) as BatchAnalyzeRequestBody;
    const emails = body.emails ?? [];

    if (emails.length === 0) {
      return NextResponse.json({ error: "emails is required." }, { status: 400 });
    }

    const results: BatchEmailAnalysisResultItem[] = [];
    for (const email of emails) {
      try {
        const analysis = await processEmails([email.body], defaultStudentProfile);
        const topScore = analysis.length > 0 ? analysis[0].score : null;
        results.push({
          emailId: email.id,
          sender: email.sender,
          subject: email.subject,
          payload: analysis,
          topScore,
          error: null,
        });
      } catch (error) {
        results.push({
          emailId: email.id,
          sender: email.sender,
          subject: email.subject,
          payload: [],
          topScore: null,
          error: error instanceof Error ? error.message : "Analysis failed.",
        });
      }
    }

    const rankedResults = [...results].sort(
      (a, b) => (b.topScore ?? -1) - (a.topScore ?? -1),
    );
    const bestEmailId = rankedResults[0]?.topScore != null ? rankedResults[0].emailId : null;

    return NextResponse.json({ results: rankedResults, bestEmailId });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Batch analysis failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
};
