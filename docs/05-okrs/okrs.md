# OKR Set: Plataforma de Comunicação e Aproximação Cambial (T1 e T2)

Documento elaborado segundo as diretrizes da skill `foundation-okr-writer` em modo One-Shot, abrangendo os dois primeiros trimestres após o go-live do piloto em São Paulo e Rio de Janeiro. Atualizado na v1.5.1 para incorporar KRs de validação de hipóteses (cartas de intenção de casas, densidade de ofertas por casa/semana e tempo de resposta) e ancorar a aquisição de demanda estritamente em canais definidos (SEO local e parcerias co-distribuídas), removendo metas de demanda orgânica abstrata.

---

# Ciclo T1: Lançamento do Piloto, Validação de Hipóteses e Liquidez

## Context

- **Scope:** Product
- **Cycle:** T1 (Trimestre 1 pós-lançamento piloto)
- **Level:** Product
- **OKR type:** learning (para validação de hipóteses H4-H7 e canais de demanda) e committed (para adesão mínima de casas e estabilidade)
- **Empowered-team signal:** empowered (a equipe fundadora tem autonomia total sobre produto, escopo e estratégia)
- **Source of truth:** `docs/05-okrs/okrs.md` (repositório local; migração planejada para dashboard Metabase/PostgreSQL pós-lançamento)
- **Strategic input:** Validar em campo as hipóteses estruturantes de neutralidade ([H4](hypotheses.md)), multi-homing ([H5](hypotheses.md)), tração por SEO local ([H6](hypotheses.md)) e automação de taxas ([H7](hypotheses.md)), assegurando densidade mínima de ofertas e resposta rápida das casas piloto em SP e RJ.
- **Assumptions:**
  - O parceiro comercial e o roteiro de validação viabilizam a captura de 10 a 15 Cartas de Intenção (LOIs) de casas em SP e RJ;
  - Casas de câmbio conseguem responder a ofertas durante o horário comercial bancário (10h às 16h);
  - A demanda de clientes é gerada estritamente por páginas de SEO local por cidade/bairro e canais próprios das casas parceiras, sem depender de tráfego de marca prévio;
  - O piloto será gratuito para acelerar a adesão inicial sem atrito de cobrança ou faturamento.

---

## Objective 1 (T1)

Construir liquidez operacional densa e validar o engajamento das casas de câmbio piloto através de canais de demanda direcionados em SP e RJ.

## Key Results

- **KR1.1:** Obter adesão formal pré-piloto de casas de câmbio autorizadas pelo Banco Central em SP e RJ via Cartas de Intenção (LOIs) não vinculantes.
  - **Metric:** Quantidade de Cartas de Intenção (LOIs) assinadas por proprietários ou diretores de casas autorizadas com compromisso de operar no piloto gratuito
  - **Baseline:** 0 (pré-lançamento)
  - **Target:** 12 Cartas de Intenção (LOIs) assinadas [HIPÓTESE – A VALIDAR] até a Semana 4 do T1 (mínimo de 7 em SP e 5 no RJ)
  - **Evidence source:** Repositório de LOIs assinadas e tabulação de entrevistas ([interview-guide-casas.md](../01-discovery/interview-guide-casas.md))
  - **Owner:** Time Comercial / Parcerias
  - **Indicator class:** leading
  - **Confidence:** medium

- **KR1.2:** Reduzir o tempo mediano de primeira resposta das casas a uma oferta publicada durante o horário comercial.
  - **Metric:** Diferença em minutos entre `offer.created_at` e a primeira `proposal.created_at` (ou aceite direto) durante dias úteis das 10h às 16h
  - **Baseline:** `recommended-to-measure` [HIPÓTESE – A VALIDAR: ~45 min inicial]
  - **Target:** Menor que 15 minutos [HIPÓTESE – A VALIDAR] até a semana 8 do T1
  - **Evidence source:** Métrica calculada via queries de timestamps na tabela `proposals` e `offers`
  - **Owner:** Time de Produto
  - **Indicator class:** leading
  - **Confidence:** low

