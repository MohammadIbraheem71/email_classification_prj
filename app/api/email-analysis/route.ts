import { NextResponse } from "next/server";
import { processEmails } from "@/lib/process_emails";
import { getOpenAIModel } from "@/lib/openai_client";
import { requireUserId } from "@/lib/auth-guard";
import { getUserProfile, persistAnalysis } from "@/lib/persistence";

interface AnalyzeEmailRequestBody {
  emailBody?: string;
  emailId?: string;
}

export const POST = async (request: Request) => {
  try {
    const userId = await requireUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as AnalyzeEmailRequestBody;
    const emailBody = body.emailBody?.trim();

    if (!emailBody) {
      return NextResponse.json(
        { error: "emailBody is required." },
        { status: 400 },
      );
    }

    const profile = await getUserProfile(userId);
    const results = await processEmails([emailBody], profile);
    await persistAnalysis({
      userId,
      emailId: body.emailId ?? null,
      model: getOpenAIModel(),
      status: "success",
      payload: results,
      requestBody: emailBody,
    });

    return NextResponse.json({ payload: results });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Email analysis failed.";

    const userId = await requireUserId();
    if (userId) {
      await persistAnalysis({
        userId,
        model: getOpenAIModel(),
        status: "error",
        payload: [],
        error: message,
        requestBody: "single-email-analysis",
      });
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
};
