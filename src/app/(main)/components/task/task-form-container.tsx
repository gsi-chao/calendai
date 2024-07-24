import { createTask } from "@/lib/server/services/task";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import TaskForm from "./task-form";
import { taskFormSchema } from "./task-schema";

const TaskFormContainer = () => {
  const form = useForm<z.infer<typeof taskFormSchema>>({
    defaultValues: {
      title: "",
      content: "",
      tags: "",
      postDate: new Date(),
    },
    resolver: zodResolver(taskFormSchema),
    mode: "onSubmit",
  });

  const onSubmitTask = async (values: z.infer<typeof taskFormSchema>) => {
    const response = await createTask(values);
    console.log("response", response);
  };

  return (
    <FormProvider {...form}>
      <TaskForm onSubmitTask={onSubmitTask} />
    </FormProvider>
  );
};

export default TaskFormContainer;
