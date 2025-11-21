import * as awsx from "@pulumi/awsx";
import { kongDockerImage } from "../images/kong";
import { cluster } from "../cluster";
import { ordersListener } from './orders-service'
import { invoicesListener } from './invoices-service'
import { appLoadBalancer } from "../load-balancer";

export const proxyTargetGroup = appLoadBalancer.createTargetGroup('proxy-target', {
    port: 8000,
    protocol: 'HTTP',
    healthCheck: {
        path: '/orders/health',
        protocol: 'HTTP'
    }
})

export const proxyListener = appLoadBalancer.createListener('proxy-listener', {
    port: 80,
    protocol: 'HTTP',
    targetGroup: proxyTargetGroup
})

export const adminApiTargetGroup = appLoadBalancer.createTargetGroup('admin-api-target', {
    port: 8001,
    protocol: 'HTTP',
    healthCheck: {
        path: '/',
        protocol: 'HTTP'
    }
})

export const adminApiListener = appLoadBalancer.createListener('admin-api-listener', {
    port: 8001,
    protocol: 'HTTP',
    targetGroup: adminApiTargetGroup
})

export const adminTargetGroup = appLoadBalancer.createTargetGroup('admin-target', {
    port: 8002,
    protocol: 'HTTP',
    healthCheck: {
        path: '/',
        protocol: 'HTTP'
    }
})

export const adminListener = appLoadBalancer.createListener('admin-listener', {
    port: 8002,
    protocol: 'HTTP',
    targetGroup: adminTargetGroup
})

export const kongService = new awsx.classic.ecs.FargateService('fargate-kong', {
    cluster,
    desiredCount: 1,
    waitForSteadyState: false,
    taskDefinitionArgs: {
        container: {
            image: kongDockerImage.ref,
            cpu: 256,
            memory: 512,
            portMappings: [
                proxyListener,
                adminListener,
                adminApiListener
            ],
            environment: [
                { name: 'KONG_DATABASE', value: 'off' },
                { name: 'ORDERS_SERVICE_URL', value: `http://${ordersListener.endpoint.hostname}:${ordersListener.endpoint.port}` },
                { name: 'INVOICES_SERVICE_URL', value: `http://${invoicesListener.endpoint.hostname}:${invoicesListener.endpoint.port}` }
            ]
        }
    }
})