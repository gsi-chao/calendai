"use server";

import { z } from "zod";
import { generateAIObjectPlain, generateAIPlainText } from "./gemini";

export const generateTitleSuggestions = async (
  content: string
): Promise<string[]> => {
  try {
    const response = await generateAIObjectPlain(
      `You are a professional writer who crafts engaging posts for social platforms like LinkedIn, Facebook, and other media.`,
      `Generate 5 compelling title suggestions for a post based on the following content: \n\n ${content} \n Only return the five items.`,
      z.object({ titles: z.array(z.object({ name: z.string() })) })
    );
    
    if (response.titles) {
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

export const generateTitleTextSuggestions = async (
  content: string
): Promise<string[]> => {
  try {
    const response = await generateAIPlainText(
      `You are a professional writer who crafts engaging posts for social platforms like LinkedIn, Facebook, and other media.`,
      `Generate 5 compelling title suggestions for a post based on the following content: \n\n ${content} \n Get the titles separate by comma and without other text, only return the titles`
    );
    if (response) {
      // remove " " from the beginning of the string and straing characters like \n \t \r \ etc using regex
      return response.split(",").map((title: string) => {
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

export const generateTagsTextSuggestions = async (
  content: string
): Promise<string[]> => {
  try {
    const response = await generateAIPlainText(
      `You are a professional writer who crafts engaging posts for social platforms like LinkedIn, Facebook, and other media.`,
      `Generate 10 tags in UpperCamelCase for a post based on the following content: \n\n ${content} \n Get the titles separate by comma and without other text, only return the titles.`
    );
    if (response) {
      // remove " " from the beginning of the string and straing characters like \n \t \r \ etc using regex
      return response.split(",").map((title: string) => {
        return title.replace(/^\s+/, "").replace(/[\n\t\r\\\"]/g, "");
      });
    }
    return [];
  } catch (e) {
    console.error(e);
    return [];
  }
};
