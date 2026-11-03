---
artifact: hypothesis
version: "1.5.1"
created: 2026-11-02
status: draft
---

<!-- Sete hipóteses estruturantes para a plataforma de comunicação e aproximação cambial.
     H1 = Desejabilidade · H2 = Viabilidade Operacional · H3 = Negócio / WTP
     H4 = Neutralidade e Migração · H5 = Multi-Homing e Liquidez · H6 = Canais GTM / SEO · H7 = Automação de Taxas -->

---

# H1 — Hipótese de Desejabilidade: Clientes preferem modelo de leilão de taxa

## Hypothesis Statement

**We believe that** oferecer ao cliente a possibilidade de publicar a taxa desejada e receber propostas de casas de câmbio (modelo de leilão reverso)

**for** clientes pessoa física e jurídica que precisam comprar ou vender moeda estrangeira em RJ e SP

**will** resultar em taxas melhores do que o balcão e maior satisfação com o processo de câmbio

**as measured by** percentual de clientes que obtêm taxa melhor que a média de balcão das casas na plataforma

## Background & Rationale

### Problem Context

O mercado de câmbio de varejo no Brasil é caracterizado por assimetria de informação: o cliente raramente sabe se a taxa que está recebendo é competitiva. Cada casa de câmbio pratica seu próprio spread sobre a cotação interbancária, e o cliente que quer comparar precisa ligar ou visitar múltiplos estabelecimentos manualmente. Isso gera fricção, perda de tempo e, frequentemente, aceitação de taxas desfavoráveis.

Um marketplace que inverta essa dinâmica — permitindo ao cliente declarar a taxa desejada e receber ofertas das casas — pode eliminar essa assimetria e criar pressão competitiva para baixo nos spreads.

### Supporting Evidence

- O modelo de leilão reverso (buyer-driven auction) é validado em outros mercados de serviços: seguros (ex: plataformas de cotação), fretes (ex: marketplaces de logística), e empréstimos (ex: plataformas P2P de crédito). A lógica central — compradores publicam demanda, fornecedores competem — demonstra redução de preço final para o comprador nesses setores.
- Pesquisas indicam que [HIPÓTESE – A VALIDAR] % dos clientes de câmbio consideram que não conseguem comparar preços de forma eficiente.
- O spread médio praticado por casas de câmbio em RJ/SP é de aproximadamente [HIPÓTESE – A VALIDAR] % sobre a taxa comercial, sugerindo espaço para compressão via concorrência direta.
- Plataformas de comparação de câmbio já existentes (ex: Melhor Câmbio original) demonstram demanda por transparência, mas operam como agregadores passivos, não como leilões.

### Alternative Hypotheses Considered

- **Modelo de comparação passiva (agregador de cotações):** O cliente veria taxas já publicadas pelas casas, sem negociação. Rejeitada como hipótese principal porque não cria incentivo para a casa baixar a taxa além do que já está exposta — apenas facilita a descoberta. Pode funcionar como funcionalidade complementar.
- **Modelo de negociação direta (chat):** O cliente entraria em contato direto com a casa via chat para negociar. Rejeitada porque escala mal e não elimina a assimetria de informação; o cliente não sabe o que as outras casas ofereceriam.
- **Modelo de cashback/rebate:** O cliente pagaria taxa normal e receberia parte do spread de volta. Rejeitada porque não reduz o spread real, apenas redistribui — menos valor percebido.

## Target User Segment

### Definition

- **Pessoa Física:** Indivíduos que precisam comprar ou vender moeda estrangeira para viagens, remessas ou investimentos, com operações a partir de [HIPÓTESE – A VALIDAR] USD equivalente.
- **Pessoa Jurídica (PMEs):** Empresas de pequeno e médio porte que realizam importação/exportação, pagam fornecedores internacionais ou recebem em moeda estrangeira, com operações a partir de [HIPÓTESE – A VALIDAR] USD equivalente.
- **Localização:** RJ e SP (praças com maior concentração de casas de câmbio autorizadas).

### Segment Size

- Número estimado de operações de câmbio manual (balcão) em RJ e SP por mês: [HIPÓTESE – A VALIDAR]
- Número estimado de casas de câmbio autorizadas em RJ e SP: [HIPÓTESE – A VALIDAR]
- Ticket médio estimado por operação: [HIPÓTESE – A VALIDAR] USD equivalente

### Current Behavior

- O cliente pesquisa taxas por telefone, WhatsApp ou visita presencial a 1-3 casas de câmbio antes de fechar.
- A decisão é tomada principalmente por taxa e conveniência (proximidade/indicação).
- Há pouca fidelização: [HIPÓTESE – A VALIDAR] % dos clientes trocam de casa de câmbio entre operações.
- O tempo médio gasto pelo cliente para pesquisar e fechar uma operação é de [HIPÓTESE – A VALIDAR] horas.

## Success Metrics

### Primary Metric

| Métrica | Baseline Atual | Meta | Efeito Mínimo Detectável |
|---------|---------------|------|--------------------------|
| % de clientes que obtêm taxa melhor que a média de balcão das casas na plataforma | 0% (plataforma não existe) | ≥ [HIPÓTESE – A VALIDAR] % dos clientes recebem ao menos 1 oferta melhor que a média de balcão | [HIPÓTESE – A VALIDAR] % |

### Secondary Metrics

| Métrica | Baseline Atual | Direção Esperada |
|---------|---------------|------------------|
| Economia média do cliente vs. taxa de balcão | 0 (sem plataforma) | Aumento — economia ≥ [HIPÓTESE – A VALIDAR] % do spread |
| NPS pós-operação | N/A | ≥ [HIPÓTESE – A VALIDAR] |
| Taxa de conversão (oferta publicada → operação fechada) | N/A | ≥ [HIPÓTESE – A VALIDAR] % |
| Nº médio de ofertas recebidas por publicação | N/A | ≥ [HIPÓTESE – A VALIDAR] ofertas |

### Guardrail Metrics

| Métrica | Valor Atual | Faixa Aceitável |
|---------|------------|-----------------|
| Taxa de conclusão da operação (sem desistência pós-match) | N/A | ≥ [HIPÓTESE – A VALIDAR] % |
| Satisfação das casas de câmbio (NPS ou CSAT) | N/A | ≥ [HIPÓTESE – A VALIDAR] |
| Compliance regulatório (operações dentro das normas do Bacen) | 100% | 100% — zero tolerância |

## Validation Approach

### Method

**Piloto controlado (MVP operacional):**

1. Recrutar [HIPÓTESE – A VALIDAR] casas de câmbio em RJ e SP (meta: 5-10 casas) dispostas a participar do piloto.
2. Recrutar [HIPÓTESE – A VALIDAR] clientes reais (meta: 50-100 clientes) via canais orgânicos e indicação.
3. Operar o fluxo de leilão reverso de forma completa: cliente publica oferta → casas respondem → cliente aceita a melhor proposta → operação é fechada na casa.
4. Coletar dados de taxa ofertada vs. taxa de balcão publicada, tempo de resposta, conversão e satisfação.

