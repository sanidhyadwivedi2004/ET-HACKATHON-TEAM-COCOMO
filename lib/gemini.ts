import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Try flash first, fall back to pro if needed
export const geminiPro = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function generateContent(prompt: string): Promise<string> {
  try {
    const result = await geminiPro.generateContent(prompt);
    return result.response.text();
  } catch (err: any) {
    const msg: string = err?.message || "";
    if (msg.includes("429") || msg.includes("RESOURCE_EXHAUSTED") || msg.includes("quota")) {
      throw new Error("API quota exceeded. Please get a new Gemini API key from aistudio.google.com and update .env.local");
    }
    if (msg.includes("API_KEY_INVALID") || msg.includes("400")) {
      throw new Error("Invalid Gemini API key. Update GEMINI_API_KEY in .env.local");
    }
    throw new Error(`Gemini error: ${msg}`);
  }
}

export async function generateStream(prompt: string) {
  const result = await geminiPro.generateContentStream(prompt);
  return result.stream;
}
