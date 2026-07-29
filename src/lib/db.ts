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
}

export function recordCheckIn(mood: string): void {
  getDb()
    .prepare("INSERT INTO checkins (mood, created_at) VALUES (?, ?)")
    .run(mood, new Date().toISOString());
}

export function getRecentCheckIns(limit = 500): CheckIn[] {
  return getDb()
    .prepare("SELECT id, mood, created_at FROM checkins ORDER BY created_at DESC LIMIT ?")
    .all(limit) as CheckIn[];
}
