---
artifact: adr
version: "1.4"
created: 2026-11-02
status: proposed
---

# ADR-0012: Modelo de Monetização e Estratégia de Cobrança

## Status

Proposed (Dependente de Parecer Jurídico Especializado e Validação Comercial no Piloto)

**Date:** 2026-11-02
**Deciders:** Equipe fundadora, comercial e assessoria jurídica

## Context

A sustentabilidade financeira e o crescimento da plataforma dependem da definição de um modelo de receita viável e escalável. Contudo, a monetização em marketplaces de produtos regulados (como câmbio) envolve restrições jurídicas complexas e riscos operacionais específicos:

1. **Restrições Regulatórias e Enquadramento:** Cobrar um percentual direto sobre o volume transacionado de câmbio (take-rate variável por %) pode ser interpretado pelo Banco Central como participação nos resultados da operação financeira cambial ou cobrança de spread cambial disfarçado, o que aproximaria a plataforma de uma atividade regulada.
2. **Risco de Vazamento (Disintermediation / Leakage):** Se a plataforma cobrar uma taxa por negócio fechado e as partes puderem conversar livremente antes do fechamento, elas têm incentivo financeiro para fechar o negócio diretamente por fora, sonegando a comissão do marketplace.
3. **Barreira de Entrada para o Piloto:** Cobrar valores fixos elevados das primeiras casas antes de comprovar liquidez e demanda real geraria atrito fatal no go-to-market.

## Decision

Propõe-se que a decisão final sobre o modelo de monetização permaneça como **`Proposed` (Em Aberto)**, orientada pelas seguintes diretrizes estratégicas e hipóteses a testar:

1. **Fase Piloto Gratuita com Compromisso (T1 / MVP):**
   - Durante o lançamento piloto com 5–10 casas comprometidas no Rio de Janeiro e em São Paulo, o uso do software será **100% gratuito** para clientes e casas.
   - O objetivo do piloto é provar liquidez, tempo de resposta e taxa de match, sem fricção financeira de cobrança.
   - **Nota de Escopo do MVP:** Nenhuma funcionalidade de faturamento, cobrança ou estorno financeiro de tarifas deve ser implementada no MVP (Fase 1); todos os modelos de precificação e estorno pertencem exclusivamente à Fase 2 (T2).
2. **Hipóteses de Modelos de Monetização Avaliadas para o T2:**
   - **Hipótese A: Assinatura Mensal (SaaS Fixo por Plano):** Casas pagam uma mensalidade fixa para ter acesso à plataforma, receber ofertas em tempo real e figurar na vitrine. Planos diferenciados por volume de filiais e cidades. *Vantagem: Menor risco regulatório (cobrança pura de software).*
   - **Hipótese B: Taxa Fixa por Match Confirmado (Success Fee em R$):** Cobrança de um valor fixo (ex: R$ 15 a R$ 30) por negócio aceito e confirmado no sistema, independente do montante em moeda estrangeira. *Vantagem: Alinhamento com o sucesso da casa, sem percentual cambial.*
   - **Hipótese C: Modelo Híbrido (Mensalidade Base Reduzida + Sucesso):** Pequena taxa de manutenção mensal combinada com taxa por match.
   - **Hipótese D: Serviços de Valor Agregado (Add-ons):** Destaque promocional na vitrine de taxas de balcão e venda de landing pages white-label personalizadas (ver ADR-0011).
