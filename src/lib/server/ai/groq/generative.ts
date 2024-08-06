"use server";

import { z } from "zod";
import { generateAIObjectPlain } from "./llama";

export const generateTitleSuggestions = async (
  content: string
): Promise<string[]> => {
  try {
    const response = await generateAIObjectPlain(
      `You are a professional writer who crafts engaging posts for social platforms like LinkedIn, Facebook, and other media.`,
      `Generate 5 compelling title suggestions for a post based on the following content: \n\n ${content} \n Only return the five items.`,
      z.object({ data: z.array(z.string()) })
    );
    if (response.data) {
      // remove " " from the beginning of the string and straing characters like \n \t \r \ etc using regex
      return response.data.map((title: string) => {
        return title.replace(/^\s+/, "").replace(/[\n\t\r\\\"]/g, "");
      });
    }
    return [];
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const generateTagsSuggestions = async (
  content: string
): Promise<string[]> => {
  try {
    const response = await generateAIObjectPlain(
      `You are a professional writer who crafts engaging posts for social platforms like LinkedIn, Facebook, and other media.`,
      `Generate 10 tags in snake_case for a post based on the following content: \n\n ${content} \n Only return the result items.`,
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
