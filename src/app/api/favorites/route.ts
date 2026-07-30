import { NextResponse } from "next/server";
import { getFavoriteToolIds, setFavorite } from "@/lib/db";

// Reads/writes a mutable local database — never cache this route.
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ toolIds: getFavoriteToolIds() });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const toolId = typeof body?.toolId === "string" ? body.toolId : null;
  const favorited = typeof body?.favorited === "boolean" ? body.favorited : null;

  if (!toolId || favorited === null) {
    return NextResponse.json(
      { error: "Missing toolId or favorited" },
      { status: 400 }
    );
  }

  setFavorite(toolId, favorited);
  return NextResponse.json({ ok: true, favorited });
}
