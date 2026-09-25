CREATE TABLE "haven"."checkins" (
	"id" serial PRIMARY KEY NOT NULL,
	"mood" text NOT NULL,
	"created_at" text NOT NULL,
	"local_date" text
);
--> statement-breakpoint
CREATE TABLE "haven"."favorites" (
	"tool_id" text PRIMARY KEY NOT NULL,
	"created_at" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "haven"."journal_entries" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"prompt" text,
	"body" text NOT NULL,
	"created_at" text NOT NULL
);
