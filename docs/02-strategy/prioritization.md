---
artifact: prioritization-framework
version: "1.5.1"
created: 2026-11-03
status: draft
context: "Definição de escopo MVP para marketplace de câmbio com lançamento em RJ e SP (Revisão v1.5.1 com reavaliação de automação de taxas e landing pages)"
---

# Priorização: Definição de Escopo MVP — Marketplace de Câmbio (RJ/SP)

## 1. Applicability Filter Summary

Três frameworks foram executados nesta análise. **ICE** é sempre aplicável e foi executado com estimativas grossas (1–10) para Impact, Confidence e Ease. **MoSCoW** foi executado porque a decisão envolve delimitação binária de escopo para o MVP — exatamente o cenário para o qual foi desenhado. **Weighted Scoring** foi executado com critérios padrão (business value, customer value, effort, risk, strategic fit) e pesos iguais de 20% cada; os pesos iguais são explicitamente uma escolha e devem ser ajustados para refletir as prioridades reais da organização.

- **Executados:** ICE, MoSCoW, Weighted Scoring
- **Excluídos:**
  - **RICE** — excluído por ausência de dados quantitativos de reach (número de usuários atingidos por trimestre) e effort (semanas de engenharia calibradas). Sem esses inputs, os scores RICE seriam fabricação. Para desbloquear RICE, forneça estimativas de reach por item e calibre effort em semanas de engenharia reais da equipe.
  - **Kano** — excluído por ausência total de pesquisa com clientes. Categorias Kano (Must-Have, Performance, Delighter) só são defensáveis com dados de pesquisa. Para desbloquear, execute uma pesquisa Kano perguntando, por feature, como o usuário se sentiria se estivesse presente e como se sentiria se estivesse ausente.

## 2. Inputs Summary

**16 itens candidatos** foram fornecidos: 9 candidatos a MVP e 7 candidatos post-MVP. Cada item possui nome, descrição funcional e contexto de negócio.

**Dados disponíveis:** descrições funcionais, dependências lógicas entre features, contexto de mercado (câmbio, regulação), e escopo do lançamento (RJ e SP).

**Dados NÃO disponíveis (assumidos):**
- Reach quantitativo (número de usuários): não fornecido.
- Effort em semanas de engenharia: não fornecido. Estimativas de Ease no ICE são baseadas em complexidade técnica relativa inferida das descrições [HIPÓTESE – A VALIDAR].
- Dados de pesquisa com clientes: não fornecidos.
- Métricas de conversão ou retenção: não fornecidas.

> [!IMPORTANT]
> Todos os scores abaixo são baseados em julgamento qualitativo a partir das descrições fornecidas. Nenhum dado quantitativo de usuários, receita ou esforço de engenharia foi disponibilizado. As estimativas devem ser validadas com a equipe de engenharia e stakeholders de negócio.

## 3. Per-Framework Scoring

### 3.1 ICE

<!-- Score = Impact × Confidence × Ease, cada dimensão 1-10 -->

