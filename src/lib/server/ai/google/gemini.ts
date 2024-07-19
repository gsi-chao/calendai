"use server";

import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { CoreMessage, generateText } from "ai";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const sendPrompt = async (messages: CoreMessage[]) => {
  const { text } = await generateText({
    model: google("models/gemini-1.5-flash"),
    messages,
  });
  return text;
};

export { sendPrompt };
