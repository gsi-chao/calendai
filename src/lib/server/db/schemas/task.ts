import {
  boolean,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export type StatusProvider = "pending" | "published";
export const statusEnum = pgEnum("status", [
  "pending",
  "published"
]);

const TaskTable = pgTable("task", {
  id: serial("id").primaryKey(),
  createdBy: text("created_by").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("description").notNull(),
  plainContent: text("plain_content"),
  coverImage: text("cover_image").notNull(),
  thumbnail: text("thumbnail").notNull(),
  tags: text("tags"),
  createdAt: timestamp("created_at",{withTimezone: false}).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", {withTimezone: false})
    .defaultNow()
    .notNull()
    .$onUpdate(() => {
      return new Date();
    }),
  status: statusEnum("status").default("pending").notNull(),
  isActive: boolean("is_active").default(false).notNull(),
});

export default TaskTable;
