import * as datefns from "date-fns";
import { CalendarTask } from "../types";

export const _tasks: CalendarTask[] = [
  {
    calendar: {
      id: 3,
      userId: "Calendar 3",
      createdAt: datefns.addHours(new Date(), -1),
      updatedAt: new Date(),
    },
    task: {
      id: 1,
      createdBy: "1",
      title: "Task 3",
      content: "Description 3",
      coverImage: "Cover Image 3",
      thumbnail: "Thumbnail 3",
      tags: "Tags 3",
      createdAt: new Date(),
      updatedAt: new Date(),
      status: "pending",
      isActive: true,
    },
    postDate: datefns.addHours(new Date(), -1),
  },
  {
    calendar: {
      id: 1,
      userId: "Calendar 1",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    task: {
      id: 1,
      createdBy: "1",
      title: "Task 1",
      content: "Description 1",
      coverImage: "Cover Image 1",
      thumbnail: "Thumbnail 1",
      tags: "Tags 1",
      createdAt: new Date(),
      updatedAt: new Date(),
      status: "published",
      isActive: true,
    },
    postDate: new Date(),
  },
  {
    calendar: {
      id: 2,
      userId: "Calendar 2",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    task: {
      id: 1,
      createdBy: "1",
      title: "Task 2",
      content: "Description 2",
      coverImage: "Cover Image 2",
      thumbnail: "Thumbnail 2",
      tags: "Tags 2",
      createdAt: new Date(),
      updatedAt: new Date(),
      status: "pending",
      isActive: true,
    },
    postDate: new Date(),
  },
];
