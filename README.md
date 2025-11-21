**Scalable Microservices (Rocketseat)**

**Project**: Projeto de exemplo de microserviços escaláveis construído em TypeScript. Este projeto foi criado acompanhando as aulas da plataforma RocketSeat.

**Overview**:
- **Description**: Conjunto de microserviços que demonstra comunicação assíncrona via RabbitMQ, persistência com Drizzle (Postgres), gateway API com Kong, infraestrutura com Docker e Pulumi, e observabilidade com OpenTelemetry.

**Microservices**:
- **`app-orders`**: Serviço responsável por receber pedidos (`/orders`), persistir no banco e emitir eventos (`order-created`) para o broker.
- **`app-invoices`**: Serviço responsável por consumir eventos de pedidos e gerar/inicializar faturas; contém o subscriber para processar mensagens do broker.
- **`contracts`**: Contratos de mensagens/DTOs compartilhados entre serviços (ex.: `order-created-message.ts`).
- **`infra`**: Código de infraestrutura (Pulumi) e definições para imagens/serviços (Kong, RabbitMQ, serviços). Inclui configurações para ambientes de deploy.
- **`docker`**: Configurações e templates usados para o Kong e a orquestração local.

**Principais Funcionalidades**:
- Criação de pedidos via API HTTP.
- Emissão de eventos assíncronos para processamento (RabbitMQ).
- Consumo de eventos para gerar faturas (pagamento/faturamento básico).
- Banco de dados com migrations e schema gerenciado por Drizzle.
- API Gateway com Kong para roteamento e políticas.
- Observabilidade com OpenTelemetry (tracing) e instrumentações automáticas.
- Docker + docker-compose para orquestração local de desenvolvimento.

**Estrutura de Pastas (resumo)**:
- **`app-orders/`**: Código fonte do serviço de pedidos
  - `src/http/server.ts` : Servidor HTTP (Fastify) e rota `/orders`.
  - `src/broker/` : Código do broker (producer) e mensagens.
  - `src/db/` : Cliente e migrations (Drizzle).
  - `src/env/` : Validação/variáveis de ambiente.
  - `src/tracer/` : Configuração de tracing (OpenTelemetry).

- **`app-invoices/`**: Código fonte do serviço de faturas
  - `src/http/server.ts` : Servidor HTTP (Fastify) e healthcheck.
  - `src/broker/subscriber.ts` : Subscriber que consome mensagens do RabbitMQ.
  - `src/db/` : Cliente e migrations (Drizzle).

- **`contracts/`**
  - `messages/` : Tipos/contratos compartilhados (ex.: `order-created-message.ts`).

- **`infra/`**
  - `src/` : Scripts Pulumi para criar serviços, imagens e infra.

- **`docker/`**
  - `kong/` : Templates e `Dockerfile` para a imagem do Kong.

**Principais Arquivos**:
- `docker-compose.yml` : Orquestração local (raiz) e arquivos específicos dentro de cada serviço.
- `pnpm-workspace.yaml` : Monorepo (pnpm) workspace.
- `drizzle.config.ts` : Configuração do ORM Drizzle para migrações e schema.

**Bibliotecas e Ferramentas Usadas**:
- **Linguagem/Run**: `Node.js`, `TypeScript`.
- **Gerenciamento de pacotes**: `pnpm` (workspaces).
- **Framework HTTP**: `fastify` + `@fastify/cors`.
- **Validação/Types**: `zod` e `fastify-type-provider-zod`.
- **ORM**: `drizzle-orm` (migrations e schema definitions).
- **Broker / Messaging**: `amqplib` / cliente RabbitMQ custom (código em `src/broker`).
- **API Gateway**: `Kong` (configurações em `docker/kong`).
- **Observabilidade**: `@opentelemetry/*` (instrumentations, API) para tracing.
- **Containerização / Infra**: `Docker`, `docker-compose`, `Pulumi` para infra como código.

**Como Rodar (resumo)**:
- Pré-requisitos: `Node >= 18`, `pnpm`, `Docker` e `docker-compose`.
- Instalar dependências (na raiz):

  `pnpm install`

- Rodar todos os serviços localmente (exemplo com docker-compose + serviços locais):

  - Subir infra com Docker (RabbitMQ, Kong, Postgres):

    `docker-compose up -d`

  - Rodar serviços (cada serviço em sua pasta):

    `pnpm --filter app-orders dev`
    `pnpm --filter app-invoices dev`

  Observação: alguns repositórios usam `pnpm` workspaces e scripts específicos em cada `package.json`.

**Observações Técnicas**:
- As rotas são implementadas com `fastify` e validação via `zod` (integração `fastify-type-provider-zod`).
- A comunicação assíncrona usa mensagens tipadas que estão em `contracts/messages`.
- O projeto inclui migrations e esquemas (Drizzle) em cada serviço que precisa de persistência.
- Instrumentação de tracing é feita com `@opentelemetry/auto-instrumentations-node/register` e configurações locais em `src/tracer`.

**Créditos**:
- Projeto desenvolvido como material de aprendizado — feito assistindo às aulas da plataforma **RocketSeat**.


