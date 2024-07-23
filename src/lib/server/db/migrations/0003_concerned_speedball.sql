ALTER TABLE "calendar_task" RENAME COLUMN "setted_at" TO "from_date";--> statement-breakpoint
ALTER TABLE "calendar_task" ADD COLUMN "to_date" timestamp DEFAULT now() NOT NULL;