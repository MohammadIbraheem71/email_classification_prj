import { NextResponse } from "next/server";
import { requireUserId } from "@/lib/auth-guard";
import { getUserProfile, saveProfile } from "@/lib/persistence";
import type { StudentProfile } from "@/src/types/types";

export const GET = async () => {
  const userId = await requireUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const profile = await getUserProfile(userId);
  return NextResponse.json({ profile });
};

export const PUT = async (request: Request) => {
  const userId = await requireUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as { profile?: StudentProfile };
  if (!body.profile) {
    return NextResponse.json({ error: "profile is required." }, { status: 400 });
  }

  await saveProfile(userId, body.profile);
  return NextResponse.json({ success: true });
};