- **KR1.3:** Sustentar densidade mínima semanal de demanda qualificada recebida por casa ativa por meio de SEO local e canais parceiros.
  - **Metric:** Média semanal de ofertas válidas recebidas por casa ativa na plataforma originadas de buscas orgânicas locais (SEO municipal) ou links diretos das casas
  - **Baseline:** 0
  - **Target:** 3 a 5 ofertas por casa ativa por semana [HIPÓTESE – A VALIDAR] no Mês 2 e Mês 3 do piloto
  - **Evidence source:** Dashboard analítico de ofertas cruzado com parâmetros de rastreamento de canal (UTMs de SEO local e parceiros)
  - **Owner:** Growth / Marketing e Produto
  - **Indicator class:** leading
  - **Confidence:** low

- **KR1.4:** Garantir índice de conversão e satisfação nos atendimentos comerciais concluídos.
  - **Metric:** Percentual de atendimentos declarados como `CONCLUÍDO` com avaliação positiva (CSAT pós-atendimento superior a 80%) [HIPÓTESE – A VALIDAR]
  - **Baseline:** `recommended-to-measure` [HIPÓTESE – A VALIDAR]
  - **Target:** Superior a 70% de desfechos `CONCLUÍDO` e CSAT > 80% nos atendimentos finalizados
  - **Evidence source:** Módulo de relato de desfecho (`attendances` e `feedback_surveys`)
  - **Owner:** Time de Atendimento e UX
  - **Indicator class:** guardrail
  - **Confidence:** medium

---

## Objective 2 (T1)

Validar a retenção das casas no regime de multi-homing e assegurar a integridade dos atendimentos pós-match.

## Key Results

- **KR2.1:** Sustentar taxa de retenção mensal de casas parceiras utilizando ativamente a plataforma para cotação e atendimento.
  - **Metric:** Percentual de casas de câmbio cadastradas no Mês 1 que continuam enviando propostas no Mês 2 e Mês 3
  - **Baseline:** 0%
  - **Target:** Maior que 70% de retenção no dia 60 pós-onboarding [HIPÓTESE – A VALIDAR]
  - **Evidence source:** Relatório de cohort de operadores ativos
  - **Owner:** Comercial / Customer Success B2B
  - **Indicator class:** evidence_generation
  - **Confidence:** medium

- **KR2.2:** Manter a taxa estimada de vazamento e abandono de atendimentos sem retorno sob controle estrito.
  - **Metric:** Percentual de atendimentos no status `EM_ATENDIMENTO` que resultam em `SEM_RETORNO` ou desistência não justificada (`CLIENTE_DESISTIU` / `CASA_NAO_ATENDEU`) sobre o total de atendimentos gerados
  - **Baseline:** `recommended-to-measure` [HIPÓTESE – A VALIDAR]
  - **Target:** Menor que 15% [HIPÓTESE – A VALIDAR]
  - **Evidence source:** Tabela `attendances` (desfechos registrados)
  - **Owner:** Produto / Operações
  - **Indicator class:** guardrail
  - **Confidence:** low

---

## Initiatives as Bets (T1)

- **Iniciativa 1: Entrevistas de Screening Estruturadas e Captação de LOIs**
  - **Expected KR impact:** Move KR1.1 e KR2.1
  - **Hypothesis:** Conduzir as 10-15 entrevistas com base no [Roteiro de Validação](../01-discovery/interview-guide-casas.md) filtrará as casas com real desconforto de neutralidade frente à Nomad e garantirá operadores comprometidos.
  - **Dependency:** Disponibilidade de agenda dos diretores de mesa e do sócio comercial.

- **Iniciativa 2: Implantação da Máquina de SEO Local de Cotação por Cidade/Bairro**
  - **Expected KR impact:** Move KR1.3
  - **Hypothesis:** Publicar páginas estáticas indexáveis focadas em intenção imediata ("câmbio turismo sp", "cotação euro rj") captura clientes com necessidade concreta sem custo de mídia paga, alimentando o fluxo de 3-5 ofertas/casa/semana.
  - **Dependency:** Setup de renderização rápida e metadados estruturados de SEO no frontend.

- **Iniciativa 3: Alertas Sonoros e Notificações Multicanal no Painel do Operador**
  - **Expected KR impact:** Move KR1.2
  - **Hypothesis:** Operadores em regime de multi-homing mantêm abas em segundo plano; avisos sonoros audíveis e notificações push/digest reduzem o tempo para visualizar ofertas novas.
  - **Dependency:** Implementação de Web Audio API, Web Notifications e throttling de e-mail/WhatsApp.