### Sample Size & Duration

- Amostra de casas: [HIPÓTESE – A VALIDAR] casas (meta: 5-10)
- Amostra de clientes: [HIPÓTESE – A VALIDAR] clientes (meta: 50-100)
- Nº mínimo de ofertas publicadas: [HIPÓTESE – A VALIDAR] (meta: 100-200 publicações)
- Duração: [HIPÓTESE – A VALIDAR] semanas (meta: 4-8 semanas)

### Pass/Fail Criteria

- **Validada se:** ≥ [HIPÓTESE – A VALIDAR] % dos clientes recebem ao menos 1 oferta melhor que a média de balcão E a taxa de conversão (oferta → operação fechada) é ≥ [HIPÓTESE – A VALIDAR] %
- **Invalidada se:** < [HIPÓTESE – A VALIDAR] % dos clientes recebem oferta melhor que balcão OU casas desistem do piloto por falta de viabilidade operacional
- **Inconclusiva se:** volume insuficiente de publicações para atingir significância — estender piloto ou ampliar recrutamento

## Risks & Assumptions

### Key Assumptions

- Casas de câmbio estão dispostas a competir abertamente por taxa quando veem a demanda do cliente.
- O cliente está disposto a esperar pelas ofertas (ao invés de ir direto a uma casa conhecida).
- O modelo de leilão reverso não cria um "race to the bottom" que torna a operação inviável para as casas.
- A regulação do Bacen permite a intermediação de cotações sem que a plataforma precise ser uma instituição financeira autorizada.

### Risks

- **Risco regulatório:** A plataforma pode ser interpretada como intermediadora de câmbio, o que exigiria autorização específica do Banco Central. Mitigação: parecer jurídico prévio; posicionar como marketplace de cotações, não como operador de câmbio.
- **Risco de baixa adesão de casas:** Casas podem não querer competir abertamente. Mitigação: oferecer período sem custo no piloto e demonstrar volume de demanda.
- **Risco de "falso leilão":** Se poucas casas participam, o cliente recebe poucas ofertas e a experiência não é melhor que ligar para 2-3 casas. Mitigação: garantir mínimo de 5 casas ativas por praça.
- **Risco de cherry-picking:** Casas podem responder apenas a operações de alto ticket, ignorando as pequenas. Mitigação: monitorar taxa de resposta por faixa de valor.

## Timeline

| Fase | Datas | Duração |
|------|-------|---------|
| Preparação (recrutamento de casas e clientes, setup técnico) | [HIPÓTESE – A VALIDAR] | 2-3 semanas |
| Piloto rodando | [HIPÓTESE – A VALIDAR] | 4-8 semanas |
| Coleta e análise de dados | [HIPÓTESE – A VALIDAR] | 1-2 semanas |
| Decisão go/no-go | [HIPÓTESE – A VALIDAR] | — |

---

# H2 — Hipótese de Viabilidade: Casas de câmbio respondem rápido o bastante

## Hypothesis Statement

**We believe that** casas de câmbio conseguem avaliar e responder a uma oferta de câmbio em tempo real (menos de 15 minutos)

**for** casas de câmbio autorizadas pelo Banco Central operando em RJ e SP

**will** resultar em uma experiência de negociação dinâmica e competitiva para o cliente

**as measured by** tempo médio de primeira resposta das casas às ofertas publicadas

## Background & Rationale

### Problem Context

A hipótese H1 depende de uma premissa fundamental: que as casas de câmbio conseguem avaliar e responder a uma oferta de cliente rapidamente o suficiente para que a experiência do cliente seja satisfatória. Se a resposta demorar horas, o modelo de leilão perde a vantagem competitiva sobre ligar diretamente para uma casa.

Operações de câmbio envolvem checagem manual de taxa interbancária, avaliação de estoque de moeda, verificação de spread mínimo aceitável e, em alguns casos, aprovação de compliance. A questão central é se esse processo pode ocorrer em menos de 15 minutos, tornando a experiência aceitável para o cliente.

### Supporting Evidence

- Em marketplaces de serviços financeiros (ex: cotação de seguros), respostas costumam ocorrer em minutos, não horas — mas esses mercados têm motores de precificação automatizados, o que não é necessariamente o caso em câmbio de balcão.
- Operadores de câmbio experientes afirmam que a avaliação de uma taxa para operação simples (compra de dólar turismo, por exemplo) leva [HIPÓTESE – A VALIDAR] minutos, pois envolve basicamente consultar a taxa comercial e aplicar o spread da casa.
- Operações mais complexas (câmbio comercial, valores altos, moedas exóticas) podem exigir aprovações adicionais, potencialmente aumentando o tempo de resposta.

### Alternative Hypotheses Considered

- **Respostas assíncronas (até 1 hora):** Considerou-se que o SLA de resposta pudesse ser mais flexível (1 hora). Descartada porque pesquisas de UX em marketplaces indicam que tempos de espera longos reduzem drasticamente a conversão.
- **Automação da resposta via API:** Casas poderiam integrar seus sistemas e responder automaticamente. Descartada como premissa inicial porque a maioria das casas de pequeno/médio porte não tem sistemas com API; pode ser roadmap futuro.
- **Modelo de "taxa fixa publicada" (sem leilão):** Casas publicariam suas taxas em tempo real, sem responder a cada oferta. Considerada como alternativa viável caso H2 falhe; porém perde a dinâmica de negociação.

## Target User Segment

### Definition

- **Casas de câmbio autorizadas pelo Banco Central** (tipo: corretora de câmbio ou banco autorizado a operar câmbio).
- **Localização:** RJ e SP.
- **Porte:** Foco em casas de pequeno e médio porte (faturamento anual de [HIPÓTESE – A VALIDAR] em operações de câmbio), que provavelmente têm mais a ganhar com acesso a demanda qualificada.
- **Operação:** Possuem ao menos 1 operador dedicado a câmbio durante horário comercial.

### Segment Size

- Número estimado de casas de câmbio autorizadas em RJ: [HIPÓTESE – A VALIDAR]
- Número estimado de casas de câmbio autorizadas em SP: [HIPÓTESE – A VALIDAR]
- Percentual dessas que são de pequeno/médio porte: [HIPÓTESE – A VALIDAR] %

### Current Behavior

- Casas recebem demanda via telefone, WhatsApp, walk-in e indicação.
- O processo de cotação para um cliente novo leva [HIPÓTESE – A VALIDAR] minutos (inclui verificar taxa, calcular spread, informar cliente).
- A maioria das casas opera com [HIPÓTESE – A VALIDAR] operadores de câmbio em horário comercial.
- Taxas são atualizadas manualmente [HIPÓTESE – A VALIDAR] vezes ao dia.

## Success Metrics

### Primary Metric

