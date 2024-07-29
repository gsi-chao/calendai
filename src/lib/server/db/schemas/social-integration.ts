import { pgEnum, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export type SocialProviders = "linkedin" | "twitter" | "facebook";
export const socialEnum = pgEnum("provider", [
  "linkedin",
  "twitter",
  "facebook",
]);

const SocialIntegrationTable = pgTable("social_integration", {
  id: serial("id").primaryKey(),
  userId: text("user_id").unique().notNull(),
  provider: socialEnum("provider").notNull(),
  accessToken: text("access_token").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => {
      return new Date();
    }),
});

export default SocialIntegrationTable;
