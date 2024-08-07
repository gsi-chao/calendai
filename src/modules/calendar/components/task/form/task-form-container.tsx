import {
  generateJsonFromHtml,
  generateTextFromJson,
} from "@/components/rich_editor/util";
import { CalendarTask } from "@/lib/server/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  createTaskSubmitAction,
  updateTaskAction,
} from "./server/action.server";
import TaskForm from "./task-form";
import { taskFormSchema, TaskFormType } from "./task-schema";
import { FormStatusMode } from "./type";

type Props = {
  defaultDate?: Date;
  task?: CalendarTask;
  onSuccess: () => void;
  mode: FormStatusMode;
};

const TaskFormContainer: React.FC<Props> = ({
  defaultDate,
  task,
  mode,
  onSuccess,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<TaskFormType>({
    defaultValues: {
      title: task?.title ?? "",
      content: task?.content ?? "",
      plainContent: task?.plainContent ?? "",
      coverImage: task?.coverImage ?? "",
      tags: task?.tags ?? "",
      postDate: task ? task.postDate : defaultDate ?? new Date(),
    },
    resolver: zodResolver(taskFormSchema),
    mode: "onSubmit",
  });

  const onSubmitTask = async (data: TaskFormType) => {
    setIsSubmitting(true);
    try {
      console.log('task', task)
      const json = generateJsonFromHtml(data.content);
      data.plainContent = generateTextFromJson(json);
      const response = task?.id
        ? await updateTaskAction(task?.id, data)
        : await createTaskSubmitAction(data);
      if (response.success) {
        toast.success("Task created successfully");
        onSuccess();
      } else {
        toast.error(response.message);
      }
      setIsSubmitting(false);
    } catch (e) {
      setIsSubmitting(false);
    }
  };

  return (
    <FormProvider {...form}>
      <TaskForm
        onSubmitTask={onSubmitTask}
        isSubmitting={isSubmitting}
        mode={mode}
      />
    </FormProvider>
  );
};

export default TaskFormContainer;
