import { env } from '@/env/schema'
import amqp from 'amqplib'

export const broker = await amqp.connect(env.BROKER_URL)