import * as awsx from "@pulumi/awsx";
import { cluster } from "../cluster";
import { appLoadBalancer, networkLoadBalancer } from "../load-balancer"

export const rabbitMQAdminTargetGroup = appLoadBalancer.createTargetGroup('rabbitmq-admin-target', {
    port: 15672,
    protocol: 'HTTP',
    healthCheck: {
        path: '/',
        protocol: 'HTTP'
    }
})

export const rabbitMQAdminHttpListener = appLoadBalancer.createListener('rabbitmq-admin-listener', {
    port: 15672,
    protocol: 'HTTP',
    targetGroup: rabbitMQAdminTargetGroup
})

export const rabbitMQService = new awsx.classic.ecs.FargateService('fargate-rabbitmq', {
    cluster,
    desiredCount: 1,
    waitForSteadyState: false,
    taskDefinitionArgs: {
        container: {
            image: 'rabbitmq:3-management',
            cpu: 256,
            memory: 512,
            portMappings: [
                rabbitMQAdminHttpListener
            ],
            environment: [
                { name: 'RABBIT_DEFAULT_USER', value: 'admin' },
                { name: 'RABBIT_DEFAULT_PASS', value: 'admin' }
            ]

        }
    }
})