| # | Item | Impact (1-10) | Confidence (1-10) | Ease (1-10) | ICE Score | Notes |
|---|------|---------------|-------------------|-------------|-----------|-------|
| 1 | Cadastro e aprovação de casas (KYB) | 10 | 9 | 6 | 540 | Sem casas cadastradas, não há marketplace. Fluxo CRUD + aprovação admin; complexidade moderada (upload docs, máquina de estados) |
| 2 | Cotação em tempo real | 9 | 8 | 7 | 504 | Core da proposta de valor. API AwesomeAPI é pública e documentada; cache Redis e WebSocket adicionam complexidade mas são padrões conhecidos |
| 3 | Criar oferta | 10 | 9 | 6 | 540 | Ação central do cliente; formulário com regras de negócio (moeda, valor, taxa, prazo). Complexidade moderada |
| 4 | Aceite direto | 10 | 8 | 7 | 560 | Match automático é o coração do marketplace. Lógica "first to accept" com controle transacional é bem definida |
| 5 | Contrapropostas | 8 | 7 | 5 | 280 | Agrega valor, mas adiciona complexidade significativa à negociação; lista de contrapropostas, aceite/recusa, estados adicionais |
| 6 | Negociação com estados | 9 | 8 | 4 | 288 | Máquina de estados complexa (3 entidades × múltiplos estados); essencial para rastrear ciclo de vida, mas alto esforço |
| 7 | Notificações em tempo real | 7 | 8 | 6 | 336 | Importante para UX mas não bloqueia fluxo funcional; WebSocket já necessário para cotações |
| 8 | Vitrine de taxas | 5 | 7 | 8 | 280 | Informativo; CRUD simples por casa/moeda. Valor incremental, não core |
| 9 | Painel admin | 8 | 9 | 5 | 360 | Essencial para operação (aprovar casas, visão geral). Escopo pode ser grande; disciplina necessária para MVP mínimo |
| 10 | Sistema de cobrança | 7 | 4 | 3 | 84 | Depende de parecer jurídico [HIPÓTESE – A VALIDAR]; alta incerteza regulatória |
| 11 | Chat entre cliente e casa | 5 | 6 | 6 | 180 | Útil pós-match, mas WhatsApp/telefone são alternativas viáveis no curto prazo |
| 12 | Sistema de reputação | 5 | 5 | 6 | 150 | Valor cresce com volume; com poucas casas no lançamento, impacto é baixo |
| 13 | App mobile (React Native) | 6 | 5 | 3 | 90 | Alto esforço; web responsiva pode servir inicialmente |
| 14 | API pública | 4 | 4 | 5 | 80 | Sem parceiros de integração identificados no momento |
| 15 | Landing pages white-label | 4 | 4 | 4 | 64 | Complexidade multi-tenant; valor depende de tração comercial futura |
| 16 | Geolocalização | 5 | 6 | 6 | 180 | Útil em RJ/SP com múltiplas casas; implementação com Google Maps API é padrão |

### 3.2 MoSCoW

<!-- Must = obrigatório para lançamento; Should = importante mas não crítico; Could = nice to have; Won't = post-MVP -->

| # | Item | Bucket | Rationale | Risk if dropped |
|---|------|--------|-----------|-----------------|
| 1 | Cadastro e aprovação de casas (KYB) | **Must** | Sem casas aprovadas, o marketplace não existe. É pré-requisito para todo o restante | Impossível lançar |
| 2 | Cotação em tempo real | **Must** | Proposta de valor central: cliente precisa ver cotações para fazer ofertas informadas | Produto perde razão de existir; clientes não confiam sem referência de preço |
| 3 | Criar oferta | **Must** | Ação primária do cliente no marketplace; sem oferta não há negociação | Impossível lançar |
| 4 | Aceite direto | **Must** | Match automático é o core do marketplace; sem aceite, oferta não se concretiza | Impossível fechar negócios |
| 5 | Contrapropostas | **Should** | Enriquece a negociação e dá flexibilidade às casas; porém aceite direto já permite fechar negócios | Casas só podem aceitar ou ignorar; reduz competitividade mas não impede operação |
| 6 | Negociação com estados | **Must** | Rastrear o ciclo de vida oferta→proposta→negociação é essencial para integridade operacional | Sem estados, impossível saber se negociação foi concluída, está em disputa ou foi cancelada |
| 7 | Notificações em tempo real | **Should** | Casas precisam ser alertadas de novas ofertas para reagir rápido; sem notificação, dependem de polling manual | Casas perdem ofertas por não verem a tempo; UX degradada, mas funcionalidade existe |
| 8 | Vitrine de taxas | **Could** | Informativo para clientes compararem antes de criar oferta; não é parte do fluxo core de negociação | Clientes criam ofertas sem referência de preço por casa; cotação de referência (item 2) mitiga parcialmente |
| 9 | Painel admin | **Must** | Operações dependem de aprovar casas e monitorar o sistema. Sem admin, não há governança | Impossível aprovar casas; sistema opera sem supervisão |
| 10 | Sistema de cobrança | **Won't** | Depende de parecer jurídico pendente; complexidade regulatória impede inclusão no MVP | Receita adiada; pode operar inicialmente sem cobrança (tração > monetização no lançamento) |
| 11 | Chat entre cliente e casa | **Won't** | Comunicação pós-match pode ocorrer via WhatsApp/telefone inicialmente | Experiência fragmentada, mas não impede operação |
| 12 | Sistema de reputação | **Won't** | Valor cresce com volume de negociações; no lançamento, base é pequena demais | Sem mecanismo de confiança automatizado; mitigável com curadoria manual |
| 13 | App mobile | **Won't** | Alto esforço; web responsiva serve para validação inicial | Perde conveniência mobile, mas não impede uso |
| 14 | API pública | **Won't** | Sem demanda de integração externa identificada | Nenhum impacto imediato |
| 15 | Landing pages white-label | **Won't** | Valor depende de modelo B2B futuro; complexidade multi-tenant prematura | Nenhum impacto imediato |
| 16 | Geolocalização | **Could** | Útil para UX em cidades grandes, mas não bloqueia nenhum fluxo | Clientes não filtram por proximidade; contornável com filtros manuais |