- **Iniciativa 4: Painel de Atendimento Comercial e Relato Simplificado de Desfecho**
  - **Expected KR impact:** Move KR1.4 e KR2.2
  - **Hypothesis:** Oferecer relato simplificado de desfecho (`CONCLUÍDO` vs `NÃO_CONCLUÍDO` com motivo padronizado) e botão "Relatar Problema" para suporte reduz a taxa de `SEM_RETORNO` e fornece inteligência de governança para moderação.
  - **Dependency:** Módulo de atendimento e revelação bilateral de contatos pós-match.

---

# Ciclo T2: Validação de Receita, Sustentabilidade e Expansão

## Context

- **Scope:** Product
- **Cycle:** T2 (Trimestre 2 pós-lançamento piloto)
- **Level:** Product
- **OKR type:** learning (para receita e precificação) e aspirational (para escala)
- **Empowered-team signal:** empowered
- **Source of truth:** Repositório local / Dashboard analítico
- **Strategic input:** Transformar a liquidez comprovada no T1 em um negócio economicamente sustentável, testando modelos de cobrança validados juridicamente (mensalidade SaaS ou taxa por match aceito) e expandindo a base de clientes.
- **Assumptions:**
  - O parecer jurídico regulatório sobre a não-intermediação financeira e modelo de cobrança de software foi concluído com sucesso;
  - As casas reconhecem valor na geração de leads/matches qualificados e estão dispostas a pagar assinatura ou taxa fixa por atendimento aceito.

---

## Objective 3 (T2)

Comprovar a sustentabilidade econômica do negócio validando a disposição a pagar (WTP) e implementando o primeiro modelo de monetização nas casas ativas.

## Key Results

- **KR3.1:** Validar a disposição a pagar (WTP) junto aos proprietários das casas ativas através de pesquisa estruturada e acordos comerciais de transição.
  - **Metric:** Percentual de casas parceiras ativas que assinam termo de adesão ao modelo pago proposto (mensalidade de software ou taxa por lead aceito)
  - **Baseline:** 0% (modelo gratuito no T1)
  - **Target:** Superior a 60% de conversão da base ativa do T1 [HIPÓTESE – A VALIDAR]
  - **Evidence source:** Contratos de prestação de serviços de software assinados digitalmente
  - **Owner:** Comercial / Fundadores
  - **Indicator class:** evidence_generation
  - **Confidence:** low

- **KR3.2:** Atingir faturamento recorrente inicial (MRR) proveniente de assinaturas SaaS ou taxas de software das casas.
  - **Metric:** Monthly Recurring Revenue (MRR) faturado e liquidado via gateway de cobrança
  - **Baseline:** R$ 0,00
  - **Target:** R$ 15.000,00 [HIPÓTESE – A VALIDAR] no último mês do T2
  - **Evidence source:** Relatório financeiro do gateway de pagamento integrado (ex: Asaas/Stripe)
  - **Owner:** Financeiro / Fundadores
  - **Indicator class:** lagging
  - **Confidence:** low

- **KR3.3:** Limitar a taxa de cancelamento (churn) de casas parceiras decorrente da introdução do modelo pago.
  - **Metric:** Casas ativas que suspendem a conta por recusa de pagamento / Total de casas ativas antes da cobrança
  - **Baseline:** 0%
  - **Target:** Inferior a 25% de churn no primeiro mês pós-início da cobrança [HIPÓTESE – A VALIDAR]
  - **Evidence source:** Módulo administrativo de gestão de assinaturas
  - **Owner:** Comercial
  - **Indicator class:** guardrail
  - **Confidence:** medium

---

## Objective 4 (T2)

Escalar o volume de atendimentos comerciais intermediados e ampliar o catálogo de moedas negociadas com alta densidade em SP e RJ.

## Key Results

- **KR4.1:** Multiplicar o volume mensal de atendimentos cambiais declarados como concluídos com sucesso.
  - **Metric:** Quantidade de atendimentos no status `CONCLUÍDO` no mês
  - **Baseline:** `recommended-to-measure` [volume final alcançado no Mês 3 do T1]
  - **Target:** Crescimento de 3x em relação ao volume final do T1 [HIPÓTESE – A VALIDAR]
  - **Evidence source:** Tabela `attendances`
  - **Owner:** Growth / Marketing
  - **Indicator class:** lagging
  - **Confidence:** low

