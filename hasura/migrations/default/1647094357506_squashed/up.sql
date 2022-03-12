
alter table "public"."products" add column "code" text
 null;

comment on column "public"."products"."code" is E'This field represents the barcode of the product, if available.';

alter table "public"."products" add constraint "products_user_id_code_key" unique ("user_id", "code");
