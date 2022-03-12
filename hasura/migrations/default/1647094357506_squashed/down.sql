
alter table "public"."products" drop constraint "products_user_id_code_key";

comment on column "public"."products"."code" is NULL;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."products" add column "code" text
--  null;
