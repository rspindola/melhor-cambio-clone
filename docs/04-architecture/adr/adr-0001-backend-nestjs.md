---
artifact: adr
version: "1.0"
created: 2026-11-02
status: draft
---

# ADR-0001: Backend em NestJS

## Status

Accepted

**Date:** 2026-11-02
**Deciders:** Equipe fundadora

## Context

O sistema Melhor Câmbio exige um backend robusto que suporte comunicação em tempo real via WebSocket (casas de câmbio recebendo ofertas, clientes visualizando contrapropostas), uma arquitetura modular que acomode múltiplos domínios de negócio (ofertas, casas, cotações, negociações) e um ecossistema maduro com integrações prontas para banco de dados, filas, cache e autenticação.

A equipe fundadora possui experiência consolidada em TypeScript, o que torna frameworks baseados nessa linguagem a escolha natural. A produtividade no longo prazo e a manutenibilidade do código são prioridades, dado que o produto terá complexidade crescente (multi-tenancy, RBAC, fluxos assíncronos com expiração de ofertas).

## Decision

Usaremos **NestJS** como framework do backend da aplicação.

NestJS fornece uma arquitetura modular opinada com suporte nativo a decorators, injeção de dependência (DI), guards, interceptors, pipes e middleware. Sua integração direta com TypeORM/Prisma, Socket.IO (via `@nestjs/websockets`), BullMQ (via `@nestjs/bull`) e Passport (via `@nestjs/passport`) reduz significativamente o esforço de integração e padroniza os padrões de desenvolvimento.

## Consequences

### Positive

- **Modularidade nativa:** cada domínio (ofertas, casas, cotações, auth) vive em seu próprio módulo NestJS, com boundaries claros e injeção de dependência resolvida pelo framework.
- **Decorators e DI:** reduzem boilerplate e facilitam separação de responsabilidades (guards para auth, pipes para validação, interceptors para logging/cache).
- **Ecossistema maduro:** pacotes oficiais para WebSocket, filas (BullMQ), cache (Redis), validação (class-validator), serialização (class-transformer) e documentação (Swagger/OpenAPI).
- **TypeScript first-class:** tipagem estática end-to-end, compatível com a estratégia de monorepo com tipos compartilhados (ver ADR-0007).
- **Testabilidade:** DI facilita mocking e testes unitários; o módulo de testing (`@nestjs/testing`) simplifica testes de integração.
- **Comunidade e documentação:** framework amplamente adotado com documentação extensa e atualizações frequentes.

### Negative

- **Curva de aprendizado:** desenvolvedores acostumados com Express.js puro precisarão aprender os padrões opinados do NestJS (módulos, providers, decorators, lifecycle hooks).
- **Overhead para APIs simples:** para endpoints triviais, a estrutura de módulos/controllers/services pode parecer excessiva comparada a um Express.js minimalista.
- **Abstração sobre abstrações:** NestJS adiciona camadas sobre Express ou Fastify, o que pode dificultar debugging em cenários de baixo nível.
- **Tamanho do bundle e cold start:** relevante se futuramente considerarmos deploy serverless (Lambda/Cloud Functions).

### Neutral

- NestJS permite trocar o HTTP adapter de Express para Fastify sem alterar a lógica de negócio, mantendo a porta aberta para otimizações futuras de performance.
- A adoção de NestJS define um padrão arquitetural opinado que toda a equipe precisa seguir — isso é positivo para consistência, mas requer alinhamento inicial.

## Alternatives Considered

### Express.js puro

Framework HTTP minimalista, amplamente conhecido. Oferece máxima flexibilidade, porém sem opinião sobre estrutura de projeto. Para um sistema com a complexidade do Melhor Câmbio (WebSocket, filas, RBAC, multi-tenancy), a equipe teria que implementar manualmente os padrões que o NestJS fornece nativamente (DI, módulos, guards), resultando em código ad-hoc e maior risco de inconsistência arquitetural. Descartado pela ausência de estrutura opinada.

### Fastify

Framework HTTP de alto desempenho com sistema de plugins e validação via JSON Schema. Superior ao Express em throughput bruto, porém com ecossistema menor para WebSocket integrado, filas e RBAC. Não possui DI nativa nem padrão de módulos. Nota: NestJS pode usar Fastify como HTTP adapter, combinando a arquitetura opinada do NestJS com a performance do Fastify — essa opção permanece disponível para otimizações futuras.

### Hapi

Framework enterprise com sistema de plugins, validação (Joi) e autenticação integrados. Ecossistema menor que Express/NestJS, comunidade em declínio nos últimos anos e pouca integração com WebSocket e BullMQ. A curva de aprendizado do sistema de plugins do Hapi é comparável à do NestJS, sem os mesmos benefícios de ecossistema.

### Koa

Framework minimalista criado pela equipe original do Express, usando async/await nativamente. Sofre dos mesmos problemas do Express puro: sem opinião sobre estrutura, sem DI, sem suporte a WebSocket ou filas integrado. A vantagem de middleware assíncrono elegante não compensa a falta de estrutura para um projeto desta escala.

## References

- [Documentação oficial do NestJS](https://docs.nestjs.com/)
- [NestJS WebSocket Gateway](https://docs.nestjs.com/websockets/gateways)
- [NestJS Bull Queue](https://docs.nestjs.com/techniques/queues)
- [Comparativo NestJS vs Express vs Fastify](https://docs.nestjs.com/techniques/performance)
