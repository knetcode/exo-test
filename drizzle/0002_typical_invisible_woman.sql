ALTER TABLE "documents" ADD COLUMN "key" text NOT NULL;--> statement-breakpoint
ALTER TABLE "documents" ADD COLUMN "size" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "documents" ADD COLUMN "content_type" text NOT NULL;