import { z } from "zod";

export const calendarSchema = z.object({
  id: z.number().int(),
  userId: z.string().min(1),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

export type Calendar = z.infer<typeof calendarSchema>;