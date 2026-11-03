---
artifact: adr
version: "1.0"
created: 2026-11-02
status: draft
---

# ADR-0003: Redis + BullMQ para expiração e filas

## Status

Proposed

**Date:** 2026-11-02
**Deciders:** Em discussão pela equipe técnica e fundadora

## Context

O fluxo de negociação do Melhor Câmbio depende de temporalidade: ofertas têm prazo de expiração configurável, contrapropostas expiram se não forem respondidas, e cotações de referência precisam ser atualizadas periodicamente. Esses processos precisam ser executados de forma confiável em background, com garantias de entrega e retry automático em caso de falha.

Além dos jobs agendados, o sistema requer:

- **Cache de cotações:** a API de cotações externa tem rate limits; resultados devem ser cacheados com TTL configurável para reduzir chamadas e melhorar a latência.
- **Pub/Sub para WebSocket:** distribuição de eventos em tempo real para múltiplas instâncias do backend (escala horizontal futura).
- **Jobs assíncronos:** envio de notificações (e-mail, push), processamento de documentos de onboarding, geração de relatórios.

A solução precisa combinar cache, pub/sub e fila de jobs em uma infraestrutura operacionalmente simples para o MVP.

## Decision

Usaremos **Redis** como sistema de cache e pub/sub, e **BullMQ** como sistema de filas de jobs, ambos compartilhando a mesma instância Redis.

- **Redis** armazenará: cache de cotações (TTL configurável), sessões de WebSocket (para escala horizontal via Redis adapter do Socket.IO), e dados voláteis de alta leitura.
- **BullMQ** gerenciará: expiração agendada de ofertas e contrapropostas (delayed jobs), notificações assíncronas, atualização periódica de cotações (repeatable jobs), e qualquer processamento background.

## Consequences

### Positive

- **Simplicidade operacional:** uma única instância Redis serve cache, pub/sub e filas, reduzindo a complexidade de infraestrutura no MVP.
- **Scheduled jobs nativos no BullMQ:** delayed jobs permitem agendar a expiração de ofertas/contrapropostas no momento da criação, sem necessidade de polling ou cron em banco.
- **Retry automático:** BullMQ oferece retry com backoff exponencial configurável, dead-letter queue para jobs que falharam permanentemente, e eventos de progresso.
- **Cache de cotações no mesmo Redis:** evita uma dependência adicional; cotações são armazenadas com TTL e servidas diretamente do cache, reduzindo chamadas à API externa.
- **Integração nativa com NestJS:** `@nestjs/bull` (e `@nestjs/bullmq`) fornece decorators (`@Process`, `@OnQueueEvent`) e injeção de dependência para processadores de fila.
- **Observabilidade:** BullMQ expõe métricas de fila (jobs ativos, aguardando, falhados) e integra com dashboards como Bull Board para monitoramento visual.
- **Baixa latência:** Redis opera em memória, oferecendo latência sub-milissegundo para operações de cache e pub/sub.

### Negative

- **Single point of failure:** se a instância Redis cair sem persistência configurada, jobs agendados e cache são perdidos. Mitigação: habilitar AOF (Append Only File) e/ou RDB snapshots; em produção, considerar Redis Sentinel ou Redis Cluster.
- **Memória limitada:** todos os dados residem em RAM; crescimento descontrolado de filas ou cache pode consumir memória. Mitigação: definir `maxmemory` com política de eviction adequada e monitorar uso.
- **Persistência não é garantida por padrão:** diferente de um message broker dedicado como RabbitMQ, Redis pode perder dados entre snapshots. Para jobs críticos (expiração de oferta), o AOF configurado como `appendfsync everysec` oferece um bom equilíbrio.
- **Escala horizontal requer planejamento:** BullMQ funciona com Redis Cluster, mas a migração de uma instância única para cluster demanda configuração adicional.

### Neutral

- BullMQ substitui a versão anterior Bull com API mais moderna e melhor suporte a TypeScript, mas a comunidade ainda referencia ambas as bibliotecas em muita documentação.
- A decisão de usar Redis para cache e filas na mesma instância é adequada para o MVP; em escala, pode ser necessário separar as instâncias para isolar workloads.

## Alternatives Considered

### RabbitMQ

Message broker AMQP completo, com garantias de entrega fortes, routing flexível (exchanges, bindings), e persistência nativa. Descartado porque: (1) adiciona uma dependência de infraestrutura separada do Redis (que já é necessário para cache e WebSocket), (2) não resolve cache de cotações, (3) complexidade operacional maior (Erlang runtime, management plugin, configuração de exchanges), (4) para o volume e a complexidade de filas do MVP, BullMQ sobre Redis é suficiente e mais simples.

### AWS SQS

Serviço de filas gerenciado, escalável e sem servidor. Descartado porque: (1) cria vendor lock-in com AWS, (2) não resolve cache nem pub/sub, (3) latência maior que Redis para jobs agendados (SQS não tem delayed jobs com precisão de segundo), (4) custo adicional para alto volume de mensagens, (5) dificulta desenvolvimento local (requer LocalStack ou emulador).

### Agenda/cron jobs em banco de dados

Utilizar o próprio PostgreSQL com tabelas de jobs e polling periódico (biblioteca Agenda, ou pg_cron). Descartado porque: (1) polling adiciona carga ao banco de dados, (2) latência de processamento depende do intervalo de polling, (3) sem mecanismos nativos de retry com backoff, (4) não resolve cache, (5) mistura responsabilidades do banco transacional com workloads de fila.

### Apache Kafka

Plataforma de streaming distribuído, ideal para event sourcing e processamento de alto volume. Descartado porque: (1) complexidade operacional excessiva para o MVP (ZooKeeper/KRaft, partições, consumer groups), (2) Kafka resolve problemas de escala que o Melhor Câmbio ainda não tem, (3) não é adequado para delayed jobs (expiração de ofertas) sem extensões adicionais, (4) overhead de infraestrutura incompatível com uma equipe pequena.

## References

- [Documentação do BullMQ](https://docs.bullmq.io/)
- [NestJS Queues com Bull/BullMQ](https://docs.nestjs.com/techniques/queues)
- [Redis Persistence](https://redis.io/docs/management/persistence/)
- [Redis como adapter para Socket.IO](https://socket.io/docs/v4/redis-adapter/)
