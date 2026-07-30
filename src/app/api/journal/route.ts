import { NextResponse } from "next/server";
import { createJournalEntry, deleteJournalEntry, getJournalEntries } from "@/lib/db";

// Reads/writes a mutable local database — never cache this route.
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ entries: getJournalEntries() });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const title = typeof body?.title === "string" ? body.title.trim() : "";
  const entryBody = typeof body?.body === "string" ? body.body.trim() : "";
  const prompt =
    typeof body?.prompt === "string" && body.prompt.trim() ? body.prompt.trim() : null;

  if (!title || !entryBody) {
    return NextResponse.json(
      { error: "Missing title or body" },
      { status: 400 }
    );
  }

  const entry = createJournalEntry(title, prompt, entryBody);
  return NextResponse.json({ entry }, { status: 201 });
}

export async function DELETE(request: Request) {
  const id = Number(new URL(request.url).searchParams.get("id"));
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }
  deleteJournalEntry(id);
  return NextResponse.json({ ok: true });
}