| Métrica | Baseline Atual | Meta | Efeito Mínimo Detectável |
|---------|---------------|------|--------------------------|
| Tempo médio de primeira resposta das casas às ofertas | N/A (plataforma não existe) | ≤ 15 minutos | [HIPÓTESE – A VALIDAR] minutos |

### Secondary Metrics

| Métrica | Baseline Atual | Direção Esperada |
|---------|---------------|------------------|
| % de ofertas que recebem ao menos 1 resposta em ≤ 15 min | N/A | ≥ [HIPÓTESE – A VALIDAR] % |
| Nº médio de casas que respondem por oferta | N/A | ≥ [HIPÓTESE – A VALIDAR] casas |
| % de ofertas sem nenhuma resposta (zero bids) | N/A | ≤ [HIPÓTESE – A VALIDAR] % |
| Tempo médio para resposta da 2ª e 3ª casa | N/A | ≤ [HIPÓTESE – A VALIDAR] minutos |

### Guardrail Metrics

| Métrica | Valor Atual | Faixa Aceitável |
|---------|------------|-----------------|
| Qualidade das respostas (% de respostas com taxa real executável, não apenas indicativa) | N/A | ≥ [HIPÓTESE – A VALIDAR] % |
| Taxa de abandono de casas durante o piloto | N/A | ≤ [HIPÓTESE – A VALIDAR] % |
| Erros de precificação (casa informa taxa e depois retifica) | N/A | ≤ [HIPÓTESE – A VALIDAR] % |

## Validation Approach

### Method

**Abordagem em duas fases:**

**Fase 1 — Entrevistas qualitativas (pré-piloto):**
- Entrevistar [HIPÓTESE – A VALIDAR] casas de câmbio (meta: 5-10) em RJ e SP.
- Mapear o fluxo operacional de cotação: quem avalia, que sistemas usa, quanto tempo leva, quais as etapas internas.
- Apresentar o conceito do marketplace e perguntar sobre disposição e capacidade de responder em ≤ 15 min.
- Identificar gargalos operacionais (ex: necessidade de aprovação de gerente, consulta de estoque).

**Fase 2 — Observação durante piloto (simultânea a H1):**
- Durante o piloto de H1, medir tempo real de resposta das casas.
- Registrar todas as interações: timestamp de publicação da oferta, timestamp de cada resposta, taxa ofertada, eventual retificação.

### Sample Size & Duration

- Fase 1 (entrevistas): [HIPÓTESE – A VALIDAR] casas (meta: 5-10), duração: 1-2 semanas
- Fase 2 (observação): mesma amostra e duração do piloto de H1 (4-8 semanas)
- Nº mínimo de interações casa→oferta para análise: [HIPÓTESE – A VALIDAR] (meta: 200-500 respostas)

### Pass/Fail Criteria

- **Validada se:** tempo médio de primeira resposta ≤ 15 minutos E ≥ [HIPÓTESE – A VALIDAR] % das ofertas recebem ao menos 1 resposta nesse prazo
- **Invalidada se:** tempo médio de primeira resposta > 30 minutos OU > [HIPÓTESE – A VALIDAR] % das ofertas ficam sem resposta
- **Inconclusiva se:** resultados mistos (ex: casas de SP respondem rápido, casas de RJ não) — segmentar análise por praça e perfil de casa

## Risks & Assumptions

### Key Assumptions

- Casas de câmbio terão ao menos 1 operador monitorando a plataforma durante horário comercial.
- O custo de oportunidade de responder a uma oferta na plataforma é baixo o suficiente para não prejudicar o atendimento presencial/telefônico existente.
- A avaliação de uma oferta de câmbio simples (dólar turismo, euro) não exige múltiplas aprovações internas.
- Notificações da plataforma (push, SMS, e-mail) serão suficientes para alertar o operador sobre novas ofertas.

### Risks

- **Risco operacional:** Casas podem não ter recursos humanos dedicados para monitorar a plataforma continuamente. Mitigação: avaliar via entrevistas antes do piloto; considerar sistema de notificação multicanal.
- **Risco de "resposta fantasma":** Casas podem responder rapidamente com taxa indicativa e depois alterar na hora de fechar. Mitigação: medir taxa de retificação e criar métrica de qualidade da resposta.
- **Risco de horário:** Taxas de câmbio flutuam durante o dia; casas podem resistir a "travar" uma taxa por 15 min enquanto o cliente decide. Mitigação: definir validade da oferta (ex: 30 min) no desenho do produto.
- **Risco de seleção adversa no piloto:** Casas mais modernas e ágeis aderem ao piloto, criando viés positivo no tempo de resposta. Mitigação: recrutar casas com perfis variados (porte, nível de digitalização).

## Timeline

| Fase | Datas | Duração |
|------|-------|---------|
| Recrutamento de casas para entrevistas | [HIPÓTESE – A VALIDAR] | 1 semana |
| Entrevistas qualitativas (Fase 1) | [HIPÓTESE – A VALIDAR] | 1-2 semanas |
| Análise das entrevistas e ajuste do piloto | [HIPÓTESE – A VALIDAR] | 1 semana |
| Observação durante piloto (Fase 2 — simultânea ao piloto de H1) | [HIPÓTESE – A VALIDAR] | 4-8 semanas |
| Análise de dados de tempo de resposta | [HIPÓTESE – A VALIDAR] | 1 semana |
| Decisão go/no-go | [HIPÓTESE – A VALIDAR] | — |

---

# H3 — Hipótese de Negócio: Casas pagariam pelo acesso ao marketplace

## Hypothesis Statement

**We believe that** casas de câmbio pagariam uma mensalidade e/ou taxa por negócio fechado para ter acesso a demanda qualificada

**for** casas de câmbio de pequeno e médio porte em RJ e SP

**will** gerar receita recorrente suficiente para sustentar a operação da plataforma

**as measured by** disposição a pagar (WTP) declarada e conversão em assinaturas durante o piloto

## Background & Rationale

### Problem Context

A sustentabilidade financeira do marketplace depende de encontrar um modelo de monetização que seja aceitável para as casas de câmbio (supply side) sem criar barreiras que reduzam a participação e, consequentemente, a qualidade da experiência para o cliente (demand side).

Casas de câmbio de pequeno e médio porte enfrentam alto custo de aquisição de clientes: dependem de localização física, indicação e marketing local. Um marketplace que traga demanda qualificada — clientes prontos para operar — representaria um canal de aquisição potencialmente mais eficiente que os atuais.

### Supporting Evidence

- Em marketplaces B2B2C (ex: iFood, GetNinjas, Loft), o modelo de monetização via lado da oferta (taxa por lead ou por transação + mensalidade) é o padrão consolidado.
- Casas de câmbio de pequeno porte investem estimadamente [HIPÓTESE – A VALIDAR] por mês em marketing e aquisição de clientes (Google Ads, panfletagem, indicação paga).
- Se o marketplace gerar leads com custo inferior ao CAC atual da casa, a proposta de valor é clara.
- Dados de mercados análogos sugerem que a WTP de fornecedores em marketplaces de serviços financeiros é de [HIPÓTESE – A VALIDAR] % da transação ou [HIPÓTESE – A VALIDAR] por lead qualificado.

