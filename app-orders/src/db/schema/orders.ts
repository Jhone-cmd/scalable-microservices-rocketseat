import { text } from "drizzle-orm/pg-core";
import { timestamp } from "drizzle-orm/pg-core";
import { pgEnum } from "drizzle-orm/pg-core";
import { integer } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { randomUUID } from "node:crypto";
import { customers } from "./customers.ts";

export const orderStatusEnum = pgEnum('orders_status', [
    'pending',
    'paid',
    'canceled'
])

export const orders = pgTable('orders', {
    id: text().primaryKey().$defaultFn(() => randomUUID()),
    customerId: text().notNull().references(() => customers.id),
    amount: integer().notNull(),
    status: orderStatusEnum().default('pending').notNull(),
    createdAt: timestamp().defaultNow().notNull()
})