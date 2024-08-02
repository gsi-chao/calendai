import {
  generateJsonFromHtml,
  generateTextFromJson,
} from "@/components/rich_editor/util";
import { CalendarTask } from "@/lib/server/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { createTaskSubmitAction } from "./server/action.server";
import TaskForm from "./task-form";
import { taskFormSchema, TaskFormType } from "./task-schema";

type Props = {
  defaultDate?: Date;
  task?: CalendarTask;
  onSuccess: () => void;
};

const TaskFormContainer: React.FC<Props> = ({
  defaultDate,
  task,
  onSuccess,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<TaskFormType>({
    defaultValues: {
      title: task?.title ?? "",
      content: task?.content ?? "",
      plainContent: task?.plainContent ?? "",
      tags: task?.tags ?? "",
      postDate: task ? task.postDate : defaultDate ?? new Date()
    },
    resolver: zodResolver(taskFormSchema),
    mode: "onSubmit",
  });

  const onSubmitTask = async (data: TaskFormType) => {
    setIsSubmitting(true);
    try {
      const json = generateJsonFromHtml(data.content);
      data.plainContent = generateTextFromJson(json);
      const response = await createTaskSubmitAction(data);
      if (response.success) {
        toast.success("Task created successfully");
        onSuccess();
      }
      setIsSubmitting(false);
    } catch (e) {
      setIsSubmitting(false);
    }
  };

  return (
    <FormProvider {...form}>
      <TaskForm onSubmitTask={onSubmitTask} isSubmitting={isSubmitting} />
    </FormProvider>
  );
};

export default TaskFormContainer;
