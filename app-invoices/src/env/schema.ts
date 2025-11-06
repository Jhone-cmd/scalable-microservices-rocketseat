import z from "zod";
import 'dotenv/config'

const schema = z.object({
    PORT: z.coerce.number().default(3334),
    DATABASE_URL: z.url(),
    BROKER_URL: z.url()
})

export const env = schema.parse(process.env)