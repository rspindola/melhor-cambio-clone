# OKR Set: Marketplace de Câmbio por Melhor Oferta (T1 e T2)

Documento elaborado segundo as diretrizes da skill `foundation-okr-writer` em modo One-Shot, abrangendo os dois primeiros trimestres após o go-live do piloto em São Paulo e Rio de Janeiro.

---

# Ciclo T1: Lançamento do Piloto e Construção de Liquidez

## Context

- **Scope:** Product
- **Cycle:** T1 (Trimestre 1 pós-lançamento piloto)
- **Level:** Product
- **OKR type:** committed (para liquidez básica) e learning (para comportamento das casas)
- **Empowered-team signal:** empowered (a equipe fundadora tem autonomia total sobre produto e escopo)
- **Source of truth:** `docs/05-okrs/okrs.md` (repositório local; migração planejada para dashboard Metabase/PostgreSQL pós-lançamento)
- **Strategic input:** Validar a proposta de valor de leilão de câmbio bilateral em RJ e SP, garantindo tempo de resposta ágil e liquidez mínima para retenção de clientes.
- **Assumptions:**
  - O parceiro comercial viabilizará o onboarding de 5 a 10 casas parceiras por cidade antes da abertura ao público;
  - Casas de câmbio conseguem responder a ofertas durante o horário comercial bancário (10h às 16h);
  - O piloto será gratuito para acelerar a adesão inicial sem atrito de cobrança.

---

## Objective 1 (T1)

Construir liquidez operacional densa no marketplace em SP e RJ para que os clientes recebam propostas competitivas e respostas rápidas às suas intenções de câmbio.

## Key Results

- **KR1.1:** Aumentar o número de casas de câmbio ativas e habilitadas (com status `APROVADA` e pelo menos 1 lance ou aceite nos últimos 7 dias) em SP e RJ.
  - **Metric:** Casas de câmbio ativas na plataforma com status `APROVADA` e atividade transacional semanal
  - **Baseline:** 0 (pré-lançamento)
  - **Target:** 15 casas ativas [HIPÓTESE – A VALIDAR] até o fim do T1 (mínimo de 7 em SP e 5 no RJ)
  - **Evidence source:** Consulta na tabela `exchanges` cruzada com logs de propostas em `audit_logs`
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

- **KR1.3:** Elevar a taxa de conversão de ofertas publicadas em matches consolidados (liquidez do book).
  - **Metric:** (Total de ofertas com status `FECHADA` / Total de ofertas com status `FECHADA` + `EXPIRADA` + `CANCELADA`) * 100
  - **Baseline:** 0% (sem histórico)
  - **Target:** 35% de taxa de match [HIPÓTESE – A VALIDAR] no acumulado do T1
  - **Evidence source:** Dashboard analítico de ofertas
  - **Owner:** Time de Produto e Operações
  - **Indicator class:** lagging
  - **Confidence:** low

- **KR1.4:** Garantir índice mínimo de satisfação (CSAT pós-negociação) dos clientes que concluíram transação.
  - **Metric:** Percentual de avaliações "Satisfeito" ou "Muito Satisfeito" no formulário de feedback exibido na conclusão
  - **Baseline:** `recommended-to-measure` [HIPÓTESE – A VALIDAR]
  - **Target:** Superior a 80% [HIPÓTESE – A VALIDAR]
  - **Evidence source:** Tabela `feedback_surveys`
  - **Owner:** Time de Atendimento e UX
  - **Indicator class:** guardrail
  - **Confidence:** medium

---

## Objective 2 (T1)

Validar a usabilidade e o engajamento contínuo das casas parceiras no painel de negociação em tempo real.

## Key Results

- **KR2.1:** Sustentar taxa de retenção mensal de casas parceiras utilizando a plataforma para cotação e negociação.
  - **Metric:** Percentual de casas de câmbio cadastradas no Mês 1 que continuam enviando propostas no Mês 2 e Mês 3
  - **Baseline:** 0%
  - **Target:** Maior que 70% de retenção no dia 60 pós-onboarding [HIPÓTESE – A VALIDAR]
  - **Evidence source:** Relatório de cohort de operadores ativos
  - **Owner:** Comercial / Customer Success B2B
  - **Indicator class:** evidence_generation
  - **Confidence:** medium

- **KR2.2:** Manter a taxa estimada de vazamento (desistência pós-match para fechamento externo sem registro) sob controle estrito.
  - **Metric:** Percentual de negociações no status `AGUARDANDO_PAGAMENTO_ENTREGA` que transicionam para `CANCELADA` ou expiram sem conclusão
  - **Baseline:** `recommended-to-measure` [HIPÓTESE – A VALIDAR]
  - **Target:** Menor que 15% [HIPÓTESE – A VALIDAR]
  - **Evidence source:** Tabela `negotiations`
  - **Owner:** Produto / Operações
  - **Indicator class:** guardrail
  - **Confidence:** low

---

## Initiatives as Bets (T1)

- **Iniciativa 1: Onboarding Assistido e Presencial das Casas Piloto**
  - **Expected KR impact:** Move KR1.1 e KR2.1
  - **Hypothesis:** Treinar os operadores das primeiras 10 casas presencialmente reduzirá o tempo de adoção do software e aumentará a prontidão de resposta.
  - **Dependency:** Disponibilidade da equipe comercial e materiais de apoio.

- **Iniciativa 2: Alertas Sonoros e Notificações Push via Browser no Painel do Operador**
  - **Expected KR impact:** Move KR1.2
  - **Hypothesis:** Operadores mantêm o navegador em segundo plano; avisos sonoros e notificações do sistema operacional reduzem o tempo para visualizar ofertas novas.
  - **Dependency:** Implementação de Web Audio API e Web Notifications no frontend React.

