---
artifact: adr
version: "1.0"
created: 2026-11-02
status: draft
---

# ADR-0007: Estrutura de Monorepo e Tipos Compartilhados (Shared Types)

## Status

Proposed

*(Nota: O uso de NestJS no backend e React no frontend são decisões confirmadas e aceitas pelo fundador; a arquitetura específica de monorepo via Turborepo/pnpm e pacote de shared types permanece como proposta técnica).*

**Date:** 2026-11-02
**Deciders:** Em discussão pela equipe técnica e fundadora

## Context

O ecossistema do Melhor Câmbio é composto por múltiplos artefatos de software desenvolvidos na mesma linguagem (TypeScript):
- Backend em **NestJS** (API REST, WebSocket Gateway e workers BullMQ);
- Frontend Web em **React** (Painel do Cliente, Painel da Casa e Painel Admin);
- Futuro aplicativo Mobile em **React Native / Expo**;
- Futuras **Landing Pages multi-tenant em Next.js** para as casas parceiras.

Todos esses componentes compartilham uma grande quantidade de estruturas de dados e regras de negócio invariantes:
- Enums de estados (`OfferStatus`, `ProposalStatus`, `NegotiationStatus`, `ExchangeStatus`);
- Enums de domínio (`CurrencyCode`, `ProductType`, `OperationType`, `DeliveryType`, `UserRole`);
- DTOs de requisição e resposta (criação de oferta, envio de contraproposta, payloads de WebSocket);
- Interfaces de eventos de tempo real (contratos de mensagens do Socket.IO).

Em arquiteturas tradicionais com repositórios isolados (polyrepo), manter a sincronização de tipos entre backend e frontend exige publicar pacotes npm privados a cada alteração ou duplicar código manualmente, gerando divergências silenciosas, quebras em tempo de execução e lentidão no desenvolvimento.

## Decision

Adotaremos uma **arquitetura de Monorepo gerenciada por ferramentas modernas de build orchestration (Turborepo ou Nx com pnpm)**, com um pacote central `@melhor-cambio/shared` para tipos e utilitários de domínio compartilhados:

1. **Estrutura de Diretórios Padronizada:**
   ```
   ├── apps/
   │   ├── api/                 # Backend NestJS
   │   ├── web/                 # Frontend React (Vite / Next.js)
   │   ├── mobile/              # Mobile React Native/Expo (futuro)
   │   └── landing-pages/       # Multi-tenant Next.js (post-MVP)
   ├── packages/
   │   ├── shared/              # Interfaces, Enums, DTOs e Types TypeScript
   │   ├── config-eslint/       # Regras padronizadas de linting
   │   └── config-typescript/   # tsconfig base compartilhado
   ├── pnpm-workspace.yaml
   └── turbo.json
   ```
2. **Consumo Direto de Tipos (Zero-Build em Dev):**
   - As aplicações importam contratos diretamente: `import { OfferStatus, CreateOfferDto } from '@melhor-cambio/shared'`.
   - Utilização de `pnpm workspace:*` e TypeScript project references para navegação transparente no editor (IDE) e refatoração instantânea com renomeação global de símbolos.
3. **Validação Unificada de Schemas:**
   - O pacote `shared` conterá também schemas de validação agnósticos (usando **Zod**), permitindo validar payloads no formulário do frontend React e no payload dos endpoints do NestJS usando a mesmíssima fonte de verdade.

## Consequences

### Positive

- **Type Safety End-to-End estrita:** Alterações em contratos de API ou novos estados de negociação quebram a compilação do frontend imediatamente se não forem tratados.
- **Refatorações atômicas:** É possível renomear uma propriedade ou criar um novo status em um único commit Git afetando backend e frontend simultaneamente sem versionamento intermediário de pacotes.
- **Pipeline de CI/CD integrado:** Validação e build em um único fluxo com cache inteligente (Turborepo), economizando tempo de execução e garantindo paridade entre versões em deploy.
- **Redução drástica de boilerplate:** Elimina a necessidade de pipelines de publicação e gerenciamento de permissões em registros npm privados.

### Negative

- **Complexidade de Tooling Inicial:** Exige configuração cuidadosa de workspaces, dependências circulares e caminhos de compilação do TypeScript.
- **Tamanho do repositório:** Todo o histórico de commits e código de todas as aplicações reside no mesmo repositório git, exigindo disciplina de branching.
- **Configuração de CI:** Exige runners com capacidade adequada e configuração de filtros (`turbo run build --filter=...`) para não recompilar aplicações inalteradas.

### Neutral

- A governança de versionamento segue o modelo Trunk-Based Development com continuous integration e tags por release.

## Alternatives Considered

### Repositórios Separados (Polyrepo) com Pacote NPM Privado
Descartado devido ao atrito operacional gigantesco para um time enxuto no início de projeto (fazer PR no repo de tipos, aprovar, buildar, publicar no NPM, atualizar versão no backend, atualizar versão no frontend).

### Polyrepo com Duplicação Manual de Interfaces
Descartado categoricamente pelo alto risco de inconsistência em tempo de execução entre os formatos esperados pelo NestJS e enviados pelo React.

## References

- Turborepo Documentation: https://turbo.build/repo
- PNPM Workspaces: https://pnpm.io/workspaces
- [PRD - Seção de Stack Pretendida](../03-product/prd.md)

