import { NextRequest, NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";

function sleep(ms: number) { return new Promise(r => setTimeout(r, ms)); }

export async function POST(req: NextRequest) {
  const { story } = await req.json();
  await sleep(2200 + Math.random() * 800);

  try {
    const raw = readFileSync(join(process.cwd(), "lib/demo-story-arcs.json"), "utf-8");
    const data = JSON.parse(raw);

    const keys = Object.keys(data);
    let match = keys.find(k => k.toLowerCase().includes((story || "").toLowerCase().slice(0, 8)));
    if (!match) match = keys[Math.floor(Math.random() * keys.length)];

    const arc = data[match];
    return NextResponse.json({ arc });
  } catch {
    return NextResponse.json({ error: "Failed to load story arc" }, { status: 500 });
  }
}
