"use server";

import { LinkedinProfileType } from "./type";

export const getLinkedInProfile = async (
  accessToken: string
): Promise<LinkedinProfileType> => {
  const response = await fetch("https://api.linkedin.com/v2/userinfo", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.json();
};
