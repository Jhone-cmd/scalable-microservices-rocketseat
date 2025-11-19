import * as awsx from "@pulumi/awsx";
import { ordersDockerImage } from "../images/orders";
import { cluster } from "../cluster";
import { amqpListener } from "./rabbitmq-service";

export const ordersService = new awsx.classic.ecs.FargateService('fargate-orders', {
    cluster,
    desiredCount: 1,
    waitForSteadyState: false,
    taskDefinitionArgs: {
        container: {
            image: ordersDockerImage.ref,
            cpu: 256,
            memory: 512,
            environment: [
                {
                    name: 'BROKER_URL',
                    value: `amqp://admin:admin@${amqpListener.endpoint.hostname}:${amqpListener.endpoint.port}`
                }
            ]
        }
    }
})