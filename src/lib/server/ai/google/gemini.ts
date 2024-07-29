"use server";

import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { CoreMessage, generateObject, generateText } from "ai";
import { z, ZodSchema } from "zod";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generateAIText = async (messages: CoreMessage[]) => {
  const { text } = await generateText({
    model: google("models/gemini-1.5-flash"),
    messages,
    temperature: 0.5,
  });
  return text;
};

const generateAIObject = async (messages: CoreMessage[]) => {
  const { object } = await generateObject({
    schema: z.array(z.string()),
    model: google("models/gemini-1.5-flash"),
    messages,
    temperature: 0.5,
  });
  return object;
};
const generateAIObjectPlain = async (
  system: string,
  prompt: string,
  schema: ZodSchema
) => {
  const { object } = await generateObject<z.infer<typeof schema>>({
    schema: schema,
    model: google("models/gemini-1.5-flash"),
    system,
    prompt,
    temperature: 0.5,
  });
  return object;
};

export { generateAIObject, generateAIObjectPlain, generateAIText };
