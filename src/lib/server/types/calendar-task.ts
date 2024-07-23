import { z } from "zod";
import { calendarSchema } from "./calendar";
import { taskSchema } from "./task";

// Crear el esquema de Zod basado en el esquema de Drizzle
export const calendarTaskSchema = z.object({
  calendar: calendarSchema,
  task: taskSchema,
  postDate: z
    .date()
    .default(() => new Date()),
});

// Inferir el tipo desde el esquema de Zod
export type CalendarTask = z.infer<typeof calendarTaskSchema>;
