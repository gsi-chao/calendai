ALTER TABLE "calendar_task" RENAME COLUMN "task" TO "task_id";--> statement-breakpoint
ALTER TABLE "calendar_task" DROP CONSTRAINT "calendar_task_task_task_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "calendar_task" ADD CONSTRAINT "calendar_task_task_id_task_id_fk" FOREIGN KEY ("task_id") REFERENCES "public"."task"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
