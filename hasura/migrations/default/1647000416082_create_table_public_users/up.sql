CREATE TABLE "public"."users" ("id" text NOT NULL, "email" text NOT NULL, "username" text NOT NULL, PRIMARY KEY ("id") , UNIQUE ("email"), UNIQUE ("username"));
