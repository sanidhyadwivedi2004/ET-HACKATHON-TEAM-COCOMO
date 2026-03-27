import { NextRequest, NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";

function sleep(ms: number) { return new Promise(r => setTimeout(r, ms)); }

export async function POST(req: NextRequest) {
  await sleep(2500 + Math.random() * 1000); // video takes longer to "produce"
  try {
    const raw = readFileSync(join(process.cwd(), "lib/demo-video.json"), "utf-8");
    const script = JSON.parse(raw);
    return NextResponse.json({ script });
  } catch {
    return NextResponse.json({ error: "Failed to generate script" }, { status: 500 });
  }
}
