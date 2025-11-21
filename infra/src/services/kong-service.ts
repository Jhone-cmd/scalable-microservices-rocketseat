import * as awsx from "@pulumi/awsx";
import { kongDockerImage } from "../images/kong";
import { cluster } from "../cluster";
import { ordersListener } from './orders-service'
import { invoicesListener } from './invoices-service'

export const kongService = new awsx.classic.ecs.FargateService('fargate-kong', {
    cluster,
    desiredCount: 1,
    waitForSteadyState: false,
    taskDefinitionArgs: {
        container: {
            image: kongDockerImage.ref,
            cpu: 256,
            memory: 512,
            environment: [
                { name: 'KONG_DATABASE', value: 'off' },
                { name: 'ORDERS_SERVICE_URL', value: `http://${ordersListener.endpoint.hostname}:${ordersListener.endpoint.port}` },
                { name: 'INVOICES_SERVICE_URL', value: `http://${invoicesListener.endpoint.hostname}:${invoicesListener.endpoint.port}` }
            ]
        }
    }
})