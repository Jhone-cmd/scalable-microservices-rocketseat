import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";
import * as docker from "@pulumi/docker-build"

const ordersECRRepository = new awsx.ecr.Repository('orders-ecr', {
    forceDelete: true
})

export const ordersDockerImage = new docker.Image('orders-image', {
    context: {
        location: '../app-orders',
    },
    push: true,
    registries: [{
        address: ordersECRRepository.repository.repositoryUrl
    }]
})