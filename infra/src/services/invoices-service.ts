import * as awsx from "@pulumi/awsx";
import { ordersDockerImage } from "../images/orders";
import { cluster } from "../cluster";

export const invoicesService = new awsx.classic.ecs.FargateService('fargate-invoices', {
    cluster,
    desiredCount: 1,
    waitForSteadyState: false,
    taskDefinitionArgs: {
        container: {
            image: ordersDockerImage.ref,
            cpu: 256,
            memory: 512,
        }
    }
})