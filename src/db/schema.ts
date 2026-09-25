import { pgSchema, serial, text } from "drizzle-orm/pg-core";

// Everything lives in the `haven` Postgres schema, which is created by hand
// (not by migrations) so the app role never needs database-level CREATE.
export const haven = pgSchema("haven");

export const checkins = haven.table("checkins", {
  id: serial("id").primaryKey(),
  mood: text("mood").notNull(),
  createdAt: text("created_at").notNull(),
  localDate: text("local_date"),
});

export const favorites = haven.table("favorites", {
  toolId: text("tool_id").primaryKey(),
  createdAt: text("created_at").notNull(),
});

export const journalEntries = haven.table("journal_entries", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  prompt: text("prompt"),
  body: text("body").notNull(),
  createdAt: text("created_at").notNull(),
});
