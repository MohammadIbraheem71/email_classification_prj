import { NextResponse } from "next/server";
import { processEmails } from "@/lib/process_emails";
import type { StudentProfile } from "@/types/types";

interface AnalyzeEmailRequestBody {
  emailBody?: string;
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
    const body = (await request.json()) as AnalyzeEmailRequestBody;
    const emailBody = body.emailBody?.trim();

    if (!emailBody) {
      return NextResponse.json(
        { error: "emailBody is required." },
        { status: 400 },
      );
    }

    const results = await processEmails([emailBody], defaultStudentProfile);
    return NextResponse.json({ payload: results });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Email analysis failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
};
