import { z } from "zod"

export const taskFormSchema = z.object({
    title: z.string().min(1),
    content: z.string().min(30),
    tags: z.string().optional(),
    postDate: z.date().default(() => new Date()),
})

export type TaskFormType = z.infer<typeof taskFormSchema>