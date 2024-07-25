import { createTask } from "@/lib/server/services/task";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import TaskForm from "./task-form";
import { taskFormSchema } from "./task-schema";

type Props = {
  defaultDate?: Date;
  task?: z.infer<typeof taskFormSchema>;
};

const TaskFormContainer: React.FC<Props> = ({ defaultDate, task }) => {
  const form = useForm<z.infer<typeof taskFormSchema>>({
    defaultValues: {
      title: task ? task.title : "",
      content: task ? task.content : "",
      tags: task ? task.tags : "",
      postDate: task ? task.postDate : defaultDate ?? new Date(),
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
