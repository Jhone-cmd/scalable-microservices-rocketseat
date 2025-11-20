import * as awsx from "@pulumi/awsx";
import { cluster } from "../cluster";
import { invoicesDockerImage } from "../images/invoices";
import * as pulumi from "@pulumi/pulumi"
import { amqpListener } from "./rabbitmq-service";

export const invoicesService = new awsx.classic.ecs.FargateService('fargate-invoices', {
    cluster,
    desiredCount: 1,
    waitForSteadyState: false,
    taskDefinitionArgs: {
        container: {
            image: invoicesDockerImage.ref,
            cpu: 256,
            memory: 512,
            environment: [
                {
                    name: 'BROKER_URL',
                    value: pulumi.interpolate`amqp://admin:admin@${amqpListener.endpoint.hostname}:${amqpListener.endpoint.port}`
                },
                {
                    name: 'DATABASE_URL',
                    value: 'postgresql://Jhone-cmd:Mqxavg9UmJm1@ep-spring-cell-23303556-pooler.us-east-2.aws.neon.tech/invoices?sslmode=require&schema=public&connect_timeout=20'
                },
                {
                    name: "OTEL_TRACES_EXPORTER",
                    value: "otlp"
                },
                {
                    name: "OTEL_EXPORTER_OTLP_ENDPOINT",
                    value: "https://otlp-gateway-prod-sa-east-1.grafana.net/otlp"
                },
                {
                    name: "OTEL_EXPORTER_OTLP_HEADERS",
                    value: "Authorization=Basic MTI4MDc4MDpnbGNfZXlKdklqb2lNVFExTURrMU9DSXNJbTRpT2lKemRHRmpheTB4TWpnd056Z3dMVzkwWld3dGIyNWliMkZ5WkdsdVp5MWxkbVZ1ZEc4dGJtOWtaV3B6SWl3aWF5STZJbWhVYVRWd1dVVXhiVkV5TVU5eE5qYzNaak0xTlZwa2FpSXNJbTBpT25zaWNpSTZJbkJ5YjJRdGMyRXRaV0Z6ZEMweEluMTk="
                },
                {
                    name: "OTEL_SERVICE_NAME",
                    value: "invoices"
                },
                {
                    name: "OTEL_RESOURCE_ATTRIBUTES",
                    value: "service.name=invoices,service.namespace=scalable-microservices-invoices,deployment.environment=production"
                },
                {
                    name: "OTEL_NODE_RESOURCE_DETECTORS",
                    value: "env,host,os"
                },
                {
                    name: 'OTEL_NODE_ENABLED_INSTRUMENTATIONS',
                    value: 'http,fastify,pg,amqplib'
                }
            ]

        }
    }
})