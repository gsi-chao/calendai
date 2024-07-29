"use server";

import { redirect } from "next/navigation";
import { LinkedinTokenType } from "./type";

export const connectToLinkedIn = async () => {
  redirect(
    `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI}&scope=${process.env.NEXT_PUBLIC_LINKEDIN_SCOPE}`
  );
};

export const getTokenFromCode = async (
  code: string
): Promise<LinkedinTokenType> => {
  const response = await fetch(
    `https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code=${code}&redirect_uri=${process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI}&client_id=${process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID}&client_secret=${process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_SECRET}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return response.json();
};
