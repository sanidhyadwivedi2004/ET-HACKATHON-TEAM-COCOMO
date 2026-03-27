import { NextRequest, NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";

function sleep(ms: number) { return new Promise(r => setTimeout(r, ms)); }

const QA_ANSWERS: Record<string, string[]> = {
  default: [
    "Based on current market dynamics, the key driver here is the interplay between domestic liquidity and global risk appetite. FII flows have been the swing factor — when the dollar weakens, emerging markets including India benefit disproportionately. The Nifty's current PE of 22x is above the 10-year average of 19x, suggesting limited upside from valuation re-rating. Alpha will come from earnings growth, which consensus pegs at 14-16% for FY27.",
    "The regulatory framework is evolving rapidly. SEBI's recent circulars on SME IPOs and SEBI's BRSR mandate signal a shift toward stricter governance. For investors, this means higher-quality disclosures but also short-term volatility as companies adjust. The long-term impact is positive — better governance typically leads to lower cost of capital.",
    "From a sectoral perspective, the capex cycle is the most important theme for the next 2-3 years. Infrastructure, capital goods, and defence are the primary beneficiaries. The government's Rs11.1 lakh crore capex allocation creates a multi-year order book for companies like L&T, BHEL, and HAL. Private capex is also recovering — capacity utilisation has crossed 75%, the threshold that typically triggers new investment.",
    "The credit cycle is at an inflection point. Bank NPAs are at a 10-year low of 2.8%, and credit growth is running at 14% YoY. The next phase of the credit cycle will be driven by retail and MSME lending. NBFCs that have cleaned up their books — like Bajaj Finance and Cholamandalam — are well-positioned to capture this growth.",
    "On the macro front, India's twin deficits — fiscal and current account — are both improving. The fiscal deficit is on track to hit 4.5% of GDP, and the CAD has narrowed to 0.9%. This gives RBI room to cut rates without worrying about currency pressure. The rupee has been one of the most stable EM currencies in 2025-26, which is a significant positive for foreign investors.",
  ]
};

export async function POST(req: NextRequest) {
  const { topic, question } = await req.json();

  if (question) {
    await sleep(1800 + Math.random() * 1000);
    const answers = QA_ANSWERS.default;
    const answer = answers[Math.floor(Math.random() * answers.length)];
    return NextResponse.json({ answer });
  }

  await sleep(2000 + Math.random() * 1000);

  try {
    const raw = readFileSync(join(process.cwd(), "lib/demo-navigator.json"), "utf-8");
    const data = JSON.parse(raw);

    // Find best match
    const keys = Object.keys(data);
    let match = keys.find(k => k.toLowerCase().includes(topic?.toLowerCase()?.slice(0, 10) || ""));
    if (!match) match = keys[Math.floor(Math.random() * keys.length)];

    const briefing = data[match];
    return NextResponse.json({ briefing });
  } catch {
    return NextResponse.json({ error: "Failed to load briefing" }, { status: 500 });
  }
}
