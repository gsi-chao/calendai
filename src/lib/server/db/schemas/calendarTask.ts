import { integer, pgTable, timestamp } from "drizzle-orm/pg-core";
import calendar from "./calendar";
import task from "./task";

const CalendarTaskTable = pgTable("calendar_task", {
  calendarId: integer("calendar_id").references(() => calendar.id),
  taskId: integer("task_id").references(() => task.id),
  settledAt: timestamp("setted_at").defaultNow().notNull(),
});

export default CalendarTaskTable;
