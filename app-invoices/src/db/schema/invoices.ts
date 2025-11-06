import { randomUUID } from 'node:crypto'
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const invoices = pgTable('invoices', {
  id: text()
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  orderId: text().notNull(),
  createdAt: timestamp().defaultNow().notNull(),
})
