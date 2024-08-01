"use server";

import { auth } from "@clerk/nextjs/server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "../db/db";
import { CalendarTable, TaskTable } from "../db/schemas";
import CalendarTaskTable from "../db/schemas/calendar-task";
import { CalendarTask } from "../types";
import { InsertResponse } from "../types/response";
import { createCalendarTask, getUserCalendarOrCreate } from "./calendar";

export type CreateTaskType = {
  title: string;
  content: string;
  plainContent?: string;
  tags?: string;
  postDate: Date;
  coverImage: string
};

export const createTask = async (
  event: CreateTaskType
): Promise<InsertResponse> => {
  // instance the database
  // create the task
  const { userId } = auth();

  if (!userId) {
    throw new Error("You must be logged in to create a task");
  }

  // get the user calendar
  const userCalendar = await getUserCalendarOrCreate(userId);
  if (!userCalendar) {
    throw new Error("Calendar not found");
  }

  const response = await db
    .insert(TaskTable)
    .values({
      title: event.title,
      createdBy: userId,
      content: event.content,
      plainContent: event.plainContent ?? "",
      tags: event.tags,
      coverImage: event.coverImage,
      thumbnail: "https://via.placeholder.com/150",
    })
    .returning({
      id: TaskTable.id,
    });
  if (response.length === 0) {
    throw new Error("Failed to create task");
  }

  const taskId = response[0].id;
  const calendarTasks = await createCalendarTask(
    userCalendar.id,
    taskId,
    event.postDate
  );

  if (!calendarTasks) {
    throw new Error("Failed to create calendar task");
  }

  revalidatePath("/");
  return response[0];
};

export const getUserTasks = async (userId: string): Promise<CalendarTask[]> => {
  if (!userId) {
    throw new Error("The user id is required");
  }
  try {
    const response = await db
      .select({
        id: TaskTable.id,
        createdBy: TaskTable.createdBy,
        title: TaskTable.title,
        content: TaskTable.content,
        plainContent: TaskTable.plainContent,
        tags: TaskTable.tags,
        coverImage: TaskTable.coverImage,
        thumbnail: TaskTable.thumbnail,
        postDate: CalendarTaskTable.postDate,
        status: TaskTable.status,
        isActive: TaskTable.isActive,
        createdAt: TaskTable.createdAt,
        updatedAt: TaskTable.updatedAt,
      })
      .from(CalendarTable)
      .innerJoin(
        CalendarTaskTable,
        eq(CalendarTable.id, CalendarTaskTable.calendarId)
      )
      .innerJoin(TaskTable, eq(CalendarTaskTable.taskId, TaskTable.id))
      .where(eq(CalendarTable.userId, userId));
    if (!response) {
      return [];
    }
    return response;
  } catch (e) {
    console.log(e)
    throw new Error("Failed to get user tasks");
  }
};
