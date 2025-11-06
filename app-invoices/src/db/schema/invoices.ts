import { text } from "drizzle-orm/pg-core";
import { timestamp } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { randomUUID } from "node:crypto";

export const invoices = pgTable('invoices', {
    id: text().primaryKey().$defaultFn(() => randomUUID()),
    orderId: text().notNull(),
    createdAt: timestamp().defaultNow().notNull()
})