### Alternative Hypotheses Considered

- **Monetização pelo lado da demanda (cliente paga):** O cliente pagaria uma taxa pelo acesso a cotações melhores. Rejeitada porque cria barreira de entrada para o lado da demanda, que é o mais difícil de atrair em marketplaces dois-lados — o marketplace precisa de liquidez de clientes para ser atrativo para casas.
- **Modelo de afiliado (comissão sobre spread):** A plataforma reteria parte do spread da transação. Rejeitada como modelo inicial porque exigiria participação ativa na operação financeira (risco regulatório) e é difícil de implementar sem integração profunda com os sistemas das casas.
- **Modelo freemium com upsell de dados:** Casas teriam acesso gratuito básico e pagariam por insights de mercado (volume de demanda por moeda, horários de pico, etc.). Considerada como complementar, não como modelo principal — receita de dados sozinha é insuficiente em estágio inicial.

## Target User Segment

### Definition

- **Casas de câmbio de pequeno e médio porte** autorizadas pelo Banco Central, operando em RJ e SP.
- **Faturamento anual em câmbio:** [HIPÓTESE – A VALIDAR] (faixa típica de PME no setor).
- **Nº de operadores de câmbio:** 1-5 funcionários dedicados.
- **Nível de digitalização:** Variável — desde casas que operam primariamente por telefone/WhatsApp até casas com sistema próprio de gestão de câmbio.
- **Dor principal:** Dificuldade de atrair clientes novos fora da base existente; dependência de localização física e indicação.

### Segment Size

- Casas de câmbio autorizadas em RJ: [HIPÓTESE – A VALIDAR]
- Casas de câmbio autorizadas em SP: [HIPÓTESE – A VALIDAR]
- % que são de pequeno/médio porte (alvo): [HIPÓTESE – A VALIDAR] %
- TAM (total de casas-alvo em RJ+SP): [HIPÓTESE – A VALIDAR]

### Current Behavior

- Investimento mensal estimado em marketing/aquisição de clientes: [HIPÓTESE – A VALIDAR] por casa.
- CAC estimado: [HIPÓTESE – A VALIDAR] por cliente novo.
- Principal canal de aquisição: indicação boca-a-boca ([HIPÓTESE – A VALIDAR] %), Google ([HIPÓTESE – A VALIDAR] %), walk-in ([HIPÓTESE – A VALIDAR] %).
- Margem líquida média por operação de câmbio: [HIPÓTESE – A VALIDAR] % sobre o spread.

## Success Metrics

### Primary Metric

| Métrica | Baseline Atual | Meta | Efeito Mínimo Detectável |
|---------|---------------|------|--------------------------|
| WTP declarada (% de casas que declaram disposição a pagar pela plataforma) | N/A | ≥ [HIPÓTESE – A VALIDAR] % das casas entrevistadas | [HIPÓTESE – A VALIDAR] % |
| Conversão em assinaturas pagas (pós-piloto gratuito) | N/A | ≥ [HIPÓTESE – A VALIDAR] % das casas do piloto convertem para plano pago | [HIPÓTESE – A VALIDAR] % |

### Secondary Metrics

| Métrica | Baseline Atual | Direção Esperada |
|---------|---------------|------------------|
| Ticket médio mensal por casa (mensalidade + taxas de transação) | N/A | ≥ [HIPÓTESE – A VALIDAR] /mês |
| Receita total mensal projetada (casas × ticket médio) | N/A | ≥ [HIPÓTESE – A VALIDAR] /mês |
| LTV estimado por casa (permanência × ticket) | N/A | ≥ [HIPÓTESE – A VALIDAR] |
| CAC para adquirir uma casa no marketplace | N/A | ≤ [HIPÓTESE – A VALIDAR] |
| Churn mensal de casas | N/A | ≤ [HIPÓTESE – A VALIDAR] % |

### Guardrail Metrics

| Métrica | Valor Atual | Faixa Aceitável |
|---------|------------|-----------------|
| % de casas que abandonam a plataforma citando custo como motivo | N/A | ≤ [HIPÓTESE – A VALIDAR] % |
| Qualidade das ofertas (casas não degradam ofertas para compensar custo da plataforma) | N/A | Spread médio das respostas não aumenta vs. período gratuito do piloto |
| Satisfação das casas com ROI da plataforma | N/A | ≥ [HIPÓTESE – A VALIDAR] (NPS ou CSAT) |

## Validation Approach

### Method

**Abordagem em três fases:**

**Fase 1 — Pesquisa de WTP (pré-piloto):**
- Durante as entrevistas de H2 (Fase 1), incluir módulo de pesquisa de disposição a pagar.
- Técnica: Van Westendorp Price Sensitivity Meter ou Gabor-Granger simplificado.
- Apresentar faixas de preço para dois modelos: (a) mensalidade fixa, (b) taxa por negócio fechado, (c) modelo híbrido.
- Coletar WTP declarada e identificar faixa de preço ótima.

**Fase 2 — Piloto gratuito (simultâneo a H1 e H2):**
- Durante o piloto, casas participam gratuitamente.
- Ao final do piloto, apresentar proposta comercial com preço baseado na WTP apurada na Fase 1.

**Fase 3 — Conversão para modelo pago:**
- Oferecer às casas do piloto a opção de continuar com plano pago.
- Medir taxa de conversão e razões de recusa.

### Sample Size & Duration

- Fase 1 (WTP): mesma amostra de H2 — [HIPÓTESE – A VALIDAR] casas (meta: 5-10)
- Fase 2 (piloto gratuito): 4-8 semanas (simultâneo ao piloto de H1)
- Fase 3 (conversão): [HIPÓTESE – A VALIDAR] semanas após fim do piloto (meta: 2-4 semanas)

### Pass/Fail Criteria

- **Validada se:** ≥ [HIPÓTESE – A VALIDAR] % das casas do piloto convertem para plano pago E o ticket médio mensal é ≥ [HIPÓTESE – A VALIDAR], gerando receita unitária positiva (receita por casa > custo de servir por casa)
- **Invalidada se:** < [HIPÓTESE – A VALIDAR] % das casas convertem OU o preço que estão dispostas a pagar é inferior ao custo de servir por casa
- **Inconclusiva se:** casas demonstram interesse mas pedem condições muito customizadas que impedem padronização de modelo — iterar no pricing

## Risks & Assumptions

### Key Assumptions

- Casas de câmbio veem valor em um canal de aquisição digital e estão dispostas a pagar por ele.
- O volume de negócios gerado pelo marketplace justifica o custo da assinatura/taxa para a casa.
- A WTP declarada em pesquisa se reflete em comportamento real de pagamento (viés de pesquisa é o principal risco aqui).
- O modelo de precificação (mensalidade, taxa por transação ou híbrido) pode ser padronizado entre casas de diferentes portes.

### Risks