### 3.3 Weighted Scoring

<!-- Score = Σ(Weight_i × Score_i). Critérios: business value, customer value, effort (invertido: 10=baixo esforço), risk (invertido: 10=baixo risco), strategic fit. Todos 1-10. -->

> [!WARNING]
> **Pesos iguais (20% cada) são uma escolha explícita, não um default neutro.** Pesos iguais tratam business value, customer value, facilidade de execução, risco e alinhamento estratégico como igualmente importantes. Na prática, o time pode valorizar mais customer value no lançamento ou penalizar mais risco regulatório. **Ajuste os pesos para refletir o que a organização realmente prioriza.**

| # | Item | Business Value (20%) | Customer Value (20%) | Effort inv. (20%) | Risk inv. (20%) | Strategic Fit (20%) | Weighted Score |
|---|------|---------------------|---------------------|-------------------|----------------|--------------------:|---------------:|
| 1 | Cadastro e aprovação de casas (KYB) | 10 | 8 | 6 | 8 | 10 | 8.4 |
| 2 | Cotação em tempo real | 9 | 10 | 7 | 8 | 10 | 8.8 |
| 3 | Criar oferta | 10 | 10 | 6 | 8 | 10 | 8.8 |
| 4 | Aceite direto | 10 | 9 | 7 | 7 | 10 | 8.6 |
| 5 | Contrapropostas | 7 | 7 | 5 | 6 | 8 | 6.6 |
| 6 | Negociação com estados | 8 | 7 | 4 | 7 | 9 | 7.0 |
| 7 | Notificações em tempo real | 6 | 8 | 6 | 8 | 7 | 7.0 |
| 8 | Vitrine de taxas | 5 | 6 | 8 | 9 | 6 | 6.8 |
| 9 | Painel admin | 9 | 5 | 5 | 7 | 9 | 7.0 |
| 10 | Sistema de cobrança | 9 | 3 | 3 | 3 | 7 | 5.0 |
| 11 | Chat entre cliente e casa | 4 | 6 | 6 | 8 | 5 | 5.8 |
| 12 | Sistema de reputação | 5 | 5 | 6 | 7 | 6 | 5.8 |
| 13 | App mobile | 5 | 7 | 3 | 6 | 5 | 5.2 |
| 14 | API pública | 4 | 3 | 5 | 6 | 4 | 4.4 |
| 15 | Landing pages white-label | 4 | 3 | 4 | 5 | 4 | 4.0 |
| 16 | Geolocalização | 4 | 6 | 6 | 8 | 5 | 5.8 |

## 4. Per-Framework Ranking Output

### ICE Ranking (score descending)

| Rank | Item | ICE Score | Tier |
|------|------|-----------|------|
| 1 | Aceite direto | 560 | 🟢 Tier 1 — Core |
| 2 | Criar oferta | 540 | 🟢 Tier 1 — Core |
| 3 | Cadastro e aprovação de casas (KYB) | 540 | 🟢 Tier 1 — Core |
| 4 | Cotação em tempo real | 504 | 🟢 Tier 1 — Core |
| 5 | Painel admin | 360 | 🟡 Tier 2 — Operacional |
| 6 | Notificações em tempo real | 336 | 🟡 Tier 2 — Operacional |
| 7 | Negociação com estados | 288 | 🟡 Tier 2 — Operacional |
| 8 | Contrapropostas | 280 | 🟡 Tier 2 — Complementar |
| 9 | Vitrine de taxas | 280 | 🟡 Tier 2 — Complementar |
| 10 | Chat entre cliente e casa | 180 | 🔴 Tier 3 — Post-MVP |
| 11 | Geolocalização | 180 | 🔴 Tier 3 — Post-MVP |
| 12 | Sistema de reputação | 150 | 🔴 Tier 3 — Post-MVP |
| 13 | App mobile | 90 | 🔴 Tier 3 — Post-MVP |
| 14 | Sistema de cobrança | 84 | 🔴 Tier 3 — Post-MVP |
| 15 | API pública | 80 | 🔴 Tier 3 — Post-MVP |
| 16 | Landing pages white-label | 64 | 🔴 Tier 3 — Post-MVP |

