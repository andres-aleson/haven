import { Pool } from "pg";

/**
 * All tables live in the `haven` Postgres schema. DATABASE_URL should use the
 * `haven_app` role, which can only see that schema; `search_path` is pinned
 * here too so queries never fall through to `public`.
 */
const SCHEMA = "haven";

// Reuse one pool across hot reloads in dev and warm invocations on Vercel.
const globalForDb = globalThis as unknown as {
  havenPool?: Pool;
  havenReady?: Promise<void>;
};

function getPool(): Pool {
  if (!globalForDb.havenPool) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error("DATABASE_URL is not set");
    }
    const isLocal = /localhost|127\.0\.0\.1/.test(connectionString);
    globalForDb.havenPool = new Pool({
      connectionString,
      ssl: isLocal ? undefined : { rejectUnauthorized: false },
      max: 5,
      options: `-c search_path=${SCHEMA}`,
    });
  }
  return globalForDb.havenPool;
}

async function ensureSchema(): Promise<void> {
  const pool = getPool();
  await pool.query(`
    CREATE TABLE IF NOT EXISTS ${SCHEMA}.checkins (
      id SERIAL PRIMARY KEY,
      mood TEXT NOT NULL,
      created_at TEXT NOT NULL,
      local_date TEXT
    )
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS ${SCHEMA}.favorites (
      tool_id TEXT PRIMARY KEY,
      created_at TEXT NOT NULL
    )
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS ${SCHEMA}.journal_entries (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      prompt TEXT,
      body TEXT NOT NULL,
      created_at TEXT NOT NULL
    )
  `);
}

async function getDb(): Promise<Pool> {
  if (!globalForDb.havenReady) {
    globalForDb.havenReady = ensureSchema().catch((err) => {
      globalForDb.havenReady = undefined;
      throw err;
    });
  }
  await globalForDb.havenReady;
  return getPool();
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
  await (await getDb()).query(
    "INSERT INTO checkins (mood, created_at, local_date) VALUES ($1, $2, $3)",
    [mood, new Date().toISOString(), localDate]
  );
}

export async function getRecentCheckIns(limit = 500): Promise<CheckIn[]> {
  const { rows } = await (await getDb()).query<CheckIn>(
    "SELECT id, mood, created_at, local_date FROM checkins ORDER BY created_at DESC LIMIT $1",
    [limit]
  );
  return rows;
}

export async function setFavorite(toolId: string, favorited: boolean): Promise<void> {
  const db = await getDb();
  if (favorited) {
    await db.query(
      "INSERT INTO favorites (tool_id, created_at) VALUES ($1, $2) ON CONFLICT (tool_id) DO NOTHING",
      [toolId, new Date().toISOString()]
    );
  } else {
    await db.query("DELETE FROM favorites WHERE tool_id = $1", [toolId]);
  }
}

export async function getFavoriteToolIds(): Promise<string[]> {
  const { rows } = await (await getDb()).query<{ tool_id: string }>(
    "SELECT tool_id FROM favorites ORDER BY created_at DESC"
  );
  return rows.map((r) => r.tool_id);
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
  const { rows } = await (await getDb()).query<{ id: number }>(
    "INSERT INTO journal_entries (title, prompt, body, created_at) VALUES ($1, $2, $3, $4) RETURNING id",
    [title, prompt, body, created_at]
  );
  return { id: rows[0].id, title, prompt, body, created_at };
}

export async function getJournalEntries(limit = 200): Promise<JournalEntry[]> {
  const { rows } = await (await getDb()).query<JournalEntry>(
    "SELECT id, title, prompt, body, created_at FROM journal_entries ORDER BY created_at DESC LIMIT $1",
    [limit]
  );
  return rows;
}

export async function deleteJournalEntry(id: number): Promise<void> {
  await (await getDb()).query("DELETE FROM journal_entries WHERE id = $1", [id]);
}
