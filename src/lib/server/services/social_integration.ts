"use server";

import { eq } from "drizzle-orm";

import { db } from "../db/db";
import SocialIntegrationTable, { SocialProviders } from "../db/schemas/social-integration";

export const getUserIntegration = async (userId: string) => {
  try {
    const response = await db
      .select()
      .from(SocialIntegrationTable)
      .where(eq(SocialIntegrationTable.userId, userId))

    if (!response) {
      throw new Error("Integration not found");
    }
    return response;
  } catch (e) {
    throw new Error("Failed to get user integration");
  }
};

export const createUserIntegration = async (userId: string, provider: SocialProviders, accessToken: string) => {
    if (!userId || !provider || !accessToken) {
        throw new Error("The user id, provider, and access token are required");
    }
    try {
        return await db
        .insert(SocialIntegrationTable)
        .values({ userId, provider, accessToken })
        .returning();
    } catch (e) {
        throw new Error("Failed to create user integration");
    }
}