- **Risco de vazamento (leakage):** Após o cliente e a casa se conhecerem na plataforma, podem fechar operações futuras diretamente (por fora), eliminando a receita recorrente do marketplace. Mitigação: criar valor contínuo (novas ofertas, gestão, compliance); monitorar taxa de recompra na plataforma.
- **Risco jurídico no modelo de % da transação:** Cobrar percentual sobre operação de câmbio pode exigir enquadramento regulatório específico. Mitigação: validar com assessoria jurídica antes de implementar; ter modelo de mensalidade fixa como alternativa.
- **Risco de "corrida para o fundo" (race to the bottom):** Se o marketplace comprimir spreads demais, as casas não conseguem absorver o custo da plataforma e saem. Mitigação: monitorar spread médio e margem líquida das casas; ajustar pricing se necessário.
- **Risco de efeito de rede negativo:** Se poucas casas pagam → menos ofertas para o cliente → menos clientes → menos valor para as casas → mais churn. Mitigação: garantir massa crítica de casas (mínimo [HIPÓTESE – A VALIDAR] por praça) antes de cobrar.
- **Risco de concentração:** Se as casas maiores dominam o marketplace, PMEs podem sentir que não conseguem competir e abandonam. Mitigação: considerar regras de distribuição de ofertas para equalizar oportunidades.

## Timeline

| Fase | Datas | Duração |
|------|-------|---------|
| Pesquisa de WTP nas entrevistas (Fase 1 — simultânea a H2 Fase 1) | [HIPÓTESE – A VALIDAR] | 1-2 semanas |
| Piloto gratuito (Fase 2 — simultâneo a H1 e H2) | [HIPÓTESE – A VALIDAR] | 4-8 semanas |
| Proposta comercial e conversão (Fase 3) | [HIPÓTESE – A VALIDAR] | 2-4 semanas |
| Análise de conversão e unit economics | [HIPÓTESE – A VALIDAR] | 1 semana |
| Decisão go/no-go modelo de monetização | [HIPÓTESE – A VALIDAR] | — |

---

# H4 — Hipótese de Neutralidade e Migração: Casas buscam alternativa independente ao incumbente

## Hypothesis Statement

**We believe that** posicionar a plataforma como uma alternativa estritamente neutra e independente (sem produto cambial próprio nem conta global concorrente)

**for** casas de câmbio autorizadas pelo Banco Central parceiras históricas do ecossistema do Melhor Câmbio (adquirido pela Nomad) em RJ e SP

**will** motivar a adesão ao piloto e a assinatura de termos de intenção de migração ou diversificação de canal para mitigar riscos de conflito de interesses

**as measured by** percentual de casas de câmbio qualificadas entrevistadas que assinam Carta de Intenção (LOI) ou termo de pré-adesão ao piloto citando a neutralidade como motivador primário

## Background & Rationale

### Problem Context

O incumbente histórico (Melhor Câmbio) foi adquirido pela fintech Nomad. A Nomad opera diretamente produtos de conta internacional, cartão de débito global e remessas de câmbio comercial/turismo. Essa verticalização cria um potencial conflito de interesses estrutural: o canal de agregação de leads pertence a um player que compete diretamente pelos mesmos clientes que as casas de câmbio independentes tentam atender.

Relatos de mercado e do fundador indicam que, embora o produto do incumbente operasse com poucas reclamações de usabilidade, diversas mesas de câmbio sentem desconforto com a governança da plataforma sob controle de um concorrente direto e procuram ativamente um canal tecnológico neutro para diversificar sua captação.

### Supporting Evidence

- Aquisições de agregadores de mercado por participantes verticais em outros setores (ex.: aquisição de comparadores de seguros por seguradoras ou portais imobiliários por grandes incorporadoras) historicamente aceleram a busca de fornecedores independentes por plataformas alternativas que assegurem tratamento isonômico de leads.
- O fundador relata que casas de câmbio já manifestaram informalmente o interesse em uma alternativa neutra de software, desde que mantenha a facilidade operacional do formato consagrado.
- A neutralidade só constitui proposta de valor válida se for **rigorosamente verdadeira** (a nova plataforma não comercializa produtos cambiais próprios) e respaldada juridicamente [VALIDAR COM ADVOGADO].

### Alternative Hypotheses Considered

- **Concorrência baseada em menores taxas de comissão:** As casas migrariam puramente por preço de software mais baixo. Rejeitada como tese única porque, no câmbio de varejo, a preservação do canal de distribuição e a confiabilidade dos dados superam pequenas variações no custo de software.
- **Indiferença das casas quanto ao proprietário do canal:** As casas continuariam no incumbente independentemente do controle societário, desde que o volume de leads continue existindo. Essa hipótese nula será expressamente testada na entrevista de validação.

## Target User Segment

### Definition

- **Proprietários (Owners), Diretores Comerciais e Gerentes de Mesa** de casas de câmbio autorizadas pelo Banco Central que utilizam ou já utilizaram o Melhor Câmbio.
- **Localização:** Praças piloto de São Paulo e Rio de Janeiro.
- **Perfil de Risco:** Casas independentes sem vínculo societário com grandes bancos ou corretoras multinacionais.

### Segment Size

- Universo estimado de casas parceiras ativas do incumbente em SP e RJ: [HIPÓTESE – A VALIDAR: 40 a 60 instituições autorizadas].
- Amostra-alvo para validação de H4: 10 a 15 casas entrevistadas no screening inicial.

### Current Behavior

- As casas mantêm seus perfis ativos no Melhor Câmbio para capturar leads passivos, mas monitoram com apreensão o direcionamento de tráfego para a conta Nomad.
- Não dispõem atualmente de outra plataforma relevante de cotação com a mesma mecânica de pregão de ofertas.

## Success Metrics

### Primary Metric

| Métrica | Baseline Atual | Meta | Efeito Mínimo Detectável |
|---------|---------------|------|--------------------------|
| % de casas entrevistadas que assinam Carta de Intenção (LOI) para o piloto neutro | 0% | ≥ 60% das casas abordadas no screening [HIPÓTESE – A VALIDAR] | 20% |

### Secondary Metrics

| Métrica | Baseline Atual | Direção Esperada |
|---------|---------------|------------------|
| % de casas que citam espontaneamente "independência / conflito Nomad" na entrevista | N/A | ≥ 50% das casas [HIPÓTESE – A VALIDAR] |
| Disposição para alocar ao menos 1 operador dedicado no piloto | 0% | ≥ 70% das casas aderentes [HIPÓTESE – A VALIDAR] |

### Guardrail Metrics

| Métrica | Valor Atual | Faixa Aceitável |
|---------|------------|-----------------|
| Risco de litígio ou quebra de confidencialidade com o incumbente | Zero | Zero tolerância — sem uso de cadastros proprietários de terceiros [VALIDAR COM ADVOGADO] |
| Veracidade jurídica da alegação de neutralidade | N/A | 100% comprovada no contrato social e modelo de negócios |