- **Iniciativa 3: Painel de Feedback e Conciliação Rápida de Negociação**
  - **Expected KR impact:** Move KR1.4 e KR2.2
  - **Hypothesis:** Facilitar o botão de "Confirmar Recebimento" via WhatsApp/SMS reduzirá o esquecimento de registrar a conclusão da transação.
  - **Dependency:** Integração de mensageria pós-match.

---

# Ciclo T2: Validação de Receita, Sustentabilidade e Expansão

## Context

- **Scope:** Product
- **Cycle:** T2 (Trimestre 2 pós-lançamento piloto)
- **Level:** Product
- **OKR type:** learning (para receita e precificação) e aspirational (para escala)
- **Empowered-team signal:** empowered
- **Source of truth:** Repositório local / Dashboard analítico
- **Strategic input:** Transformar a liquidez comprovada no T1 em um negócio economicamente sustentável, testando modelos de cobrança validados juridicamente e expandindo a base de clientes.
- **Assumptions:**
  - O parecer jurídico regulatório sobre a não-custódia e modelo de cobrança foi concluído com sucesso;
  - As casas reconhecem valor na geração de leads e estão dispostas a pagar assinatura ou taxa fixa por negócio fechado.

---

## Objective 3 (T2)

Comprovar a sustentabilidade econômica do negócio validando a disposição a pagar (WTP) e implementando o primeiro modelo de monetização nas casas ativas.

## Key Results

- **KR3.1:** Validar a disposição a pagar (WTP) junto aos proprietários das casas ativas através de pesquisa estruturada e acordos comerciais de transição.
  - **Metric:** Percentual de casas parceiras ativas que assinam termo de adesão ao modelo pago proposto (mensalidade ou taxa por match)
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

Escalar o volume de negociações intermediadas e ampliar o catálogo de moedas negociadas com alta densidade em SP e RJ.

## Key Results

- **KR4.1:** Multiplicar o volume mensal de negociações cambiais concluídas com sucesso na plataforma.
  - **Metric:** Quantidade de negociações no status `CONCLUÍDA` no mês
  - **Baseline:** `recommended-to-measure` [volume final alcançado no Mês 3 do T1]
  - **Target:** Crescimento de 3x em relação ao volume final do T1 [HIPÓTESE – A VALIDAR]
  - **Evidence source:** Tabela `negotiations`
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
  - **Hypothesis:** Automatizar a cobrança via boleto e Pix reduz a inadimplência e simplifica a gestão financeira para a plataforma.
  - **Dependency:** Integração com gateway de pagamentos nacional.

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
  - **Metric:** Zero autuações do Banco Central e zero notificações extrajudiciais por exercício irregular de atividade financeira.
  - **Why:** Preservar a existência jurídica da empresa e a reputação dos fundadores.
- **Guardrail 2: Índice de Disputas Operacionais**
  - **Metric:** Menos de 2% do total de matches resultando em status `DISPUTA`.
  - **Why:** Um índice elevado indica descompasso de estoque nas casas ou taxas incorretas, destruindo a confiança do cliente.

---

## Alignment Notes

- **Parent or strategy link:** Tese fundamental do marketplace: ser a camada tecnológica mais rápida e competitiva para o câmbio turismo no Brasil.
- **Peer dependencies:** O alcance dos KRs de tempo de resposta depende criticamente do treinamento e rotina operacional dos atendentes das casas parceiras captadas pelo sócio comercial.
- **Out of scope this cycle:** Custódia de recursos financeiros; aplicativo móvel nativo em lojas (manter foco em PWA/Web responsivo no T1 e T2); expansão geográfica fora do eixo RJ-SP.

---

## Quality Audit

- **Strategic fit:** `pass` - Perfeito alinhamento com os desafios do problema de marketplace bilateral (cold-start de liquidez no T1 e monetização sustentável no T2).
- **Objective quality:** `pass` - Objetivos qualitativos, direcionais, sem métricas embutidas na frase, focados na transformação de estado do mercado.
- **KR outcome quality:** `pass` - Foco estrito em comportamento de usuários (tempo de resposta, taxa de match, retenção, adesão a plano pago), sem listar tarefas ou entregas de software como resultados-chave.
- **Measurement quality:** `pass` - Métricas claramente definidas com fontes de evidência, baselines e targets marcados como `[HIPÓTESE – A VALIDAR]` ou `recommended-to-measure`.
- **Product influence:** `pass` - A equipe pode influenciar diretamente a experiência e usabilidade para mover as métricas.
- **Focus:** `pass` - Máximo de 2 objetivos por trimestre e 3 a 4 KRs por objetivo.
- **Guardrails:** `pass` - Guardrails explícitos para satisfação do cliente (CSAT), vazamento de transações, churn de casas e conformidade regulatória.
- **Alignment:** `pass` - Dependências operacionais e de parcerias explicitadas.
- **Operating rhythm:** `pass` - Ciclo trimestral com revisões quinzenais de progresso.
- **Integrity:** `pass` - Nenhum dado ou benchmark foi falsamente inventado; desacoplado de metas de remuneração individual.
- **Empowered-team Disclosure:** `not-applicable` - O time opera em contexto totalmente empoderado (`empowerment_signal: empowered`).

---

## Open Questions

1. Qual será a política de tolerância caso uma casa atrase sistematicamente o atendimento de ofertas (deve haver suspensão temporária automática após N alertas)?
2. Como lidar com a sazonalidade de alta/baixa temporada de viagens internacionais (dezembro/janeiro e julho) na calibragem das metas do T2?
3. O modelo de cobrança definitivo será mensalidade fixa ou taxa por negócio fechado (ou pacote híbrido)? A resposta dependerá do feedback empírico do T1 e do parecer jurídico.

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

