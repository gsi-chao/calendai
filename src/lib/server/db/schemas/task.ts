import { boolean, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

const TaskTable = pgTable('task', {
    id: serial('id').primaryKey(),
    userId: text('user_id').notNull(),
    title: varchar('title', {length: 255}).notNull(),
    content: text('description').notNull(),
    coverImage: text('cover_image').notNull(),
    thumbnail: text('thumbnail').notNull(),
    tags: text('tags'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull().$onUpdate(() => {
        return new Date();
    }),
    isActive: boolean('is_active').default(false).notNull()
});

export default TaskTable