---
artifact: adr
version: "1.0"
created: 2026-11-02
status: proposed
---

# ADR-0011: Arquitetura Multi-Tenant de Landing Pages White-Label e API Pública

## Status

Proposed (Post-MVP / Fase de Expansão)

**Date:** 2026-11-02
**Deciders:** Equipe fundadora e equipe de produto

## Context

Como oportunidade futura de monetização e expansão de canal (B2B2C), as casas de câmbio parceiras manifestaram interesse em possuir páginas web modernas e otimizadas para captação de clientes locais (landing pages white-label), personalizadas com a sua identidade visual (logotipo, cores, unidades de atendimento e taxas do dia).

Além disso, grandes casas ou parceiros comerciais podem desejar integrar seus próprios sistemas legados de tesouraria ou ERPs à plataforma para automatizar o envio de lances e recebimento de ofertas, demandando uma API pública estruturada e autenticada via API Keys.

Essa funcionalidade pertence à fase pós-MVP, mas requer diretrizes arquiteturais prévias para não gerar acoplamento indevido no núcleo transacional do sistema.

## Decision

Propõe-se que a infraestrutura de Landing Pages White-Label e API Pública seja implementada como uma camada periférica desacoplada:

1. **Aplicação Next.js Multi-Tenant Dedicada:**
   - Criada dentro do monorepo (`apps/landing-pages`), utilizando Next.js com App Router e Server-Side Rendering (SSR) / Incremental Static Regeneration (ISR) para máxima performance de SEO.
   - Resolução dinâmica de tenant baseada no hostname da requisição (ex: `cambio-ipanema.melhorcambio.com.br` ou domínio customizado `www.cambioipanema.com.br`).
   - Middleware de roteamento do Next.js identifica o tenant e injeta a configuração de branding (tema, logos, textos, taxas) armazenada no banco de dados.
2. **API Pública REST com Versionamento (`/api/v1/public`):**
   - Módulo isolado no NestJS dedicado a integrações externas.
   - Autenticação via API Keys (`X-API-Key`) associadas a permissões restritas da Casa de Câmbio.
   - Rate limiting agressivo por tenant via Redis (`@nestjs/throttler`).
   - Documentação viva gerada automaticamente via OpenAPI / Swagger.
3. **Webhooks de Notificação Externa:**
   - Para permitir que as casas recebam ofertas sem manter conexão WebSocket aberta em seus servidores legados, o sistema implementará disparo de webhooks assinados criptograficamente (`HMAC-SHA256`).

## Consequences

### Positive

- **Nova linha de receita B2B:** Possibilita cobrança recorrente adicional por hospedagem de landing pages white-label e acesso a APIs de automação.
- **Autoridade e SEO local:** Cada subdomínio/domínio indexa palavras-chave locais ("câmbio em Ipanema", "comprar dólar em Moema"), atraindo tráfego orgânico qualificado para a plataforma.
- **Desacoplamento arquitetural:** A aplicação web pública consome a mesma API e tipos compartilhados do monorepo, sem poluir a lógica de domínio do leilão.

### Negative

- **Complexidade de Infraestrutura e Certificados SSL:** O suporte a domínios customizados de clientes exige roteamento dinâmico de SSL (ex: via Cloudflare for SaaS, Vercel ou Caddy Server).
- **Sobrecarga de Suporte Técnico:** Atender chamados de clientes sobre configuração de DNS e integração de APIs corporativas consome tempo da equipe de engenharia.

### Neutral

- Esta iniciativa é categorizada como "Won't have" para o MVP inicial e sua execução depende da validação de demanda e retenção no piloto de RJ e SP.

## Alternatives Considered

### Landing Pages Geradas em Plataforma Externa (WordPress / Webflow)
Descartada por dificultar a exibição em tempo real das taxas cadastradas no backend e impossibilitar a criação direta de ofertas a partir da própria página.

### Conexão direta ao banco de dados pelo ERP da Casa
Descartada categoricamente por razões óbvias de segurança, quebra de encapsulamento e risco de corrupção de dados.

## References

- Next.js Multi-Tenant Guide: https://github.com/vercel/platforms
- [Prioritization Framework - Candidatos Post-MVP](../02-strategy/prioritization.md)
- [PRD - Seção de Escopo](../03-product/prd.md)

