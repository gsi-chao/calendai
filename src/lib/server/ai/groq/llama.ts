"use server";

import { createOpenAI } from "@ai-sdk/openai";
import { generateObject, generateText, streamText } from "ai";
import { z, ZodSchema } from "zod";

const groq = createOpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_LLAMA_API_KEY,
});

const generateAIObjectPlain = async (
  system: string,
  prompt: string,
  schema: ZodSchema
) => {
  const { object } = await generateObject<z.infer<typeof schema>>({
    schema: schema,
    model: groq("llama-3.1-8b-instant"),
    system,
    prompt,
    temperature: 0.5,
  });
  return object;
};

const generateAITextPlain = async (
  system: string,
  prompt: string,
) => {
  const { text } = await generateText({
    model: groq("llama-3.1-8b-instant"),
    system,
    prompt,
    temperature: 0.5,
  });
  return text;
};

const generateAIStreamText = async (prompt: string) => {
  const result = await streamText({
    model: groq("llama-3.1-8b-instant"),
    prompt,
  });

  return result;
};

export { generateAIObjectPlain, generateAIStreamText, generateAITextPlain };
