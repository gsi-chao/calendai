"use server";

import { db } from "../db/db";
import { CalendarTable } from "../db/schemas";

export const createCalendar = async (userId: string) => {
  if (!userId) {
    throw new Error("The user id is required");
  }
  try {
    return await db.insert(CalendarTable).values({ userId }).returning();
  } catch (e) {
    throw new Error("Failed to create calendar");
  }
};
