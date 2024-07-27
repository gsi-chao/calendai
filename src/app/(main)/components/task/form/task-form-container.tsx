import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { createTaskSubmitAction } from "./server/action.server";
import TaskForm from "./task-form";
import { taskFormSchema, TaskFormType } from "./task-schema";

type Props = {
  defaultDate?: Date;
  task?: TaskFormType;
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
      title: task ? task.title : "",
      content: task ? task.content : "",
      tags: task ? task.tags : "",
      postDate: task ? task.postDate : defaultDate ?? new Date(),
    },
    resolver: zodResolver(taskFormSchema),
    mode: "onSubmit",
  });

  const onSubmitTask = async (data: TaskFormType) => {
    setIsSubmitting(true);
    try {
      const response = await createTaskSubmitAction(data);
      if (response.success) {
        toast.success("Task created successfully");
        onSuccess();
      }
      setIsSubmitting(false);
    } catch (e) {
      console.log(e);
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
