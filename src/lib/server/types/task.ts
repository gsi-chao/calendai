import { InferSelectModel } from "drizzle-orm";
import { TaskTable } from "../db/schemas";

export type Task = InferSelectModel<typeof TaskTable>;
