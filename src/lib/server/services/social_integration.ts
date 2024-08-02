"use server";

import { and, eq } from "drizzle-orm";

import { db } from "../db/db";
import SocialIntegrationTable, {
  SocialProviders,
} from "../db/schemas/social-integration";
import { SocialIntegration } from "../types/social-integration";

export const getUserIntegration = async (
  userId: string
): Promise<SocialIntegration[]> => {
  try {
    const response = await db
      .select()
      .from(SocialIntegrationTable)
      .where(eq(SocialIntegrationTable.userId, userId));

    if (!response) {
      throw new Error("Integration not found");
    }
    return response;
  } catch (e) {
    throw new Error("Failed to get user integration");
  }
};

export const getUserIntegrationByType = async (
  userId: string,
  provider: SocialProviders
): Promise<SocialIntegration> => {
  try {
    const response = await db
      .select()
      .from(SocialIntegrationTable)
      .where(
        and(
          eq(SocialIntegrationTable.userId, userId),
          eq(SocialIntegrationTable.provider, provider)
        )
      );

    if (!response.length) {
      throw new Error("Integration not found");
    }
    return response[0];
  } catch (e) {
    throw new Error("Failed to get user integration");
  }
};

export const createUserIntegration = async (
  userId: string,
  provider: SocialProviders,
  accessToken: string
) => {
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
};

export const deleteUserIntegration = async (userId: string, type: SocialProviders) => {
  try {
    return await db
      .delete(SocialIntegrationTable)
      .where(
        and(
          eq(SocialIntegrationTable.userId, userId),
          eq(SocialIntegrationTable.provider, type)
        )
      )
      .returning();
  } catch (e) {
    throw new Error("Failed to delete user integration");
  }
}
