'use server'

import { CoreMessage } from "ai";
import { z } from "zod";
import { generateAIObjectPlain } from "./gemini";

export const generateTitleSuggestions = async (
  content: string
): Promise<string[]> => {
  const propmt: CoreMessage[] = [
    {
      role: "assistant",
      content: `You are a professional writer who crafts engaging posts for social platforms like LinkedIn, Facebook, and other media.`,
    },
    {
      role: "user",
      content: `Generate 5 compelling title suggestions for a post based on the following content: \n\n ${content}`,
    },
  ];
  try {
    const response = await generateAIObjectPlain(
      `You are a professional writer who crafts engaging posts for social platforms like LinkedIn, Facebook, and other media.`,
      `Generate 5 compelling title suggestions for a post based on the following content: \n\n ${content} \n Only return the five items.`,
      z.object({ data: z.array(z.string()) })
    );
    if (response.data) {
      return response.data;
    }
    return [];
  } catch (e) {
    console.error(e);
    return [];
  }
};
