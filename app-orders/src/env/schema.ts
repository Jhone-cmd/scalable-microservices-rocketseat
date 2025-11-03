import z from "zod";
import 'dotenv/config'

const schema = z.object({
    DATABASE_URL: z.url()
})

export const env = schema.parse(process.env)