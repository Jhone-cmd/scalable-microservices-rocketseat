import { date, text, timestamp } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { randomUUID } from "node:crypto";

export const customers = pgTable('customers', {
    id: text().primaryKey().$defaultFn(() => randomUUID()),
    name: text().notNull(),
    email: text().unique().notNull(),
    address: text().notNull(),
    state: text().notNull(),
    zipCode: text().notNull(),
    country: text().notNull(),
    dateOfBirth: date({ mode: 'date' }),
    createAt: timestamp().defaultNow().notNull()
})