import { trace } from "@opentelemetry/api";
import { env } from "../env/schema.ts";

export const tracer = trace.getTracer(env.OTEL_SERVICE_NAME)