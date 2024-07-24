"use server";

import { auth } from "@clerk/nextjs/server";

import { db } from "../db/db";
import { TaskTable } from "../db/schemas";

type CreateTaskType = {
  title: string;
  content: string;
  tags?: string;
  postDate: Date;
};

export const createTask = async (event: CreateTaskType) => {
  // instance the database
  // create the task
  const { userId } = auth();

  if (!userId) {
    throw new Error("You must be logged in to create a task");
  }

  const response = await db
    .insert(TaskTable)
    .values({
      title: event.title,
      createdBy: userId,
      content: event.content,
      tags: event.tags,
      coverImage: "https://via.placeholder.com/150",
      thumbnail: "https://via.placeholder.com/150",
    })
    .returning({
      id: TaskTable.id,
    });
  
    

};
