"use server";

import { ActionResponse } from "@/core/types/response";
import { createTask } from "@/lib/server/services/task";
import { InsertResponse } from "@/lib/server/types/response";
import { taskFormSchema, TaskFormType } from "../task-schema";

export const createTaskSubmitAction = async (
  values: TaskFormType
): Promise<ActionResponse<InsertResponse | null>> => {
  console.log("enter here");
  try {
    const parsed = taskFormSchema.safeParse(values);
    if (!parsed.success) {
      return { success: false, message: "Invalid values", data: null };
    }

    const response = await createTask(parsed.data);

    return {
      success: true,
      message: "Task created successfully",
      data: response,
    };
  } catch (e) {
    return { success: false, message: "Failed to create task", data: null };
  }
};
