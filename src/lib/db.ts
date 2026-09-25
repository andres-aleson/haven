import { desc, eq } from "drizzle-orm";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "@/db/schema";
import { checkins, favorites, journalEntries } from "@/db/schema";

/**
 * DATABASE_URL should use the `haven_app` role, which can only see the
 * `haven` schema. Tables are managed by drizzle-kit migrations in /drizzle.
 */

// Reuse one pool across hot reloads in dev and warm invocations on Vercel.
const globalForDb = globalThis as unknown as {
  havenDb?: NodePgDatabase<typeof schema>;
};

function getDb(): NodePgDatabase<typeof schema> {
  if (!globalForDb.havenDb) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error("DATABASE_URL is not set");
    }
    const isLocal = /localhost|127\.0\.0\.1/.test(connectionString);
    const pool = new Pool({
      connectionString,
      ssl: isLocal ? undefined : { rejectUnauthorized: false },
      max: 5,
    });
    globalForDb.havenDb = drizzle(pool, { schema });
  }
  return globalForDb.havenDb;
}

export interface CheckIn {
  id: number;
  mood: string;
  created_at: string;
  local_date: string;
}

/**
 * `localDate` is the YYYY-MM-DD calendar date as seen by whoever checked
 * in, computed in their browser. The server doesn't know their timezone,
 * so it trusts the client for this rather than deriving it from `created_at`
 * (which is UTC and would put checkins on the wrong day near midnight).
 */
export async function recordCheckIn(mood: string, localDate: string): Promise<void> {
  await getDb()
    .insert(checkins)
    .values({ mood, createdAt: new Date().toISOString(), localDate });
}

export async function getRecentCheckIns(limit = 500): Promise<CheckIn[]> {
  const rows = await getDb()
    .select({
      id: checkins.id,
      mood: checkins.mood,
      created_at: checkins.createdAt,
      local_date: checkins.localDate,
    })
    .from(checkins)
    .orderBy(desc(checkins.createdAt))
    .limit(limit);
  return rows as CheckIn[];
}

export async function setFavorite(toolId: string, favorited: boolean): Promise<void> {
  if (favorited) {
    await getDb()
      .insert(favorites)
      .values({ toolId, createdAt: new Date().toISOString() })
      .onConflictDoNothing();
  } else {
    await getDb().delete(favorites).where(eq(favorites.toolId, toolId));
  }
}

export async function getFavoriteToolIds(): Promise<string[]> {
  const rows = await getDb()
    .select({ toolId: favorites.toolId })
    .from(favorites)
    .orderBy(desc(favorites.createdAt));
  return rows.map((r) => r.toolId);
}

export interface JournalEntry {
  id: number;
  title: string;
  prompt: string | null;
  body: string;
  created_at: string;
}

export async function createJournalEntry(
  title: string,
  prompt: string | null,
  body: string
): Promise<JournalEntry> {
  const created_at = new Date().toISOString();
  const [row] = await getDb()
    .insert(journalEntries)
    .values({ title, prompt, body, createdAt: created_at })
    .returning({ id: journalEntries.id });
  return { id: row.id, title, prompt, body, created_at };
}

export async function getJournalEntries(limit = 200): Promise<JournalEntry[]> {
  return getDb()
    .select({
      id: journalEntries.id,
      title: journalEntries.title,
      prompt: journalEntries.prompt,
      body: journalEntries.body,
      created_at: journalEntries.createdAt,
    })
    .from(journalEntries)
    .orderBy(desc(journalEntries.createdAt))
    .limit(limit);
}

export async function deleteJournalEntry(id: number): Promise<void> {
  await getDb().delete(journalEntries).where(eq(journalEntries.id, id));
}
