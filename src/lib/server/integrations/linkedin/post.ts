"use server";

import {
  deleteUserIntegration,
  getUserIntegrationByType
} from "../../services/social_integration";
import { getLinkedInProfile } from "./profile";

export const createPost = async (content: string, userId: string) => {
  const integration = await getUserIntegrationByType(userId, "linkedin");
  if (!integration || !integration?.accessToken) {
    throw new Error("Integration not found");
  }
  const { accessToken } = integration;
  // get linkending profile
  const profile = await getLinkedInProfile(accessToken);
  if (!profile) {
    await deleteUserIntegration(userId, "linkedin");
    throw new Error("Failed to get linkedin profile");
  }
  const response = await fetch("https://api.linkedin.com/v2/ugcPosts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "X-Restli-Protocol-Version": "2.0.0",
    },
    body: JSON.stringify({
      author: `urn:li:person:${profile.sub}`,
      lifecycleState: "PUBLISHED",
      specificContent: {
        "com.linkedin.ugc.ShareContent": {
          shareCommentary: {
            text: content,
          },
          shareMediaCategory: "NONE",
        },
      },
      visibility: {
        "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
      },
    }),
  });
  if (response.status !== 201) {
    throw new Error("Failed to create post");
  }
  return response.json();
};
