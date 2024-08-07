import { z } from "zod";

export const taskFormSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(30),
  plainContent: z.string().optional(),
  tags: z.string().optional(),
  postDate: z
    .date()
    .min(new Date(), { message: "Post date should be in the future" })
    .default(() => new Date()),
  coverImage: z.string().url(),
});

export type TaskFormType = z.infer<typeof taskFormSchema>;
