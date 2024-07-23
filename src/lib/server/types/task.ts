import { z } from "zod";

export const taskSchema = z.object({
  id: z.number().int(),
  createdBy: z.string().min(1),
  title: z.string().max(255),
  content: z.string().min(1),
  coverImage: z.string().min(1),
  thumbnail: z.string().min(1),
  tags: z.string().optional(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
  status: z.enum(["pending", "published"]).default("pending"),
  isActive: z.boolean().default(false),
});

export type Task = z.infer<typeof taskSchema>;