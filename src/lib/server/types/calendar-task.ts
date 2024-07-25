import { Task } from "./task";

export type CalendarTask = Task & {
  postDate: Date;
};