## Validation Approach

### Method

**Entrevistas estruturadas de descoberta com roteiro padronizado:**
- Conduzir entrevistas em profundidade (30 a 45 min) com base no [Roteiro de Validação com Casas](interview-guide-casas.md).
- Apresentar a tese de neutralidade e avaliar a reação espontânea e assistida do proprietário/gerente da mesa.
- Ofertar assinatura de Carta de Intenção (LOI) não vinculante de participação no piloto gratuito da Fase 1.

### Sample Size & Duration

- Amostra: 10 a 15 casas de câmbio em SP e RJ.
- Duração: 2 semanas de entrevistas de campo.

### Pass/Fail Criteria

- **Validada se:** ≥ 60% das casas entrevistadas assinarem LOI e declararem que a neutralidade é um fator determinante ou muito importante para adesão.
- **Invalidada se:** < 30% demonstrarem preocupação com o controle societário do incumbente, preferindo permanecer exclusivamente onde já operam.
- **Inconclusiva se:** As casas manifestarem interesse verbal genérico, mas recusarem formalizar a carta de intenção sem dados comprovados de audiência prévia.

## Risks & Assumptions

### Key Assumptions

- A aquisição pela Nomad realmente incomoda os operadores e proprietários das casas independentes.
- A postura de neutralidade é sustentável a longo prazo pelos fundadores (sem planos secretos de abrir corretora própria).
- As casas têm autonomia para adotar novos softwares sem barreiras corporativas intransponíveis.

### Risks

- **Risco de "falso desconforto":** As casas podem reclamar retoricamente da Nomad, mas não terem incentivo econômico real para dedicar tempo de operador a uma nova plataforma. Mitigação: exigir compromisso formal via LOI.
- **Risco de retaliação comercial:** Casas temem ser descredenciadas pelo incumbente caso descubram sua adesão a outra plataforma. Mitigação: sigilo total e onboarding sob estrita confidencialidade durante o piloto [VALIDAR COM ADVOGADO].

## Timeline

| Fase | Datas | Duração |
|------|-------|---------|
| Agendamento de entrevistas via sócio comercial | [HIPÓTESE – A VALIDAR] | 1 semana |
| Condução das 10-15 entrevistas estruturadas | [HIPÓTESE – A VALIDAR] | 2 semanas |
| Tabulação de LOIs e análise de discurso | [HIPÓTESE – A VALIDAR] | 3 dias |
| Decisão go/no-go do posicionamento de neutralidade | [HIPÓTESE – A VALIDAR] | — |

---

# H5 — Hipótese de Multi-Homing e Priorização por Densidade de Ofertas

## Hypothesis Statement

**We believe that** casas de câmbio operam simultaneamente em múltiplas plataformas de cotação e canais de atendimento (regime de multi-homing com o incumbente e balcão próprio)

**for** operadores de mesa de câmbio em RJ e SP

**will** priorizar ativamente o tempo de tela e a velocidade de resposta (abaixo de 15 minutos) na plataforma que entregar maior densidade semanal de ofertas qualificadas

**as measured by** correlação direta entre o volume semanal de ofertas recebidas por casa e a taxa de ofertas respondidas tempestivamente durante o piloto

## Background & Rationale

### Problem Context

Casas de câmbio não trocam de software de forma exclusiva no "dia 1". Elas adicionam a nova ferramenta como mais uma aba no navegador ao lado do Melhor Câmbio, do WhatsApp Business e do sistema legado de caixa. 

Se a nova plataforma gerar poucas ofertas (gargalo de demanda), o operador naturalmente deixará a aba em segundo plano ou a esquecerá, criando um círculo vicioso de abandono por falta de liquidez. Para vencer o multi-homing, o produto precisa atingir uma densidade mínima de ofertas por semana que mantenha o operador alerta.

### Supporting Evidence

- Teoria econômica de plataformas de dois lados (Evans & Schmalensee; Rochet & Tirole): em mercados com multi-homing no lado do fornecedor, o engajamento migra assintoticamente para o lado com maior liquidez e conversão de demanda.
- Entrevistas com operadores de mesa indicam que notificações com som alto e alertas multicanal ajudam no curto prazo, mas apenas a perspectiva concreta de fechar negócios sustenta a prontidão operacional ao longo das semanas.

### Alternative Hypotheses Considered

- **Exclusividade exigida pela plataforma:** Forçar as casas a assinarem exclusividade com a nossa plataforma. Descartada categoricamente: criaria fricção inaceitável de adoção para uma plataforma nova sem volume comprovado.
- **Engajamento puramente por gamificação/reputação:** Operadores responderiam por badges ou ranking. Descartada: operadores de mesa são remunerados por volume transacionado e comissão; apenas dinheiro e liquidez geram comportamento sustentado.

## Target User Segment

### Definition

- **Operadores de Mesa e Atendentes de Câmbio** das casas participantes do piloto em SP e RJ.
- Profissionais que operam diretamente na ponta de negociação respondendo a ligações, mensagens e ferramentas web.

### Segment Size

- Cerca de 15 a 30 operadores nas 10 casas piloto.

### Current Behavior

- Mantêm abertas as telas do Melhor Câmbio, WhatsApp Web, terminal Bloomberg/Broadcast de taxas e ERP interno.
- Dão prioridade ao canal que apita com cliente quente com ticket fechável.

## Success Metrics

### Primary Metric

| Métrica | Baseline Atual | Meta | Efeito Mínimo Detectável |
|---------|---------------|------|--------------------------|
| Média semanal de ofertas recebidas por casa ativa para manter taxa de resposta > 70% | 0 | ≥ 3 a 5 ofertas por casa por semana [HIPÓTESE – A VALIDAR] | 1 oferta/semana |

### Secondary Metrics

| Métrica | Baseline Atual | Direção Esperada |
|---------|---------------|------------------|
| Tempo mediano de resposta em semanas com ≥ 5 ofertas vs. semanas com < 2 ofertas | N/A | Redução de ≥ 50% no tempo de resposta em semanas de alto volume |
| Taxa de operadores que realizam login diário espontâneo às 10h | 0% | ≥ 75% dos operadores cadastrados [HIPÓTESE – A VALIDAR] |

### Guardrail Metrics

| Métrica | Valor Atual | Faixa Aceitável |
|---------|------------|-----------------|
| Fadiga de alertas (taxa de desativação de som/notificação pelo operador) | 0% | ≤ 10% [HIPÓTESE – A VALIDAR] |
| Erros de precificação em decorrência de pressa do operador | 0% | ≤ 1% das propostas [HIPÓTESE – A VALIDAR] |

## Validation Approach

### Method

**Acompanhamento quantitativo e testes de sensibilidade de demanda no piloto:**
- Monitorar a taxa de resposta e tempo mediano segregados por faixas semanais de volume de ofertas injetadas por cidade.
- Aplicar testes de sensibilidade: injetar lotes controlados de ofertas reais e verificar se a prontidão do operador aumenta nos dias subsequentes.
- Entrevistar os operadores semanalmente para mapear se estão priorizando a aba da plataforma em relação aos concorrentes.

