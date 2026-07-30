import Database from "better-sqlite3";
import path from "path";

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!db) {
    const dbPath = path.join(process.cwd(), "data", "haven.db");
    db = new Database(dbPath);
    db.pragma("journal_mode = WAL");
    db.exec(`
      CREATE TABLE IF NOT EXISTS checkins (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        mood TEXT NOT NULL,
        created_at TEXT NOT NULL,
        local_date TEXT
      )
    `);

    // Migration for databases created before local_date existed.
    const columns = db.prepare("PRAGMA table_info(checkins)").all() as {
      name: string;
    }[];
    if (!columns.some((c) => c.name === "local_date")) {
      db.exec("ALTER TABLE checkins ADD COLUMN local_date TEXT");
    }

    db.exec(`
      CREATE TABLE IF NOT EXISTS favorites (
        tool_id TEXT PRIMARY KEY,
        created_at TEXT NOT NULL
      )
    `);
  }
  return db;
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
export function recordCheckIn(mood: string, localDate: string): void {
  getDb()
    .prepare(
      "INSERT INTO checkins (mood, created_at, local_date) VALUES (?, ?, ?)"
    )
    .run(mood, new Date().toISOString(), localDate);
}

export function getRecentCheckIns(limit = 500): CheckIn[] {
  return getDb()
    .prepare(
      "SELECT id, mood, created_at, local_date FROM checkins ORDER BY created_at DESC LIMIT ?"
    )
    .all(limit) as CheckIn[];
}

export function setFavorite(toolId: string, favorited: boolean): void {
  if (favorited) {
    getDb()
      .prepare(
        "INSERT OR IGNORE INTO favorites (tool_id, created_at) VALUES (?, ?)"
      )
      .run(toolId, new Date().toISOString());
  } else {
    getDb().prepare("DELETE FROM favorites WHERE tool_id = ?").run(toolId);
  }
}

export function getFavoriteToolIds(): string[] {
  const rows = getDb()
    .prepare("SELECT tool_id FROM favorites ORDER BY created_at DESC")
    .all() as { tool_id: string }[];
  return rows.map((r) => r.tool_id);
}
