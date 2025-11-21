import { appLoadBalancer } from './src/load-balancer'
import { ordersService } from './src/services/orders-service'
import { invoicesService } from './src/services/invoices-service'
import { rabbitMQService } from './src/services/rabbitmq-service'
import { kongService } from './src/services/kong-service'
import * as pulumi from '@pulumi/pulumi'

export const ordersId = ordersService.service.id
export const invoicesId = invoicesService.service.id
export const rabbitMQId = rabbitMQService.service.id
export const kongId = kongService.service.id
export const rabbitMQAdminUrl = pulumi.interpolate`http://${appLoadBalancer.listeners[0].endpoint.hostname}:15672`


