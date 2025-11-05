ALTER TABLE "orders" DROP CONSTRAINT "orders_consumer_id_customers_id_fk";
--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "customer_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_customer_id_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" DROP COLUMN "consumer_id";