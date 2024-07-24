ALTER TABLE "task" RENAME COLUMN "user_id" TO "created_by";--> statement-breakpoint
ALTER TABLE "calendar_task" ADD COLUMN "post_date" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "task" ADD COLUMN "status" varchar(50) DEFAULT 'pending' NOT NULL;--> statement-breakpoint
ALTER TABLE "calendar_task" DROP COLUMN IF EXISTS "from_date";--> statement-breakpoint
ALTER TABLE "calendar_task" DROP COLUMN IF EXISTS "to_date";