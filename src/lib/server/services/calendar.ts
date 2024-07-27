"use server";

import { eq } from "drizzle-orm";

import { db } from "../db/db";
import { CalendarTable } from "../db/schemas";
import CalendarTaskTable from "../db/schemas/calendar-task";

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

export const createCalendarTask = async (
  calendarId: number,
  taskId: number,
  postDate: Date
) => {
  if (!calendarId || !taskId) {
    throw new Error("The calendar id and task id are required");
  }
  try {
    return await db
      .insert(CalendarTaskTable)
      .values({ calendarId, taskId, postDate })
      .returning();
  } catch (e) {
    throw new Error("Failed to create calendar task");
  }
};

export const getUserCalendar = async (userId: string) => {
  if (!userId) {
    throw new Error("The user id is required");
  }
  try {
    const response = await db
      .select()
      .from(CalendarTable)
      .where(eq(CalendarTable.userId, userId))
      .limit(1);
    if (!response) {
      throw new Error("Calendar not found");
    }
    return response[0];
  } catch (e) {
    throw new Error("Failed to get calendar");
  }
};

export const getCalendarTasks = async (calendarId: number) => {
  if (!calendarId) {
    throw new Error("The calendar id is required");
  }
  try {
    return await db
      .select()
      .from(CalendarTaskTable)
      .where(eq(CalendarTaskTable.calendarId, calendarId));
  } catch (e) {
    throw new Error("Failed to get calendar tasks");
  }
};

