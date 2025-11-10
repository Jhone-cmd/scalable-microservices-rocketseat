import z from 'zod'
import 'dotenv/config'

const schema = z.object({
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.url(),
  BROKER_URL: z.url(),
  OTEL_TRACES_EXPORTER: z.string(),
  OTEL_EXPORTER_OTLP_ENDPOINT: z.url(),
  OTEL_SERVICE_NAME: z.string(),
  OTEL_NODE_ENABLED_INSTRUMENTATIONS: z.string(),
})

export const env = schema.parse(process.env)
