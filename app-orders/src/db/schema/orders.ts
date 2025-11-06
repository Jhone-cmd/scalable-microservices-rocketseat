import { randomUUID } from 'node:crypto'
import { integer, pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { customers } from './customers.ts'

export const orderStatusEnum = pgEnum('orders_status', [
  'pending',
  'paid',
  'canceled',
])

export const orders = pgTable('orders', {
  id: text()
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  customerId: text()
    .notNull()
    .references(() => customers.id),
  amount: integer().notNull(),
  status: orderStatusEnum().default('pending').notNull(),
  createdAt: timestamp().defaultNow().notNull(),
})
