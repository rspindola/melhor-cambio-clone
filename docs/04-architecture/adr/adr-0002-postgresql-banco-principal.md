---
artifact: adr
version: "1.0"
created: 2026-11-02
status: draft
---

# ADR-0002: PostgreSQL como banco de dados principal

## Status

Proposed

**Date:** 2026-11-02
**Deciders:** Em discussão pela equipe técnica e fundadora

## Context

O sistema Melhor Câmbio lida com dados transacionais que exigem integridade referencial forte: ofertas de câmbio, contrapropostas, matches, casas de câmbio com status de aprovação, usuários com papéis e permissões. O fluxo de negociação envolve transições de estado críticas (oferta → contraproposta → match → conclusão) onde inconsistências podem significar duas casas aceitando a mesma oferta ou uma oferta expirada sendo efetivada.

Adicionalmente, o sistema precisa suportar queries complexas: ranking de ofertas por taxa, filtros geográficos por cidade/estado, relatórios de volume por casa, e histórico de negociações. O banco precisa lidar com concorrência (múltiplas casas respondendo simultaneamente a ofertas) com garantias ACID sólidas.

## Decision

Usaremos **PostgreSQL** como banco de dados principal da aplicação.

PostgreSQL será responsável por armazenar todas as entidades de domínio: usuários, casas de câmbio, ofertas, contrapropostas, matches, cotações históricas e configurações. A escolha se apoia na robustez transacional (ACID compliant), suporte nativo a tipos ricos (JSONB para metadados flexíveis, arrays, enums), controle de concorrência via MVCC, e o ecossistema de extensões disponível.

## Consequences

### Positive

- **Garantias ACID completas:** transações atômicas para operações críticas como efetivação de match e transições de estado de ofertas.
- **MVCC (Multi-Version Concurrency Control):** permite leituras concorrentes sem bloquear escritas, essencial para cenários onde múltiplas casas consultam e respondem a ofertas simultaneamente.
- **Tipos de dados ricos:** JSONB para metadados flexíveis (configurações de casa, preferências de usuário), arrays para listas de moedas suportadas, enums nativos para estados de entidades.
- **Window functions e CTEs:** queries analíticas complexas (ranking de ofertas, cálculos de spread, relatórios de volume) sem necessidade de ferramentas externas.
- **Extensões:** PostGIS para funcionalidades geográficas futuras (busca por proximidade de casas de câmbio), pg_trgm para busca fuzzy, pg_cron para manutenção.
- **SELECT FOR UPDATE e advisory locks:** mecanismos nativos para controle de concorrência no match (ver ADR-0006).
- **Ecossistema TypeScript:** integração madura com TypeORM, Prisma, MikroORM e Knex.js.
- **Confiabilidade comprovada:** PostgreSQL é amplamente utilizado em sistemas financeiros e de alta disponibilidade.

### Negative

- **Sem sharding nativo:** escalar horizontalmente requer soluções externas (Citus, particionamento manual, ou migração para CockroachDB). Para o volume inicial do MVP isso não é um problema, mas pode se tornar relevante em escala.
- **Complexidade operacional:** tuning de performance (work_mem, shared_buffers, vacuum) requer conhecimento especializado em produção.
- **Migrações de schema:** alterações em tabelas grandes podem causar locks longos se não forem planejadas com cuidado (online DDL não é nativo para todos os casos).

### Neutral

- O uso de um ORM (TypeORM ou Prisma) sobre PostgreSQL adiciona uma camada de abstração que pode limitar o uso de funcionalidades avançadas do banco, mas facilita o desenvolvimento diário e as migrações.
- PostgreSQL é software open-source sem custos de licença, mas serviços gerenciados (RDS, Cloud SQL, Supabase) têm custos proporcionais ao uso.

## Alternatives Considered

### MySQL

RDBMS popular e amplamente suportado. Oferece boa performance para leituras simples e é mais fácil de configurar inicialmente. Descartado porque: (1) suporte a JSONB inferior ao PostgreSQL (MySQL JSON é menos eficiente para queries), (2) window functions foram adicionadas tardiamente e são menos maduras, (3) MVCC implementado de forma diferente (InnoDB), com mais edge cases em isolamento transacional, (4) sem equivalente a advisory locks nativos, (5) ecossistema de extensões significativamente menor.

### MongoDB

Banco orientado a documentos, excelente para dados semi-estruturados e prototipagem rápida. Descartado porque: (1) o modelo de dados do Melhor Câmbio é altamente relacional (ofertas ↔ casas ↔ usuários ↔ contrapropostas ↔ matches), (2) garantias ACID multi-documento são recentes e menos testadas, (3) controle de concorrência transacional é inferior ao PostgreSQL para nosso caso de uso (match atômico), (4) joins entre coleções são ineficientes comparados a SQL.

### CockroachDB

Banco SQL distribuído, compatível com PostgreSQL, com sharding automático e alta disponibilidade nativa. Seria a escolha ideal para escala global, mas foi descartado porque: (1) overhead operacional e complexidade para o MVP, (2) latência ligeiramente maior que PostgreSQL para operações locais, (3) custos de infraestrutura superiores, (4) equipe não possui experiência com o sistema. CockroachDB permanece como opção de migração futura caso o volume de dados ou a necessidade de distribuição geográfica justifiquem.

## References

- [Documentação oficial do PostgreSQL](https://www.postgresql.org/docs/)
- [PostgreSQL MVCC](https://www.postgresql.org/docs/current/mvcc.html)
- [PostgreSQL Advisory Locks](https://www.postgresql.org/docs/current/explicit-locking.html#ADVISORY-LOCKS)
- [JSONB no PostgreSQL](https://www.postgresql.org/docs/current/datatype-json.html)