3. **Mecanismo Anti-Vazamento Estrutural e Hipótese de Cobrança no Match:**
   - Os dados de identificação pessoal, telefone e endereço físico do cliente e da casa são **rigorosamente ocultados** durante a fase de leilão/contraproposta.
   - A liberação dos dados de contato ocorre **somente após a consolidação formal do match**.
   - No caso de cobrança por match, a taxa será faturada no momento do aceite no sistema (evitando o incentivo perverso de sonegação de confirmação na conclusão).
   - **Política de Estorno de Tarifa de Match (NÃO FIXADA — Em Aberto):** A política de estorno em caso de cancelamento da negociação ou decurso de prazo não está decidida e permanece como pergunta em aberto, sujeita a parecer jurídico especializado. Duas abordagens fundamentais estão sob análise:
     - *Opção 1 (Estorno exclusivamente via Disputa Formal):* A cobrança no match é considerada irrevogável por decurso de prazo; o estorno só é concedido mediante abertura formal de DISPUTA antes do prazo limite, na qual a casa de câmbio comprove documentalmente a tentativa de contato sem resposta do cliente ou a desistência unilateral do mesmo. *Risco mitigado:* Evita a desintermediação combinada (onde as partes fecham por fora e aguardam 5 dias úteis de inatividade para auferir o estorno automático da taxa).
     - *Opção 2 (Estorno Automático ou Facilitado por Cancelamento/Inatividade):* A taxa é estornada ou convertida em créditos na plataforma sempre que a negociação transicionar para `CANCELADA` por inatividade comprovada ou mútuo acordo. *Risco mitigado:* Evita que a casa parceira seja lesada financeiramente pagando por clientes que somem, desistem ou fornecem dados inválidos.
     - *Dilema em Aberto:* A conciliação entre o risco de desintermediação e o risco de penalizar financeiramente a casa por clientes fantasmas será decidida com base nas recomendações do parecer jurídico e feedback empírico do piloto.
4. **Condição Precedente para Implementação:**
   - Nenhum modelo que envolva percentual transacional será colocado em produção sem a entrega de parecer formal da consultoria jurídica atestando sua conformidade com as normas do BACEN e da Receita Federal.

## Consequences

### Positive

- **Aceleração do Go-to-Market:** Facilita a adesão imediata das casas parceiras no piloto através da rede de contatos do parceiro comercial.
- **Flexibilidade estratégica:** Permite coletar dados empíricos de WTP (disposição a pagar) e entender os custos operacionais das casas antes de fixar tabelas de preço.
- **Blindagem jurídica preventiva:** Evita desenhar fluxos de cobrança que precisariam ser cancelados por exigência do regulador.

### Negative

- **Incerteza temporária de receita:** A empresa operará com fluxo de caixa negativo durante o piloto até a ativação da cobrança no T2.
- **Risco de atrito na transição para modelo pago:** Casas acostumadas com o uso gratuito podem ameaçar churn quando a monetização for inaugurada, exigindo gestão cuidadosa de relacionamento.

### Neutral

- A arquitetura do banco de dados (NestJS/PostgreSQL) já incluirá os campos de auditoria e status de faturamento nas entidades de negociação para viabilizar integração futura com gateways de pagamento (ex: Asaas, Stripe ou Iugu).

## References

- [Discovery - Hipótese H3 de Negócio](../01-discovery/hypotheses.md)
- [PRD - Seção de Modelo de Monetização](../03-product/prd.md)
- [ADR-0010: Plataforma sem Custódia de Fundos](adr-0010-plataforma-sem-custodia.md)

---

## Histórico de Revisão

| Versão | Data | Autor | Mudanças |
|--------|------|-------|----------|
| 1.0 | 2026-11-02 | Equipe fundadora | Versão inicial propondo modelos de monetização para o T2 |
| 1.3 | 2026-11-03 | Equipe fundadora | Alinhamento com PRD v1.3: registro de que a política de estorno da taxa de match NÃO está fixada, detalhando as duas opções (estorno só via disputa formal vs. estorno automático por inatividade) e o risco de a casa pagar por cliente que some vs. risco de desintermediação, mantendo o tema em aberto sob parecer jurídico. |
| 1.4 | 2026-11-03 | Equipe fundadora | Alinhamento com PRD v1.4: explicitação formal de que o MVP (Fase 1 / T1) é 100% gratuito e que nenhuma rotina de cobrança ou estorno financeiro de tarifas deve ser implementada na Fase 1, pertencendo essas decisões e fluxos exclusivamente à Fase 2 (T2). |

