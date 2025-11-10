import "@opentelemetry/auto-instrumentations-node/register"
import { trace } from '@opentelemetry/api'

import fastifyCors from '@fastify/cors'
import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import z from 'zod'
import { dispatchOrderCreated } from '../broker/messages/order-created.ts'
import { db } from '../db/client.ts'
import { schema } from '../db/schema/index.ts'
import { env } from '../env/schema.ts'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, { origin: true })

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.get('/health', () => 'OK')

app.post(
  '/orders',
  {
    schema: {
      body: z.object({
        amount: z.coerce.number(),
      }),
    },
  },
  async (request, reply) => {
    const { amount } = request.body

    const [order] = await db
      .insert(schema.orders)
      .values({
        customerId: '520a4288-81dd-4070-b7fe-f3bd839c915d',
        amount,
      })
      .returning({
        id: schema.orders.id,
        amount: schema.orders.amount,
        customerId: schema.orders.customerId,
      })

    trace.getActiveSpan()?.setAttribute('orderId', order.id)

    dispatchOrderCreated({
      orderId: order.id,
      amount: order.amount,
      customer: {
        id: order.customerId,
      },
    })

    return reply.status(201).send()
  }
)

app.listen({ host: '0.0.0.0', port: env.PORT }).then(() => {
  console.log('[Orders] HTTP Server Running!')
})
