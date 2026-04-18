import { NextResponse } from "next/server";
import { requireUserId } from "@/lib/auth-guard";
import { createUserEmails, getUserEmails } from "@/lib/persistence";

interface CreateEmailsBody {
  subject?: string;
  bodies?: string[];
}

export const GET = async () => {
  const userId = await requireUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const emails = await getUserEmails(userId);
  return NextResponse.json({ emails });
};

export const POST = async (request: Request) => {
  const userId = await requireUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as CreateEmailsBody;
  const bodies = (body.bodies ?? []).map((item) => item.trim()).filter(Boolean);

  if (bodies.length === 0) {
    return NextResponse.json(
      { error: "At least one non-empty body is required." },
      { status: 400 },
    );
  }

  const emails = await createUserEmails(userId, body.subject?.trim() ?? "", bodies);
  return NextResponse.json({ emails });
};