**Gap entre tiers:** Tier 1 (504–560) → Tier 2 (280–360) → Tier 3 (64–180). O gap mais significativo está entre Tier 1 e Tier 2 (~144 pontos), confirmando que os 4 itens core se destacam claramente.

### MoSCoW Grouping

- **Must (5):** Cadastro KYB, Cotação em tempo real, Criar oferta, Aceite direto, Negociação com estados, Painel admin
- **Should (2):** Contrapropostas, Notificações em tempo real
- **Could (2):** Vitrine de taxas, Geolocalização
- **Won't (6):** Sistema de cobrança, Chat, Sistema de reputação, App mobile, API pública, Landing pages white-label

### Weighted Scoring Ranking (score descending)

| Rank | Item | Weighted Score |
|------|------|---------------:|
| 1 | Cotação em tempo real | 8.8 |
| 2 | Criar oferta | 8.8 |
| 3 | Aceite direto | 8.6 |
| 4 | Cadastro e aprovação de casas (KYB) | 8.4 |
| 5 | Negociação com estados | 7.0 |
| 6 | Notificações em tempo real | 7.0 |
| 7 | Painel admin | 7.0 |
| 8 | Vitrine de taxas | 6.8 |
| 9 | Contrapropostas | 6.6 |
| 10 | Chat entre cliente e casa | 5.8 |
| 11 | Sistema de reputação | 5.8 |
| 12 | Geolocalização | 5.8 |
| 13 | App mobile | 5.2 |
| 14 | Sistema de cobrança | 5.0 |
| 15 | API pública | 4.4 |
| 16 | Landing pages white-label | 4.0 |

## 5. Cross-Framework Comparison

| # | Item | ICE Rank | MoSCoW Bucket | WS Rank | Concordância |
|---|------|----------|---------------|---------|-------------|
| 1 | Cadastro e aprovação de casas (KYB) | 3 | Must | 4 | ✅ **Forte** |
| 2 | Cotação em tempo real | 4 | Must | 1 | ✅ **Forte** |
| 3 | Criar oferta | 2 | Must | 2 | ✅ **Forte** |
| 4 | Aceite direto | 1 | Must | 3 | ✅ **Forte** |
| 5 | Contrapropostas | 8 | Should | 9 | ✅ **Forte** (concordam: importante mas não core) |
| 6 | Negociação com estados | 7 | Must | 5 | ⚠️ **Divergente** |
| 7 | Notificações em tempo real | 6 | Should | 6 | ✅ **Forte** |
| 8 | Vitrine de taxas | 9 | Could | 8 | ✅ **Forte** |
| 9 | Painel admin | 5 | Must | 7 | ⚠️ **Divergente** |
| 10 | Sistema de cobrança | 14 | Won't | 14 | ✅ **Forte** (concordam: adiar) |
| 11 | Chat entre cliente e casa | 10 | Won't | 10 | ✅ **Forte** (concordam: adiar) |
| 12 | Sistema de reputação | 12 | Won't | 11 | ✅ **Forte** (concordam: adiar) |
| 13 | App mobile | 13 | Won't | 13 | ✅ **Forte** (concordam: adiar) |
| 14 | API pública | 15 | Won't | 15 | ✅ **Forte** (concordam: adiar) |
| 15 | Landing pages white-label | 16 | Won't | 16 | ✅ **Forte** (concordam: adiar) |
| 16 | Geolocalização | 11 | Could | 12 | ✅ **Forte** |

### Análise das Divergências

