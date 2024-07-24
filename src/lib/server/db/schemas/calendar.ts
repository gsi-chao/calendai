import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

const CalendarTable = pgTable('calendar', {
    id: serial('id').primaryKey(),
    userId: text('user_id').unique().notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull().$onUpdate(() => {
        return new Date();
    })
});

export default CalendarTable