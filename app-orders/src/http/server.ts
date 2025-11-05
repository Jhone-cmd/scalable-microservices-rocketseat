import fastify from "fastify"
import fastifyCors from "@fastify/cors"
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { channels } from "../broker/channels/index.ts"
import { randomUUID } from "node:crypto"
import { db } from "../db/client.ts"
import { schema } from "../db/schema/index.ts"

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, { origin: true })

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.get('/health', () => {
    return "OK"
})

app.post('/orders', {
    schema: {
        body: z.object({
            amount: z.coerce.number()
        })
    }
}, async (request, reply) => {
    const { amount } = request.body

    await db.insert(schema.orders).values({
        consumerId: '8d788347-a848-4b72-a6dc-f28083557fe2',
        amount
    })

    channels.orders.sendToQueue('orders', Buffer.from(JSON.stringify({ amount })))

    return reply.status(201).send()

})

app.listen({ host: '0.0.0.0', port: 3333 }).then(() => {
    console.log('[Orders] HTTP Server Running!')
})