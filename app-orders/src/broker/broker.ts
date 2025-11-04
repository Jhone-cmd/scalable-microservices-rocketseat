import { env } from '@/env/schema.ts'
import amqp from 'amqplib'

export const broker = await amqp.connect(env.BROKER_URL)