- **KR4.2:** Expandir a participação de moedas secundárias (Euro, Libra, Dólar Canadense, etc.) no volume de ofertas respondidas.
  - **Metric:** Percentual de ofertas de moedas não-USD que recebem pelo menos 1 lance em menos de 30 minutos
  - **Baseline:** `recommended-to-measure` [HIPÓTESE – A VALIDAR: < 20% no T1]
  - **Target:** Maior que 50% [HIPÓTESE – A VALIDAR]
  - **Evidence source:** Tabela `offers` agrupada por `currency_code`
  - **Owner:** Produto e Parcerias
  - **Indicator class:** leading
  - **Confidence:** low

- **KR4.3:** Preservar a estabilidade técnica e latência do sistema sob aumento de tráfego.
  - **Metric:** Disponibilidade do backend (Uptime) e latência P95 do WebSocket
  - **Baseline:** Uptime 99.5% [HIPÓTESE – A VALIDAR]
  - **Target:** Uptime >= 99.9% e P95 WebSocket < 300ms
  - **Evidence source:** Datadog / Grafana Prometheus
  - **Owner:** Engenharia
  - **Indicator class:** guardrail
  - **Confidence:** high

---

## Initiatives as Bets (T2)

- **Iniciativa 4: Módulo de Faturamento e Gestão de Planos no Painel Admin**
  - **Expected KR impact:** Move KR3.1 e KR3.2
  - **Hypothesis:** Automatizar a cobrança de software via boleto e Pix reduz a inadimplência e simplifica a gestão de assinaturas da plataforma.
  - **Dependency:** Parecer jurídico sobre modelo de cobrança (ADR-0012) e integração com gateway de pagamentos nacional.

- **Iniciativa 5: Programa de Parcerias com Agências de Viagem e Produtores de Conteúdo**
  - **Expected KR impact:** Move KR4.1
  - **Hypothesis:** Parcerias B2B2C com influenciadores de viagem e agências geram fluxo contínuo de clientes com alta intenção de compra de moeda turismo.
  - **Dependency:** Definição de links de rastreamento (UTM / cupons).

- **Iniciativa 6: Implementação de Landing Pages White-Label Piloto (Post-MVP)**
  - **Expected KR impact:** Move KR3.2 e KR4.1
  - **Hypothesis:** Oferecer landing pages próprias com SEO local incentiva as casas a investirem no plano premium da plataforma.
  - **Dependency:** Conclusão da arquitetura multi-tenant (ADR-0011).

---

## Guardrails and Health Checks

- **Guardrail 1: Risco Regulatório e Denúncias de Irregularidade**
  - **Metric:** Zero autuações do Banco Central e zero notificações extrajudiciais por exercício irregular de atividade financeira ou intermediação não autorizada.
  - **Why:** Preservar a existência jurídica da empresa e a reputação dos fundadores, mantendo estrita atuação como plataforma de tecnologia de comunicação.
- **Guardrail 2: Índice de Incidentes e Reclamações de Atendimento**
  - **Metric:** Menos de 2% do total de atendimentos gerando relato de problema à moderação ou desfecho `NÃO_CONCLUÍDO` por `TAXA_NAO_MANTIDA`.
  - **Why:** Um índice elevado indica descompasso operacional nas casas parceiras ou descumprimento de ofertas aceitas, destruindo a credibilidade da plataforma.

---

## Alignment Notes

- **Parent or strategy link:** Tese fundamental: ser a camada tecnológica de comunicação e aproximação mais rápida e competitiva para o câmbio turismo no Brasil.
- **Peer dependencies:** O alcance dos KRs de tempo de resposta depende criticamente do treinamento e rotina operacional dos atendentes das casas parceiras captadas pelo sócio comercial.
- **Out of scope this cycle:** Custódia de recursos financeiros; intermediação ou liquidação de pagamentos; entrega física de moedas; mediação financeira de disputas; aplicativo móvel nativo em lojas (manter foco em Web responsivo/PWA no T1 e T2); expansão geográfica fora do eixo RJ-SP.

