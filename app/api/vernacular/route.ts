import { NextRequest, NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";

function sleep(ms: number) { return new Promise(r => setTimeout(r, ms)); }

export async function POST(req: NextRequest) {
  const { language } = await req.json();
  await sleep(1800 + Math.random() * 700);

  try {
    const raw = readFileSync(join(process.cwd(), "lib/demo-vernacular.json"), "utf-8");
    const data = JSON.parse(raw);
    const result = data[language] || data["hi"];
    return NextResponse.json({ result });
  } catch {
    return NextResponse.json({ error: "Failed to translate" }, { status: 500 });
  }
}
