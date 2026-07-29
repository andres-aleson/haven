import { NextResponse } from "next/server";
import { recordCheckIn } from "@/lib/db";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const mood = typeof body?.mood === "string" ? body.mood : null;

  if (!mood) {
    return NextResponse.json({ error: "Missing mood" }, { status: 400 });
  }

  recordCheckIn(mood);
  return NextResponse.json({ ok: true }, { status: 201 });
}
