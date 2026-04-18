import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";

interface RegisterBody {
  email?: string;
  password?: string;
}

export const POST = async (request: Request) => {
  const body = (await request.json()) as RegisterBody;
  const email = String(body.email || "").trim().toLowerCase();
  const password = String(body.password || "");

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required." },
      { status: 400 },
    );
  }

  if (password.length < 8) {
    return NextResponse.json(
      { error: "Password must be at least 8 characters long." },
      { status: 400 },
    );
  }

  const [existing] = await db.select().from(users).where(eq(users.email, email));
  if (existing) {
    return NextResponse.json(
      { error: "This email is already registered." },
      { status: 409 },
    );
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await db.insert(users).values({
    id: crypto.randomUUID(),
    email,
    passwordHash,
    degree: "unknown",
    semester: 0,
    cgpa: 0,
    skills: [],
    preferredTypes: [],
    location: "unknown",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return NextResponse.json({ success: true });
};
