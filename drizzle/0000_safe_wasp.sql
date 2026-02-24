CREATE TABLE "applications" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "applications_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"company" text NOT NULL,
	"position" text NOT NULL,
	"status" text NOT NULL,
	"application_date" text NOT NULL,
	"min_salary" integer NOT NULL,
	"max_salary" integer NOT NULL
);
