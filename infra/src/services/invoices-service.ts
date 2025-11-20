import * as awsx from "@pulumi/awsx";
import { cluster } from "../cluster";
import { invoicesDockerImage } from "../images/invoices";

export const invoicesService = new awsx.classic.ecs.FargateService('fargate-invoices', {
    cluster,
    desiredCount: 1,
    waitForSteadyState: false,
    taskDefinitionArgs: {
        container: {
            image: invoicesDockerImage.ref,
            cpu: 256,
            memory: 512,
        }
    }
})