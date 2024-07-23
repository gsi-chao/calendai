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

  return (
    <FormProvider {...form}>
      <TaskForm />
    </FormProvider>
  );
};

export default TaskFormContainer
