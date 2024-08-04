"use server";

import { ActionResponse } from "@/core/types/response";
import { inngest } from "@/lib/server/inngest/client";
import {
  createTask,
  getCountUserUnPublishedPost,
} from "@/lib/server/services/task";
import { InsertResponse } from "@/lib/server/types/response";
import { addHours, isAfter } from "date-fns";
import { taskFormSchema, TaskFormType } from "../task-schema";

export const createTaskSubmitAction = async (
  values: TaskFormType
): Promise<ActionResponse<InsertResponse | null>> => {
  try {
    const parsed = taskFormSchema.safeParse(values);
    if (!parsed.success) {
      return { success: false, message: "Invalid values", data: null };
    }

    const count = await getCountUserUnPublishedPost();
    if (count > Number(process.env.NEXT_PUBLIC_MAX_ACTIVE_POST ?? 5)) {
      return {
        success: false,
        message: "You have reached the maximum number of active posts",
        data: null,
      };
    }
    const response = await createTask(parsed.data);

    // Send the task to the inngest function
    if (isAfter(addHours(new Date(), 3), parsed.data.postDate)) {
      await inngest.send({
        name: "calendai/publish.now",
        data: {
          postDate: parsed.data.postDate,
          content: response.plainContent,
          userId: response.createdBy,
          taskId: response.id,
        },
      });
    }

    return {
      success: true,
      message: "Task created successfully",
      data: response,
    };
  } catch (e) {
    return { success: false, message: "Failed to create task", data: null };
  }
};