**Negociação com estados (ICE #7, MoSCoW Must, WS #5):**
O ICE coloca este item no meio do ranking porque a dimensão **Ease** é baixa (4/10) — a máquina de estados com 3 entidades e múltiplos estados é tecnicamente complexa. Porém, MoSCoW o classifica como Must porque sem rastreamento de estados, o sistema não tem integridade operacional: é impossível saber se uma negociação foi concluída ou está em disputa. **A divergência revela que o ICE penaliza itens de infraestrutura que são custosos mas incontornáveis.** Neste caso, MoSCoW está correto: negociação com estados é obrigatória, independentemente do esforço.

**Painel admin (ICE #5, MoSCoW Must, WS #7):**
O ICE posiciona admin razoavelmente bem (#5), mas o Weighted Scoring o rebaixa para #7 porque o **Customer Value** é baixo (5/10) — clientes finais não interagem com o painel. MoSCoW o marca Must porque sem ele é impossível aprovar casas e operar o sistema. **A divergência revela que frameworks centrados em valor para o cliente subestimam ferramentas operacionais internas.** O admin é Must por dependência operacional, não por valor direto ao consumidor.

## 6. Executive Summary with Recommendation

Os três frameworks convergem fortemente em **4 itens core que são inequivocamente MVP**: Cadastro KYB, Cotação em tempo real, Criar oferta e Aceite direto. Estes ocupam as primeiras posições em todos os rankings e são Must no MoSCoW — sem qualquer um deles, o marketplace não funciona. A eles somam-se **2 itens operacionais obrigatórios** (Negociação com estados e Painel admin), que o ICE posiciona mais abaixo por penalizar esforço, mas que são incontornáveis para integridade e governança do sistema.

A zona de decisão real está nos itens #5 (Contrapropostas) e #7 (Notificações em tempo real), ambos classificados como **Should**. **Recomendação: incluir Notificações no MVP** por reutilizar infraestrutura WebSocket já necessária para cotações, e **postergar Contrapropostas para a fase imediatamente pós-lançamento** — o aceite direto já permite fechar negócios, e contrapropostas adicionam complexidade significativa à máquina de estados.

Os 7 itens post-MVP (Sistema de cobrança, Chat, Reputação, App mobile, API pública, Landing pages white-label, Geolocalização) têm concordância unânime entre os frameworks: todos devem ser adiados. A divergência mais importante desta análise é a que envolve **Negociação com estados**: se a equipe depender apenas do ICE para decidir, pode erroneamente adiar uma feature obrigatória por confundi-la com uma feature de alto esforço e baixo retorno.

## 7. Sensitivity / What Changes the Ranking

**Cenário 1 — Contrapropostas ganham Ease:**
Se a equipe de engenharia implementar contrapropostas como extensão natural do aceite direto (reutilizando a mesma máquina de estados), o Ease sobe de 5 para 7, e o ICE salta de 280 para 392, colocando-o próximo ao Tier 1. Nesse caso, incluir contrapropostas no MVP se torna defensável. **Ação: validar com engenharia se a arquitetura do aceite direto suporta contrapropostas com esforço incremental baixo** [HIPÓTESE – A VALIDAR].

**Cenário 2 — Notificações tornam-se Must:**
Se testes de usabilidade revelarem que casas de câmbio não monitoram a plataforma ativamente (cenário provável — operam no balcão), notificações passam de Should para Must. Sem elas, ofertas expiram antes de serem vistas pelas casas, quebrando o marketplace. **Ação: validar com casas de câmbio parceiras qual é o comportamento real de monitoramento** [HIPÓTESE – A VALIDAR].

**Cenário 3 — Vitrine de taxas sobe se casas exigirem:**
Se casas de câmbio considerarem a vitrine de taxas como condição para adesão à plataforma ("quero que meus preços apareçam"), seu Impact sobe e ela migra de Could para Should ou Must. **Ação: validar na fase de onboarding das primeiras casas** [HIPÓTESE – A VALIDAR].

**Cenário 4 — Peso de Risk inflado:**
Se o peso de Risk no Weighted Scoring subir para 30% (priorizando itens de baixo risco), Sistema de cobrança cai ainda mais (Risk = 3/10) e Vitrine de taxas sobe (Risk inv. = 9/10). A recomendação de MVP não muda, mas a sequência post-MVP se altera.

## 8. Recommendations (Sequencing)

### Financiar agora (MVP — Lançamento)

```
Fase 1 — Fundação (sem estas, nada funciona):
  1. Cadastro e aprovação de casas (KYB)
  2. Painel admin (mínimo: aprovação KYB + visão geral)

Fase 2 — Core do marketplace:
  3. Cotação em tempo real (API + cache + WebSocket)
  4. Criar oferta
  5. Aceite direto (match automático)
  6. Negociação com estados (máquina de estados completa)

Fase 3 — UX essencial:
  7. Notificações em tempo real (reutiliza WebSocket da cotação)
```

### Incluir se capacidade permitir (MVP+)

- **Contrapropostas** — incluir se engenharia confirmar baixo esforço incremental
- **Vitrine de taxas** — incluir se casas demandarem durante onboarding

### Adiar (Post-MVP — sequência sugerida)

| Ordem | Item | Trigger para reavaliação |
|-------|------|-------------------------|
| 1º | Contrapropostas | Feedback de casas pedindo flexibilidade de negociação |
| 2º | Geolocalização | Volume de casas em RJ/SP > 20 por cidade [HIPÓTESE – A VALIDAR] |
| 3º | Chat | Volume de negociações > 100/mês [HIPÓTESE – A VALIDAR] |
| 4º | Sistema de reputação | Volume de negociações concluídas suficiente para ranking significativo |
| 5º | Sistema de cobrança | Parecer jurídico concluído + modelo de negócio validado |
| 6º | App mobile | Validação de que web responsiva não atende UX mobile |
| 7º | Landing pages white-label | Modelo B2B com casas confirmado |
| 8º | API pública | Demanda de parceiros de integração identificada |

### Dados que mudariam esta recomendação

- **Esforço de engenharia real** por item (desbloquearia RICE e refinaria ICE/Ease)
- **Pesquisa com casas de câmbio** sobre comportamento de monitoramento e expectativas (desbloquearia Kano)
- **Parecer jurídico** sobre modelo de cobrança (desbloquearia priorização do sistema de cobrança)
- **Testes de usabilidade** do fluxo oferta→aceite com clientes reais

### Próximo passo

Validar este ranking com a equipe de engenharia para calibrar Ease/Effort e com 3–5 casas de câmbio parceiras para calibrar percepção de valor. Após validação, usar o ranking resultante como input para o roadmap de desenvolvimento.

## 9. Limitations and Biases

1. **Nenhum framework mede dependências técnicas de sequenciamento.** Este ranking diz o que é importante, não em que ordem construir. A sequência da seção 8 é uma sugestão baseada em dependências lógicas, mas deve ser validada com a arquitetura técnica. Exemplo: Negociação com estados depende de Criar oferta e Aceite direto estarem prontos.

2. **ICE penaliza sistematicamente itens de infraestrutura e governança.** Itens como Painel admin e Negociação com estados são custosos e não geram valor direto para o cliente, mas são incontornáveis. O ICE tende a empurrá-los para baixo — não confie apenas nele para itens operacionais.

3. **Weighted Scoring com pesos iguais é uma tautologia neutra.** Os pesos 20/20/20/20/20 não refletem nenhuma prioridade organizacional real. Se a equipe prioriza speed-to-market, o peso de Effort deve subir; se prioriza diferenciação, Strategic Fit deve pesar mais. Os scores atuais são ponto de partida, não decisão.

4. **Todos os scores são baseados em descrições, não em dados.** Não houve calibração com engenharia (Ease/Effort), negócio (Business Value), nem usuários (Customer Value). O ranking é direcional — trate-o como hipótese a ser validada, não como decisão final.

5. **Viés de supply-side vs. demand-side.** Esta análise prioriza funcionalidades do marketplace como plataforma, mas não avalia separadamente as necessidades de cada lado do mercado. Casas de câmbio (supply) e clientes (demand) podem ter prioridades divergentes que uma análise unificada mascara. Exemplo: Vitrine de taxas pode ser Won't para clientes e Must para casas.

6. **Kano e RICE estão ausentes.** A ausência de frameworks centrados em satisfação do cliente (Kano) e alcance quantitativo (RICE) significa que itens com alto valor percebido mas baixo volume, ou vice-versa, podem estar mal posicionados. Desbloquear esses frameworks é o investimento de pesquisa mais importante antes da próxima rodada de priorização.

---

## 10. Reavaliação Estratégica v1.5.1: Automação de Taxas e Landing Pages das Casas

Com base no novo contexto estratégico do fundador (casas buscando ativamente uma alternativa neutra ao Melhor Câmbio / Nomad) e na formulação das hipóteses estruturantes [H6](hypotheses.md#h6--hipótese-de-aquisição-de-demanda--gtm-clientes-chegam-por-seo-local-e-canais-das-casas) e [H7](hypotheses.md#h7--hipótese-de-automação-de-taxas-atualização-em-lote-é-requisito-eliminatório-para-migração), reavaliou-se formalmente o posicionamento de dois itens que originalmente estavam classificados como Won't / Post-MVP:

### 10.1 Reavaliação 1: Atualização Automática de Taxas de Balcão (CSV / Planilha / API)
- **Classificação Original:** Subsumida no Item #8 (*Vitrine de taxas*, MoSCoW: Could / ICE: 280) com cadastro estritamente manual via formulário web ([US-021](../03-product/user-stories.md#us-021-cadastro-de-taxas-de-balcão-na-vitrine)), e no Item #14 (*API pública*, MoSCoW: Won't / ICE: 80 / Fase 3).
- **Novo Fator Estratégico:** A hipótese H7 postula que redigitar taxas manualmente múltiplas vezes ao dia em mais um sistema gera abandono operacional imediato. Casas parceiras consolidadas já operam com planilhas de tesouraria; sem importação em lote, a vitrine fica defasada.
- **Grau de Incerteza e Risco:** **Alto.** Não há confirmação empírica se as casas piloto do Rio e São Paulo exigirão isso logo nas primeiras semanas de operação gratuita, ou se o upload manual de apenas 2 moedas principais (USD e EUR) seria tolerado. Além disso, o esforço de engenharia para suportar múltiplos layouts de arquivo consome capacidade crítica do MVP.
- **Decisão e Recomendação de Movimentação:**
  - **Importação Básica de Planilha (CSV Padronizado):** Movida de **Won't (Post-MVP)** para **Should Condicional (MVP+ / Fast-Follow da Fase 1)**. Condição de disparo: se ≥ 50% das casas na entrevista de validação ([Questão 4](interview-guide-casas.md)) apontarem a digitação manual como dealbreaker de permanência, o desenvolvimento de um endpoint de upload de CSV simples deve entrar imediatamente após a estabilização do core do leilão.
  - **API Pública / Webhooks:** Mantida estritamente na **Fase 2 / Fase 3**, pois a sobrecarga de homologação e suporte a sistemas legados heterogêneos de terceiros inviabilizaria os prazos do piloto.

### 10.2 Reavaliação 2: Landing Page / Widget da Casa (com "Modo Oferta Privada")
- **Classificação Original:** Item #15 (*Landing pages white-label*, MoSCoW: Won't / ICE: 64 / WS: 4.0 / Fase 3 no Roadmap).
- **Novo Fator Estratégico:** A hipótese H6 demonstra que a demanda de clientes não surge organicamente sem canais de distribuição bem definidos. Se as casas parceiras puderem divulgar um link próprio parametrizado ou widget em seus sites/WhatsApp, elas mesmas alimentam a liquidez do sistema com sua base existente. Abre-se também a possibilidade conceitual do **"Modo Oferta Privada"** (oferta enviada diretamente para a casa titular da página, sem concorrência aberta).
- **Grau de Incerteza e Risco:** **Muito Alto.** A construção de um ecossistema multi-tenant completo com subdomínios, personalização visual e gestão de DNS ([ADR-0011](../04-architecture/adr/adr-0011-landing-pages-multi-tenant.md)) é tecnicamente onerosa e desvia o time da validação da liquidez do pregão. Ademais, muitas casas pequenas têm presença digital rudimentar e tráfego próprio insignificante.
- **Decisão e Recomendação de Movimentação:**
  - **Landing Page White-Label Completa Multi-Tenant:** Mantida na **Fase 3** conforme planejamento original.
  - **Página Pública Básica da Casa com Link Parametrizado (Modo Privado Experimental):** Sobe de **Fase 3** para a **Fase 2 (Exploração Estratégica pós-MVP)**. No MVP da Fase 1, não haverá desenvolvimento de software para isso; se o [Roteiro de Entrevistas](interview-guide-casas.md) (Questão 7) comprovar forte tração e demanda das casas, um teste de conceito leve (landing estática manual) será prototipado antes do início formal da Fase 2.

---

## 11. Histórico de Revisão

| Versão | Data | Autor | Mudanças |
|--------|------|-------|----------|
| 1.0 | 2026-11-03 | Equipe de Produto | Priorização inicial multi-framework (ICE, MoSCoW e Weighted Scoring) para 16 funcionalidades candidatas. |
| 1.5.1 | 2026-11-03 | Equipe de Produto | Reavaliação estratégica (Seção 10) baseada nas hipóteses H6 e H7: elevação da importação de taxas por CSV para Should Condicional (MVP+ da Fase 1, condicionado a confirmação nas entrevistas de casas) e antecipação do teste conceitual de landing pages/modo oferta privada para a Fase 2, documentando justificativas e incertezas. |
