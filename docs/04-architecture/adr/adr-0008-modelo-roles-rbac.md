---
artifact: adr
version: "1.0"
created: 2026-11-02
status: draft
---

# ADR-0008: Modelo de Perfis e Controle de Acesso Baseado em Funções (RBAC)

## Status

Proposed

**Date:** 2026-11-02
**Deciders:** Em discussão pela equipe técnica e fundadora

## Context

A plataforma do Melhor Câmbio atende três atores principais com prerrogativas operacionais totalmente distintas:
1. **Administradores da Plataforma:** Responsáveis por aprovação KYB de casas de câmbio, monitoramento geral, suspensão de contas e auditoria.
2. **Casas de Câmbio:** Organizações empresariais que precisam de segregação interna de funções (o proprietário/diretor não opera o painel o dia inteiro; o operador não pode alterar dados bancários ou excluir usuários; o financeiro precisa apenas de relatórios).
3. **Clientes:** Indivíduos ou empresas que publicam intenções de troca e fecham negócios, sem qualquer acesso a dados internos ou de outras casas.

A segurança e a integridade do sistema exigem que nenhuma rota da API REST ou evento de WebSocket possa ser executado por um perfil não autorizado. Além disso, as permissões devem ser granulares o suficiente para permitir evolução futura sem refatoração profunda.

## Decision

Implementaremos um modelo de **Controle de Acesso Baseado em Funções (Role-Based Access Control - RBAC) com suporte a hierarquia de escopo multi-tenant organizacional**:

1. **Taxonomia de Perfis (Roles Primários e Sub-Roles):**
   - `ADMIN`: Administrador global da plataforma.
   - `CLIENT`: Cliente usuário final (PF ou PJ).
   - `EXCHANGE_OWNER`: Responsável legal da Casa de Câmbio. Permissão total de configuração institucional, gestão de membros da casa e visualização financeira.
   - `EXCHANGE_OPERATOR`: Operador da Casa de Câmbio. Permissão para visualizar ofertas em tempo real, aceitar ofertas, enviar e gerenciar contrapropostas e atualizar taxas de balcão.
   - `EXCHANGE_FINANCIAL`: Analista financeiro da Casa. Permissão restrita a leitura de negociações finalizadas, relatórios de volume e conciliação (sem permissão de emitir propostas ou aceites).
2. **Estrutura de Dados e Associação Tenant:**
   - Usuários (`users`) possuem autenticação única (e-mail/senha com hash Argon2id ou Auth0).
   - A tabela `exchange_members` vincula um `user_id` a um `exchange_id` com uma função específica (`role`). Um usuário pode pertencer a apenas uma casa no MVP.
3. **Aplicação no NestJS via Decorators e Guards:**
   - Criação de decorators semânticos: `@Roles(Role.EXCHANGE_OPERATOR, Role.EXCHANGE_OWNER)` e `@RequirePermissions(Permission.OFFER_ACCEPT)`.
   - Implementação de um `RolesGuard` global que valida o token JWT, resolve a associação do usuário com o `exchange_id` no contexto da requisição (`TenantContext`) e verifica se a casa está com status `APROVADA`.
4. **Isolamento de Canais WebSocket (Namespaces e Rooms):**
   - As conexões de WebSocket autenticam o handshake via token JWT.
   - Operadores são inscritos em rooms específicos correspondentes ao escopo da sua casa (`exchange:{id}`) e às cidades/moedas cadastradas (`city:{sp}:curr:{usd}`).
   - Clientes são inscritos apenas no room das suas próprias ofertas (`user:{id}`).

## Consequences

### Positive

- **Segregação clara de responsabilidades:** Impede que colaboradores com perfil estritamente financeiro interfiram em leilões ao vivo ou que operadores alterem dados cadastrais da instituição.
- **Isolamento multi-tenant seguro:** A validação em Guard garante que uma casa de câmbio nunca visualize ou acesse recursos de outra casa.
- **Desenvolvimento declarativo e legível:** O uso de decorators (`@Roles(...)`) torna a leitura dos controllers no NestJS autoexplicativa e auditável em revisões de código.
- **Auditoria simplificada:** Todas as operações registram o `actor_id` e o `actor_role` ativo no momento da ação na tabela `audit_logs`.

### Negative

- **Complexidade de relacionamento de entidades:** A existência de sub-roles em casas de câmbio exige queries com joins ou dados adicionais inseridos no payload do JWT (claims de tenant).
- **Invalidação de sessão:** Se o Owner revogar o acesso de um operador, é necessário mecanismo de revogação de tokens (blacklist em Redis ou verificação de versão de credenciais no banco).

### Neutral

- Caso no futuro surjam demandas por permissões muito customizadas, a camada de roles pode ser decomposta em matriz de permissões (`RolePermissionMapping`) sem alterar a interface dos Guards.

## Alternatives Considered

### ABAC (Attribute-Based Access Control) Completo
Descartado por ser superdimensionado para o estágio inicial do produto. RBAC com segregação por tenant resolve 100% dos casos de uso do MVP com menor complexidade cognitiva e menor custo computacional.

### Perfis fixos em nível de coluna booleana na tabela User
Descartado por inviabilizar a separação de atribuições dentro de uma mesma casa de câmbio e dificultar a governança de segurança.

## References

- NestJS Security & Authorization Documentation: https://docs.nestjs.com/security/authorization
- [PRD - Seção de Perfis e Permissões](../03-product/prd.md)
- [ADR-0009: Onboarding e Aprovação KYB](adr-0009-onboarding-kyb-casas.md)

