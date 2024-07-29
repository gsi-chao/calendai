import { generateAIStreamText } from "@/lib/server/ai/google/gemini";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { prompt }: { prompt: string } = await req.json();

  const result = await generateAIStreamText(prompt);

  return result.toAIStreamResponse();
}
