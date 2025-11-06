import fastify from "fastify"
import fastifyCors from "@fastify/cors"
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from 'fastify-type-provider-zod'
import { env } from "../env/schema.ts"

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, { origin: true })

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.get('/health', () => {
    return "OK"
})

app.listen({ host: '0.0.0.0', port: env.PORT }).then(() => {
    console.log('[Invoices] HTTP Server Running!')
})