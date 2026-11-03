---
artifact: hypothesis
version: "1.0"
created: 2026-11-02
status: draft
---

<!-- Três hipóteses fundacionais para o marketplace de câmbio Melhor Câmbio.
     H1 = Desejabilidade · H2 = Viabilidade · H3 = Negócio -->

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