---

## Quality Audit

- **Strategic fit:** `pass` - Perfeito alinhamento com os desafios do problema de marketplace bilateral (cold-start de liquidez no T1 e monetização sustentável no T2).
- **Objective quality:** `pass` - Objetivos qualitativos, direcionais, sem métricas embutidas na frase, focados na transformação de estado do mercado.
- **KR outcome quality:** `pass` - Foco estrito em comportamento de usuários (tempo de resposta, taxa de match, retenção, adesão a plano pago), sem listar tarefas ou entregas de software como resultados-chave.
- **Measurement quality:** `pass` - Métricas claramente definidas com fontes de evidência, baselines e targets marcados como `[HIPÓTESE – A VALIDAR]` ou `recommended-to-measure`.
- **Product influence:** `pass` - A equipe pode influenciar diretamente a experiência e usabilidade para mover as métricas.
- **Focus:** `pass` - Máximo de 2 objetivos por trimestre e 3 a 4 KRs por objetivo.
- **Guardrails:** `pass` - Guardrails explícitos para satisfação do cliente (CSAT), vazamento/abandono de atendimentos, churn de casas e conformidade regulatória.
- **Alignment:** `pass` - Dependências operacionais e de parcerias explicitadas.
- **Operating rhythm:** `pass` - Ciclo trimestral com revisões quinzenais de progresso.
- **Integrity:** `pass` - Nenhum dado ou benchmark foi falsamente inventado; desacoplado de metas de remuneração individual.
- **Empowered-team Disclosure:** `not-applicable` - O time opera em contexto totalmente empoderado (`empowerment_signal: empowered`).

---

## Open Questions

1. Qual será a política de tolerância caso uma casa atrase sistematicamente o atendimento ou acumule relatos de taxa não mantida (deve haver suspensão temporária automática após N relatos)?
2. Como lidar com a sazonalidade de alta/baixa temporada de viagens internacionais (dezembro/janeiro e julho) na calibragem das metas do T2?
3. O modelo de cobrança definitivo na Fase 2 será mensalidade fixa SaaS ou taxa por lead/match aceito (ou pacote híbrido)? A resposta dependerá do feedback empírico do T1 e do parecer jurídico (ADR-0012).

---

## Suggested Next Step

Apresentar este conjunto de OKRs na reunião de alinhamento com o parceiro comercial e utilizá-lo como bússola para o cronograma de entrega das fases do Roadmap e critérios do Launch Checklist.

---

## Histórico de Revisão

| Versão | Data | Autor | Mudanças |
|--------|------|-------|----------|
| 1.0 | 2026-11-02 | Equipe de Produto | Definição inicial dos OKRs para os ciclos T1 e T2 |
| 1.3 | 2026-11-03 | Equipe de Produto | Alinhamento com PRD v1.3: consistência de métricas de concorrência, tempo de resposta e política de estorno em aberto do modelo de cobrança (ADR-0012). |
| 1.4 | 2026-11-03 | Equipe de Produto | Alinhamento com PRD v1.4: referenciamento à tabela centralizada de parâmetros configuráveis, gratuidade do piloto no T1 e gestão de no-show/strikes como mitigação de vazamento operacional. |
| 1.5 | 2026-11-03 | Equipe de Produto | Reposicionamento para plataforma de comunicação (estilo Melhor Câmbio / Nomad). Substituição de negociação por Atendimento Comercial (`EM_ATENDIMENTO`), KR1.4 baseado em relatos de desfecho (`CONCLUÍDO`), KR2.2 redefinido para abandono/vazamento sem retorno (`SEM_RETORNO`), remoção de métricas de no-show/strikes e disputas financeiras de guardrails. |
| 1.5.1 | 2026-11-03 | Equipe de Produto | Complemento v1.5.1: inclusão de KRs de validação de hipóteses (KR1.1 com meta de 12 Cartas de Intenção / LOIs de casas piloto em SP e RJ; KR1.3 com densidade de 3 a 5 ofertas por casa ativa/semana via SEO local e parceiros; e KR1.2 com tempo de resposta < 15 min); e remoção de metas que presumiam demanda orgânica abstrata sem canal definido. |

