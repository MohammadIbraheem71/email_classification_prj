import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { aiAnalyses, emails, users } from "@/db/schema";
import type { Email, StudentProfile } from "@/src/types/types";

const colorPalette = [
  "#3b82f6",
  "#22c55e",
  "#a855f7",
  "#f97316",
  "#14b8a6",
  "#ef4444",
];

const getAvatarColor = (seed: string) => {
  const hash = [...seed].reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colorPalette[hash % colorPalette.length];
};

export const toUiEmail = (row: typeof emails.$inferSelect): Email => ({
  id: row.id,
  sender: row.sender,
  subject: row.subject,
  preview: row.body,
  date: new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
  }).format(row.createdAt),
  initial: row.initial,
  avatarColor: row.avatarColor,
  isUnread: row.isUnread,
  category: row.category,
});

export const getUserProfile = async (userId: string): Promise<StudentProfile> => {
  const [user] = await db.select().from(users).where(eq(users.id, userId));

  if (!user) {
    return {
      degree: "unknown",
      semester: 0,
      cgpa: 0,
      skills: [],
      preferred_types: [],
      location: "unknown",
    };
  }

  return {
    degree: user.degree,
    semester: user.semester,
    cgpa: user.cgpa,
    skills: user.skills,
    preferred_types: user.preferredTypes,
    location: user.location,
  };
};

export const getUserEmails = async (userId: string): Promise<Email[]> => {
  const rows = await db.select().from(emails).where(eq(emails.userId, userId));
  return rows
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .map(toUiEmail);
};

export const createUserEmails = async (
  userId: string,
  subject: string,
  bodies: string[],
) => {
  const now = new Date();
  const rows = bodies.map((body, index) => {
    const sender = "You";
    return {
      id: crypto.randomUUID(),
      userId,
      sender,
      subject: subject || "(No Subject)",
      body: body || "No body content",
      category: "inbox",
      initial: "Y",
      avatarColor: getAvatarColor(`${userId}-${index}-${now.toISOString()}`),
      isUnread: false,
      createdAt: now,
      updatedAt: now,
    };
  });

  if (rows.length === 0) return [] as Email[];

  await db.insert(emails).values(rows);
  return rows.map(toUiEmail);
};

export const moveEmailToTrash = async (userId: string, emailId: string) => {
  await db
    .update(emails)
    .set({ category: "trash", isUnread: false, updatedAt: new Date() })
    .where(and(eq(emails.id, emailId), eq(emails.userId, userId)));
};

export const saveProfile = async (userId: string, profile: StudentProfile) => {
  await db
    .update(users)
    .set({
      degree: profile.degree,
      semester: profile.semester,
      cgpa: profile.cgpa,
      skills: profile.skills,
      preferredTypes: profile.preferred_types,
      location: profile.location,
      updatedAt: new Date(),
    })
    .where(eq(users.id, userId));
};

export const persistAnalysis = async (params: {
  userId: string;
  emailId?: string | null;
  model: string;
  status: "success" | "error";
  payload: unknown;
  error?: string | null;
  requestBody: string;
}) => {
  await db.insert(aiAnalyses).values({
    id: crypto.randomUUID(),
    userId: params.userId,
    emailId: params.emailId ?? null,
    model: params.model,
    status: params.status,
    payload: params.payload,
    error: params.error ?? null,
    requestBody: params.requestBody,
    createdAt: new Date(),
  });
};
