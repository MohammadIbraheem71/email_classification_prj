import { NextResponse } from "next/server";
import { processEmails } from "@/lib/process_emails";
import { getOpenAIModel } from "@/lib/openai_client";
import { requireUserId } from "@/lib/auth-guard";
import { getUserProfile, persistAnalysis } from "@/lib/persistence";
import type {
  BatchEmailAnalysisRequestItem,
  BatchEmailAnalysisResultItem,
} from "@/src/types/types";

interface BatchAnalyzeRequestBody {
  emails?: BatchEmailAnalysisRequestItem[];
}

export const POST = async (request: Request) => {
  try {
    const userId = await requireUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as BatchAnalyzeRequestBody;
    const emails = body.emails ?? [];

    if (emails.length === 0) {
      return NextResponse.json({ error: "emails is required." }, { status: 400 });
    }

    const profile = await getUserProfile(userId);
    const results: BatchEmailAnalysisResultItem[] = [];
    for (const email of emails) {
      try {
        const analysis = await processEmails([email.body], profile);
        const topScore = analysis.length > 0 ? analysis[0].score : null;
        results.push({
          emailId: email.id,
          sender: email.sender,
          subject: email.subject,
          payload: analysis,
          topScore,
          error: null,
        });
        await persistAnalysis({
          userId,
          emailId: email.id,
          model: getOpenAIModel(),
          status: "success",
          payload: analysis,
          requestBody: email.body,
        });
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Analysis failed.";
        results.push({
          emailId: email.id,
          sender: email.sender,
          subject: email.subject,
          payload: [],
          topScore: null,
          error: errorMessage,
        });
        await persistAnalysis({
          userId,
          emailId: email.id,
          model: getOpenAIModel(),
          status: "error",
          payload: [],
          error: errorMessage,
          requestBody: email.body,
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
