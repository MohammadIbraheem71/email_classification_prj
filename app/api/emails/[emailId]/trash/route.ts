import { NextResponse } from "next/server";
import { requireUserId } from "@/lib/auth-guard";
import { moveEmailToTrash } from "@/lib/persistence";

export const PATCH = async (
  _request: Request,
  context: { params: Promise<{ emailId: string }> },
) => {
  const userId = await requireUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { emailId } = await context.params;
  if (!emailId) {
    return NextResponse.json({ error: "emailId is required." }, { status: 400 });
  }

  await moveEmailToTrash(userId, emailId);
  return NextResponse.json({ success: true });
};
