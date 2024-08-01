import { CalendarTask } from "@/lib/server/types";
import { addHours } from "date-fns";

export const mapTasksToEvents = (calendarTasks: CalendarTask[]) =>
  calendarTasks.map((calendarTask) => ({
    title: calendarTask.title,
    start: calendarTask.postDate,
    end: addHours(calendarTask.postDate, 1),
  }));
