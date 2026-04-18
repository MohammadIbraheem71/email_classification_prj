import { relations, sql } from "drizzle-orm";
import {
  boolean,
  integer,
  jsonb,
  pgTable,
  real,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: varchar("id", { length: 191 }).primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  degree: varchar("degree", { length: 120 }).notNull().default("unknown"),
  semester: integer("semester").notNull().default(0),
  cgpa: real("cgpa").notNull().default(0),
  skills: jsonb("skills").$type<string[]>().notNull().default(sql`'[]'::jsonb`),
  preferredTypes: jsonb("preferred_types")
    .$type<string[]>()
    .notNull()
    .default(sql`'[]'::jsonb`),
  location: varchar("location", { length: 120 }).notNull().default("unknown"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const emails = pgTable("emails", {
  id: varchar("id", { length: 191 }).primaryKey(),
  userId: varchar("user_id", { length: 191 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  sender: varchar("sender", { length: 255 }).notNull(),
  subject: text("subject").notNull(),
  body: text("body").notNull(),
  category: varchar("category", { length: 64 }).notNull().default("inbox"),
  initial: varchar("initial", { length: 8 }).notNull().default("U"),
  avatarColor: varchar("avatar_color", { length: 20 })
    .notNull()
    .default("#777bfb"),
  isUnread: boolean("is_unread").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const aiAnalyses = pgTable("ai_analyses", {
  id: varchar("id", { length: 191 }).primaryKey(),
  userId: varchar("user_id", { length: 191 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  emailId: varchar("email_id", { length: 191 }).references(() => emails.id, {
    onDelete: "set null",
  }),
  model: varchar("model", { length: 120 }).notNull(),
  status: varchar("status", { length: 32 }).notNull(),
  payload: jsonb("payload").$type<unknown>(),
  error: text("error"),
  requestBody: text("request_body").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  emails: many(emails),
  analyses: many(aiAnalyses),
}));

export const emailsRelations = relations(emails, ({ one, many }) => ({
  user: one(users, {
    fields: [emails.userId],
    references: [users.id],
  }),
  analyses: many(aiAnalyses),
}));

export const aiAnalysesRelations = relations(aiAnalyses, ({ one }) => ({
  user: one(users, {
    fields: [aiAnalyses.userId],
    references: [users.id],
  }),
  email: one(emails, {
    fields: [aiAnalyses.emailId],
    references: [emails.id],
  }),
}));