### Sample Size & Duration

- 10 casas piloto com 20 a 30 operadores ativos.
- Duração: 4 a 6 semanas de piloto transacional.

### Pass/Fail Criteria

- **Validada se:** Casas que recebem ≥ 3 a 5 ofertas semanais mantêm taxa de resposta superior a 70% em menos de 15 minutos, enquanto casas com < 2 ofertas semanais degradam o tempo de resposta em mais de 100%.
- **Invalidada se:** Mesmo com injeção de 5+ ofertas semanais, as casas mantiverem tempo de resposta > 30 minutos ou priorizarem outros canais.
- **Inconclusiva se:** O volume total de ofertas no piloto for insuficiente para criar semanas comparativas de alta e baixa densidade.

## Risks & Assumptions

### Key Assumptions

- Operadores têm tempo ocioso suficiente na mesa para atender uma ferramenta adicional.
- A notificação sonora e o digest multicanal conseguem recapturar a atenção do operador que está atendendo no balcão físico.

### Risks

- **Risco de abandono silencioso:** A casa se cadastra com entusiasmo, mas nas primeiras 48h sem ofertas, o operador fecha a aba e nunca mais faz login. Mitigação: alinhamento de GTM prévio para concentrar demanda nas praças do piloto.

## Timeline

| Fase | Datas | Duração |
|------|-------|---------|
| Instrumentação de telemetria de operador e ofertas | [HIPÓTESE – A VALIDAR] | 1 semana |
| Medição contínua durante o piloto | [HIPÓTESE – A VALIDAR] | 4 semanas |
| Análise de cohort e elasticidade de resposta | [HIPÓTESE – A VALIDAR] | 1 semana |

---

# H6 — Hipótese de Aquisição de Demanda / GTM: Clientes chegam por SEO local e canais das casas

## Hypothesis Statement

**We believe that** clientes pessoa física que pretendem comprar ou vender moeda turismo entram na plataforma estritamente através de buscas locais com intenção imediata ("câmbio turismo sp", "dólar rj") e por links disponibilizados pelas próprias casas parceiras (base própria e landing pages locais)

**for** viajantes e clientes de câmbio de varejo em São Paulo e Rio de Janeiro

**will** gerar mais de 80% do volume inicial de intenções de oferta no piloto sem depender de campanhas pagas de branding nacional ou de apelo por funcionalidades avançadas de software

**as measured by** proporção de ofertas publicadas originadas de tráfego orgânico de SEO geolocalizado e canais de parceiros vs. tráfego direto descontextualizado

## Background & Rationale

### Problem Context

O marketplace não dispõe do orçamento de marketing da Nomad nem da presença de marca de 10 anos do Melhor Câmbio. Uma suposição ingênua de que "clientes virão sozinhos porque o software é moderno" destruiria o piloto.

A demanda de câmbio turismo é caracterizada por intenção hiperlocal e utilitária: o cliente não procura "uma plataforma moderna com WebSocket"; ele digita no Google *"onde comprar dólar em são paulo"* ou *"melhor cotação euro barra da tijuca"*, ou clica em uma cotação recomendada por um correspondente ou agência. O GTM deve apoiar-se nesse comportamento real.

### Supporting Evidence

- Análise de dados de busca (Google Search Trends): mais de 85% das pesquisas com intenção de câmbio físico no Brasil possuem modificadores geográficos de cidade ou bairro.
- O sucesso histórico do Melhor Câmbio foi construído primordialmente em cima de páginas de SEO municipal ("melhorcambio.com/dolar-hoje/sao-paulo"), e não de downloads de aplicativos em app stores.

### Alternative Hypotheses Considered

- **Crescimento via campanhas pagas de performance (Google Ads / Meta Ads):** Investir verba paga para capturar o cliente. Descartada como estratégia principal do piloto gratuito: o CAC de palavras-chave como "comprar dólar" é proibitivo para uma plataforma que ainda não monetiza na Fase 1.
- **Aquisição via parcerias com influenciadores de viagem:** Estratégia válida para a Fase 2/3, mas lenta e descalibrada para a densidade hiperlocal exigida nas primeiras 4 semanas de SP e RJ.

## Target User Segment

### Definition

- **Consumidores Finais (Pessoas Físicas):** Viajantes a lazer ou negócios, estudantes de intercâmbio e familiares enviando recursos, com necessidade de retirada ou delivery nas capitais de SP e RJ.

### Segment Size

- Volume estimado de buscas mensais com termos transacionais de câmbio em SP e RJ: [HIPÓTESE – A VALIDAR: > 200.000 buscas/mês].

### Current Behavior

- Utilizam o Google Search como ponto de partida; comparam as primeiras 2 a 3 páginas que exibem taxas locais claras e clicam nas opções que transmitem confiabilidade e proximidade.

## Success Metrics

### Primary Metric

| Métrica | Baseline Atual | Meta | Efeito Mínimo Detectável |
|---------|---------------|------|--------------------------|
| % de ofertas publicadas originadas de SEO local e canais de referência das casas parceiras | 0% | ≥ 80% das ofertas válidas no piloto [HIPÓTESE – A VALIDAR] | 15% |

### Secondary Metrics

| Métrica | Baseline Atual | Direção Esperada |
|---------|---------------|------------------|
| Custo de Aquisição de Oferta Ativa (CAC por oferta) | N/A | R$ 0,00 de mídia paga no piloto (100% orgânico e co-distribuído) |
| Taxa de conversão de visitante da landing local em oferta publicada | N/A | ≥ 8% [HIPÓTESE – A VALIDAR] |

### Guardrail Metrics

| Métrica | Valor Atual | Faixa Aceitável |
|---------|------------|-----------------|
| Qualidade da oferta (taxa de ofertas com intenção real vs spam/testes de curiosos) | N/A | ≥ 85% de ofertas legítimas [HIPÓTESE – A VALIDAR] |

## Validation Approach

### Method

**Implementação e teste de páginas piloto de SEO local e landing pages para casas parceiras:**
- Criar páginas focadas em SEO local para SP (Capital, Jardins, Faria Lima, Moema) e RJ (Centro, Barra, Zona Sul).
- Fornecer links parametrizados e widgets leves para 3 casas piloto divulgarem em seus canais de atendimento e sites.
- Rastrear via UTM e analytics a origem de cada oferta publicada durante o período de 4 a 8 semanas.

### Sample Size & Duration

- 100 a 200 ofertas geradas durante o piloto.
- Duração: 4 a 8 semanas.

### Pass/Fail Criteria

- **Validada se:** ≥ 80% das ofertas legítimas vierem de buscas orgânicas locais e canais de casas parceiras, com CAC de mídia próximo a zero.
- **Invalidada se:** O tráfego orgânico local não gerar intenções suficientes (< 2 ofertas por semana por praça), demonstrando dependência inevitável de mídia de performance paga.

