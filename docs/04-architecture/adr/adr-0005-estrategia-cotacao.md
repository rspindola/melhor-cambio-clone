---
artifact: adr
version: "1.0"
created: 2026-11-02
status: draft
---

# ADR-0005: Estratégia de Cotação de Referência (Provedor, Cache e Fallback)

## Status

Proposed

**Date:** 2026-11-02
**Deciders:** Em discussão pela equipe técnica e fundadora

## Context

O marketplace precisa apresentar aos clientes cotações de referência atualizadas (Dólar Comercial, Turismo e PTAX, além de Euro e outras moedas) para que eles tenham embasamento financeiro ao formular suas taxas desejadas. Da mesma forma, as casas de câmbio utilizam a cotação de mercado para avaliar se uma oferta recebida é viável de ser aceita ou contraposta.

As principais forças em jogo são:
- **Latência e disponibilidade:** A interface não pode travar ou ficar bloqueada por lentidão de APIs financeiras externas.
- **Custos e limites de requisição (Rate Limits):** Provedores de mercado impõem cotas de requisição e custos por chamada. Se cada usuário fizesse requisições diretas do front-end, estouraríamos limites rapidamente.
- **Segurança e desacoplamento:** Chaves de API e segredos de provedores não devem ser expostos no front-end.
- **Resiliência:** Provedores de cotação gratuitos ou freemium podem sofrer instabilidades ocasionais.

## Decision

Adotaremos a seguinte estratégia arquitetural para cotações de referência:

1. **AwesomeAPI como Provedor Primário:** Utilizaremos a AwesomeAPI para cotações comerciais e de turismo em tempo real, complementada pela API oficial de dados abertos do Banco Central (Olinda) para a taxa PTAX oficial.
2. **Segundo Provedor de Fallback:** Manteremos uma interface genérica de provedor (`QuoteProviderPort`) com adaptador secundário configurável (ex: ExchangeRatesAPI, Fixer ou HG Brasil) para acionamento automático em caso de indisponibilidade contínua do provedor primário. *(Provedor secundário específico mantido como: Em aberto)*.
3. **Isolamento Total do Front-end:** O front-end (React Web ou Mobile) **nunca** chamará diretamente APIs de cotação externas. Toda comunicação ocorre via backend próprio.
4. **Cache em Redis com Estratégia Stale-While-Revalidate:**
   - As cotações são atualizadas em background por um worker agendado a cada 60 segundos durante o horário de mercado.
   - O resultado é persistido no Redis com TTL de 300 segundos (5 minutos).
   - Requisições HTTP via REST consultam o cache Redis (`O(1)`).
   - Eventos de atualização de taxas são transmitidos aos clientes conectados via WebSocket (canal `quotes:rates`).
   - Se o provedor falhar, o sistema serve a última cotação em cache marcando a propriedade `is_stale: true`.

## Consequences

### Positive

- **Desempenho elevado:** Front-end recebe cotações instantaneamente do Redis em poucos milissegundos.
- **Economia de requisições:** Milhares de usuários conectados consomem a mesma leitura centralizada em cache, gerando apenas ~60 chamadas externas por hora.
- **Segurança de credenciais:** Chaves de API externas ficam restritas ao ambiente isolado do backend.
- **Resiliência a falhas:** Quedas temporárias da AwesomeAPI não derrubam a aplicação nem impedem a exibição de cotações recentes aos usuários.

### Negative

- **Latência de mercado (Delay):** Cotações possuem um delay operacional planejado de até 60 segundos em relação ao mercado à vista, o que deve ser explicitado visualmente ao usuário.
- **Dependência de provedores de terceiros:** Mudanças estruturais na API gratuita da AwesomeAPI exigem manutenção imediata do adapter.

### Neutral

- A arquitetura baseada em portas e adaptadores (Hexagonal) permite plugar novos provedores corporativos (Bloomberg, Refinitiv) futuramente sem alterar a camada de aplicação.

## Alternatives Considered

### Chamada direta do front-end aos provedores
Descartada devido à exposição de chaves, impossibilidade de cache compartilhado entre usuários, risco de esgotamento de rate limits e falta de fallback centralizado.

### Consulta síncrona ao provedor em cada requisição de cliente
Descartada porque aumentaria a latência da API para 500ms–2000ms e causaria estrangulamento de requisições sob qualquer pico de tráfego.

## References

- [PRD - Seção de Cotações de Referência](../03-product/prd.md)
- AwesomeAPI Documentation: https://docs.awesomeapi.com.br/
- Banco Central do Brasil - API Olinda PTAX

