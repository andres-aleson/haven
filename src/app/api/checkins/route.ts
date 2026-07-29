import { NextResponse } from "next/server";
import { getRecentCheckIns, recordCheckIn } from "@/lib/db";

// Reads/writes a mutable local database — never cache this route.
export const dynamic = "force-dynamic";

const LOCAL_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const mood = typeof body?.mood === "string" ? body.mood : null;
  const localDate =
    typeof body?.localDate === "string" && LOCAL_DATE_PATTERN.test(body.localDate)
      ? body.localDate
      : null;

  if (!mood || !localDate) {
    return NextResponse.json(
      { error: "Missing mood or localDate" },
      { status: 400 }
    );
  }

  recordCheckIn(mood, localDate);
  return NextResponse.json({ ok: true }, { status: 201 });
}

export async function GET() {
  return NextResponse.json({ checkIns: getRecentCheckIns() });
}