## Risks & Assumptions

### Key Assumptions

- Google indexa com rapidez satisfatória as novas páginas estruturadas de cotação por praça.
- Casas parceiras têm interesse em usar as landing pages ou links da plataforma para receber ofertas de seus próprios clientes (testando a viabilidade futura do "Modo Oferta Privada").

### Risks

- **Tempo de maturação do SEO:** O ranqueamento orgânico do Google pode demorar semanas ou meses para atingir as primeiras posições. Mitigação: apoiar o piloto inicial na divulgação ativa das casas parceiras e correspondentes locais captados pelo sócio comercial.

## Timeline

| Fase | Datas | Duração |
|------|-------|---------|
| Publicação da estrutura técnica de SEO local | [HIPÓTESE – A VALIDAR] | 2 semanas |
| Indexação e monitoramento de tráfego inicial | [HIPÓTESE – A VALIDAR] | 3 semanas |
| Validação da proporção de origens de oferta | [HIPÓTESE – A VALIDAR] | 4 semanas |

---

# H7 — Hipótese de Automação de Taxas: Atualização em lote é requisito eliminatório para migração

## Hypothesis Statement

**We believe that** disponibilizar mecanismos automatizados de atualização de taxas de balcão (via importação de arquivo CSV/planilha ou integração simplificada via API/webhook)

**for** mesas de câmbio e operadores de casas de câmbio de médio e grande porte em RJ e SP

**will** eliminar o atrito de manter taxas duplicadas manualmente e constituir requisito indispensável para a migração efetiva e retenção no piloto

**as measured by** percentual de casas de câmbio entrevistadas que condicionam sua adesão e atividade diária contínua à existência de atualização em lote/automatizada de taxas

## Background & Rationale

### Problem Context

Casas de câmbio alteram seus spreads e taxas de balcão múltiplas vezes ao longo do dia conforme as oscilações da PTAX e do mercado interbancário. No modelo do MVP inicial, o cadastro de taxas da Vitrine Informativa foi desenhado como formulário manual por moeda e produto ([US-021](../03-product/user-stories.md#us-021-cadastro-de-taxas-de-balcão-na-vitrine)).

Se a casa tiver que preencher manualmente 10 a 15 moedas várias vezes ao dia em mais um sistema, a probabilidade de manter taxas defasadas ou simplesmente abandonar a vitrine é altíssima. A capacidade de importar planilhas ou integrar uma API simples pode ser a diferença entre uma casa ativa e uma conta fantasma.

### Supporting Evidence

- No incumbente (Melhor Câmbio), as maiores redes parceiras operam via rotinas automáticas de envio de taxas ou scripts internos que consomem suas planilhas de mesa.
- Entrevistas com operadores de tesouraria apontam que redigitar taxas é a principal reclamação operacional quando se avalia um novo canal digital.

### Alternative Hypotheses Considered

- **Manutenção puramente manual no MVP:** Assumir que o operador preencherá manualmente porque são apenas moedas principais (USD e EUR). Risco alto de desatualização; precisa ser testado com urgência nas entrevistas de validação.
- **Raspagem automática das taxas no site da casa:** A plataforma capturaria as taxas da casa sem intervenção dela. Rejeitada categoricamente por insegurança jurídica, fragilidade técnica e risco de violar termos de uso.

## Target User Segment

### Definition

- **Gerentes de Mesa, Operadores de Tesouraria e Técnicos de TI** de corretoras e casas de câmbio parceiras que operam com mais de 3 moedas ativas.

### Segment Size

- Cerca de 8 a 12 das 15 casas do universo piloto em SP e RJ.

### Current Behavior

- Mantêm uma planilha Excel central na tesouraria que calcula as taxas do dia a partir da PTAX + margens e disparam para suas lojas e canais digitais via CSV ou integração direta.

## Success Metrics

### Primary Metric

| Métrica | Baseline Atual | Meta | Efeito Mínimo Detectável |
|---------|---------------|------|--------------------------|
| % de casas entrevistadas que classificam importação por CSV/API como "Requisito Obrigatório" para adesão sustentada | N/A | ≥ 50% das casas de médio/grande porte [HIPÓTESE – A VALIDAR] | 20% |

### Secondary Metrics

| Métrica | Baseline Atual | Direção Esperada |
|---------|---------------|------------------|
| Frequência de atualização de taxas de balcão quando há importação por planilha vs digitação manual | N/A | Aumento de ≥ 3x na frequência de atualização diária |
| Taxa de erro ou discrepância de taxas entre vitrine e proposta | N/A | Redução para menos de 0,5% |

### Guardrail Metrics

| Métrica | Valor Atual | Faixa Aceitável |
|---------|------------|-----------------|
| Complexidade técnica do importador (tempo de desenvolvimento de engenharia) | N/A | Máximo de 1 sprint para suporte a CSV básico |

## Validation Approach

### Method

**Perguntas de validação técnica nas entrevistas de screening (Questão 4 do Roteiro):**
- Investigar exatamente como a casa publica suas taxas hoje (manual, planilha, sistema próprio de ERP cambial, API).
- Apresentar o conceito de upload rápido de planilha CSV e perguntar se isso atende ou se exigem API/webhook em tempo real.
- Avaliar se a falta da importação de planilha impediria a casa de participar do piloto no primeiro mês.

### Sample Size & Duration

- 10 a 15 casas entrevistadas nas primeiras 2 semanas.

### Pass/Fail Criteria

- **Validada se:** ≥ 50% das casas declararem que a digitação manual é inviável para a rotina diária e que a importação de planilha (CSV) ou API é condição para permanência. Nesse caso, a importação por CSV/planilha deve subir imediatamente para a Fase 1 do Roadmap.
- **Invalidada se:** As casas piloto informarem que no início pretendem apenas responder a ofertas de USD e EUR e que atualizar manualmente 2 taxas uma vez por dia é perfeitamente tolerável.
- **Inconclusiva se:** Casas pequenas aceitarem manual e casas grandes exigirem API complexa — recomendando segmentar por porte.

## Risks & Assumptions

### Key Assumptions

- As casas utilizam formatos de planilha relativamente padronizados (colunas com Moeda, Tipo, Compra, Venda).
- O operador tem permissão para subir arquivos de planilha no navegador web da plataforma.

### Risks

- **Incompatibilidade de formatos de planilha:** Cada casa usa um layout de colunas diferente, exigindo múltiplos parsers customizados. Mitigação: fornecer modelo padrão baixável de CSV/Excel.

## Timeline

| Fase | Datas | Duração |
|------|-------|---------|
| Inclusão da questão técnica no roteiro de entrevistas | [HIPÓTESE – A VALIDAR] | Concluído |
| Mapeamento de formatos de planilha das 10 casas piloto | [HIPÓTESE – A VALIDAR] | 2 semanas |
| Decisão de priorização de escopo no backlog | [HIPÓTESE – A VALIDAR] | Imediato pós-entrevistas |

