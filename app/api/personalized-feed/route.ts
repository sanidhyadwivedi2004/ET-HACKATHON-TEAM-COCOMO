import { NextRequest, NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";

function sleep(ms: number) { return new Promise(r => setTimeout(r, ms)); }

export async function POST(req: NextRequest) {
  const { profile } = await req.json();
  const profileId: string = profile?.id || "investor";
  await sleep(1400 + Math.random() * 600); // realistic AI delay
  try {
    const raw = readFileSync(join(process.cwd(), "lib/demo-feeds.json"), "utf-8");
    const data = JSON.parse(raw);
    const articles = data[profileId] || data["investor"];
    return NextResponse.json({ articles });
  } catch (e) {
    return NextResponse.json({ error: "Failed to load feed" }, { status: 500 });
  }
}
