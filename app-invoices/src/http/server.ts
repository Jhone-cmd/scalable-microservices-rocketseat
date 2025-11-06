import fastify from "fastify"
import fastifyCors from "@fastify/cors"
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from 'fastify-type-provider-zod'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, { origin: true })

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.get('/health', () => {
    return "OK"
})

app.listen({ host: '0.0.0.0', port: 3334 }).then(() => {
    console.log('[Orders] HTTP Server Running!')
})