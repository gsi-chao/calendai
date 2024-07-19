import { boolean, integer, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

const BlogPostsTable = pgTable('blog_posts', {
    id: serial('id').primaryKey(),
    userId: text('user_id').notNull(),
    title: varchar('title', {length: 255}).notNull(),
    content: text('content').notNull(),
    authorId: integer('author_id').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull().$onUpdate(() => {
        return new Date();
    }),
    isPublished: boolean('is_published').default(false).notNull()
});

export default BlogPostsTable;