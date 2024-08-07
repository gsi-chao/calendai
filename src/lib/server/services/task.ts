"use server";

import { auth } from "@clerk/nextjs/server";
import { addHours } from "date-fns";
import { and, count, eq, gte, lte } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "../db/db";
import { CalendarTable, TaskTable } from "../db/schemas";
import CalendarTaskTable from "../db/schemas/calendar-task";
import { StatusProvider } from "../db/schemas/task";
import { CalendarTask } from "../types";
import {
  createCalendarTask,
  getUserCalendarOrCreate,
  updateCalendarTask,
} from "./calendar";

export type CreateTaskType = {
  title: string;
  content: string;
  plainContent?: string;
  tags?: string;
  postDate: Date;
  coverImage: string;
};

export type InserTaskResponse = {
  id: number;
  createdBy: string;
  plainContent: string | null;
  content: string;
  status: StatusProvider;
};

export const createTask = async (
  event: CreateTaskType
): Promise<InserTaskResponse> => {
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
      createdBy: TaskTable.createdBy,
      plainContent: TaskTable.plainContent,
      content: TaskTable.content,
      status: TaskTable.status,
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
    console.log(e);
    throw new Error("Failed to get user tasks");
  }
};

export const getCountUserUnPublishedPost = async (): Promise<number> => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("The user id is required");
  }
  try {
    const taskCount = await db
      .select({ count: count() })
      .from(TaskTable)
      .where(
        and(eq(TaskTable.createdBy, userId), eq(TaskTable.status, "published"))
      );
    return taskCount[0].count;
  } catch (e) {
    console.log(e);
    throw new Error("Failed to get user unpublished tasks");
  }
};

export const updateTaskStatus = async (
  taskId: number,
  status: StatusProvider
): Promise<{ id: number }> => {
  if (!taskId) {
    throw new Error("The task id is required");
  }
  try {
    const response = await db
      .update(TaskTable)
      .set({ status })
      .where(eq(TaskTable.id, taskId))
      .returning({
        id: TaskTable.id,
      });
    if (response.length === 0) {
      throw new Error("Failed to update task status");
    }
    return response[0];
  } catch (e) {
    console.log(e);
    throw new Error("Failed to update task status");
  }
};

export const getTaskById = async (taskId: number): Promise<CalendarTask> => {
  if (!taskId) {
    throw new Error("The task id is required");
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
      .where(eq(TaskTable.id, taskId));
    if (!response) {
      throw new Error("Task not found");
    }
    return response[0];
  } catch (e) {
    console.log(e);
    throw new Error("Failed to get task by id");
  }
};

export const updateTask = async (
  taskId: number,
  event: CreateTaskType
): Promise<InserTaskResponse> => {
  if (!taskId) {
    throw new Error("The task id is required");
  }
  try {
    const response = await db
      .update(TaskTable)
      .set({
        title: event.title,
        content: event.content,
        plainContent: event.plainContent ?? "",
        tags: event.tags,
        coverImage: event.coverImage,
      })
      .where(eq(TaskTable.id, taskId))
      .returning({
        id: TaskTable.id,
        createdBy: TaskTable.createdBy,
        plainContent: TaskTable.plainContent,
        content: TaskTable.content,
        status: TaskTable.status,
      });
    if (response.length === 0) {
      throw new Error("Failed to update task");
    }
    await updateCalendarTask(taskId, event.postDate);
    return response[0];
  } catch (e) {
    console.log(e);
    throw new Error("Failed to update task");
  }
};

export const getNextTaskToPublish = async (
  hours: number
): Promise<CalendarTask[]> => {
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
      .where(
        and(
          gte(CalendarTaskTable.postDate, new Date()),
          lte(CalendarTaskTable.postDate, addHours(new Date(), hours)),
          eq(TaskTable.status, "pending")
        )
      );
    
    if (!response) {
      return [];
    }
    return response;
  } catch (e) {
    console.log(e);
    throw new Error("Failed to get user tasks");
  }
};
