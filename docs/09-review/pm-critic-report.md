# Relatório de Revisão Adversarial (PM Critic Report) — Versão 1.4

**Artefatos Revisados:**
- `docs/03-product/prd.md` (v1.4)
- `docs/03-product/acceptance-criteria.md` (v1.4)
- `docs/03-product/user-stories.md` (v1.4)
- `docs/04-architecture/adr/adr-0006-concorrencia-match.md` (v1.4)
- `docs/04-architecture/adr/adr-0012-modelo-cobranca.md` (v1.4)
- `docs/06-roadmap/roadmap.md` (v1.4)
- `docs/07-launch/launch-checklist.md` (v1.4)
- `docs/05-okrs/okrs.md` (v1.4)
- `README.md` (v1.4)
- `docs/02-strategy/prioritization.md` (v1.0)

**Padrões e Skills Consultadas:**
- `skills/utility-pm-critic/SKILL.md`
- `skills/deliver-prd/SKILL.md`
- `skills/deliver-acceptance-criteria/SKILL.md`
- `skills/deliver-edge-cases/SKILL.md`
- `skills/deliver-user-stories/SKILL.md`
- `skills/develop-adr/SKILL.md`
- `skills/define-hypothesis/SKILL.md`
- `skills/foundation-okr-writer/SKILL.md`
- `skills/deliver-launch-checklist/SKILL.md`

**Total de Apontamentos:** 6 (P0: 0, P1: 2, P2: 3, P3: 1)

---

## Section 1: Relatório Completo de Apontamentos (Full Findings)

## P0 findings

*Nenhum apontamento P0 detectado. O núcleo funcional, regulatório e arquitetural do produto na versão 1.4 está robustamente especificado. As correções da v1.4 solucionaram integralmente os riscos anteriores: a convergência da Tabela Unificada de Erros em todos os ACs e User Stories (com US-008 AC-2 alinhado para HTTP 422 `OFFER_ALREADY_CLOSED`), o expurgo de alíquotas fixas de IOF em favor do valor informado pela casa [VALIDAR COM ESPECIALISTA TRIBUTÁRIO] sob a Decisão em Aberto nº 1 (VET total final recomendado), o modelo de concorrência com lock pessimista na extensão de oferta desacoplado de reagendamento síncrono no BullMQ, a substituição do checkpoint rígido pelo fluxo de no-show ao término da janela acordada com 24h úteis de contestação, a reiteração da gratuidade total do piloto na Fase 1 (ADR-0012), a criação da seção de Parâmetros Configuráveis com 21 parâmetros centralizados, e os novos requisitos de segurança e PLD (MFA, modal pré-aceite e teto de valor).*

---

## P1 findings

### F-01: Latência na Expiração Efetiva da Oferta Estendida por Ausência de Job Pontual no BullMQ

**Localização:** `docs/04-architecture/adr/adr-0006-concorrencia-match.md` (Seção 7, linhas 78) em confronto com `docs/03-product/acceptance-criteria.md` (AC-25, AC-26) e `docs/03-product/prd.md` (FR-24).
**Problema:** O ADR-0006 estabelece que, na extensão de 5 minutos da oferta, o worker assíncrono do BullMQ não é reprogramado dinamicamente: ao disparar no delay original (ex.: minuto 30), ele consulta o banco, valida que `expires_at > clock_timestamp()` e finaliza com sucesso sem alterar o estado da oferta. O ADR delega a expiração efetiva subsequente à *"varredura periódica de segurança ou por um novo job disparado pelo backend"*. Se o backend não disparar explicitamente um novo job atrasado de expiração (`offer-expiration-extended`, delay = 5 minutos) no momento da prorrogação, a expiração dependerá exclusivamente da varredura periódica de segurança. Se essa rotina rodar em intervalos espaçados (ex.: a cada 5 a 10 minutos), a oferta estendida permanecerá no status `ABERTA` após o vencimento real por vários minutos a mais na interface de clientes e casas, gerando sensação de "oferta zumbi" e atrasando o encerramento em cascata das propostas remanescentes.
**Por que importa:** Embora o banco bloqueie transacionalmente qualquer aceite após `expires_at` via `clock_timestamp()`, a experiência do usuário (UX) e os eventos de WebSocket (`offer:expired`, `proposal:closed`) ficarão defasados em relação à contagem regressiva da tela, provocando chamadas desnecessárias de operadores tentando aceitar ofertas vencidas e abrindo chamados de suporte.
**Fix:** Complementar a Seção 7 do ADR-0006 e o requisito FR-24 especificando que, no momento do commit da extensão da oferta, o backend agenda atômica ou assincronamente um novo job pontual no BullMQ com delay correspondente ao tempo remanescente estendido (`delay = 5 * 60 * 1000 ms`), mantendo a varredura periódica apenas como mecanismo de resiliência e fail-safe (segurança em profundidade).

---

### F-02: Omissão dos Pareceres Específicos das Decisões em Aberto nos Itens do Launch Checklist

**Localização:** `docs/07-launch/launch-checklist.md` (Seção `Legal & Compliance`, linhas 34-41) em confronto com `docs/03-product/prd.md` (`Decisões em Aberto`, linhas 515-538).
**Problema:** O PRD v1.4 formaliza decisões de negócio críticas que estão pendentes de validação jurídica e tributária com tags explícitas:
1. *Decisão nº 1:* Parecer tributário atestando que a plataforma não calcula nem fixa alíquotas de IOF e que a discriminação informada pela casa atende à regulamentação cambial;
2. *AC-08:* Validação formal com advogado do bloqueio unilateral de cancelamento de oferta após match (`OFFER_ALREADY_CLOSED`);
3. *AC-09:* Validação jurídica da redação neutra e da política de retenção preventiva na suspensão de parceiro (`SUSPENSAO_PARCEIRO`);
4. *AC-28:* Validação operacional e legal dos critérios probatórios de ausência e contestação de No-Show;
5. *US-030 / AC-31:* Definição dos critérios de monitoramento de fracionamento de ofertas (PLD).
Contudo, o `launch-checklist.md` lista apenas 5 itens genéricos em `Legal & Compliance` (Parecer de custódia, Termos de Uso, LGPD, Cláusula de adesão e Matriz PLD/KYC alinhada), sem que esses 5 pareceres específicos possuam linhas dedicadas, prazos e donos atribuídos antes do portão de Go/No-Go.
**Por que importa:** Se os pareceres tributários e contratuais específicos não forem formalmente rastreados no checklist de lançamento, o comitê decisor pode autorizar o go-live sem ter pacificado a responsabilidade tributária do VET ou a legalidade da retenção pós-match perante o Código de Defesa do Consumidor (CDC).
**Fix:** Desmembrar os itens da seção `Legal & Compliance` do `docs/07-launch/launch-checklist.md`, criando linhas de checagem específicas para o Parecer Tributário do VET, a Homologação Jurídica das Regras de No-Show/Cancelamento pós-match e os Parâmetros de PLD, vinculados ao Legal Counsel com entrega prevista para a semana S07.

---

## P2 findings

### F-03: Sincronização Incompleta entre a Tabela Sinóptica de Edge Cases do PRD e o Catálogo de Critérios de Aceitação

**Localização:** `docs/03-product/prd.md` (Seção `### Edge Cases e Cenários de Falha`, linhas 311-329) em confronto com `docs/03-product/acceptance-criteria.md`.
**Problema:** A tabela de edge cases do PRD lista 16 cenários mapeados, enquanto o documento de critérios de aceitação formalizou 31 critérios executáveis (AC-01 a AC-31). Seis cenários cruciais de borda e concorrência introduzidos nas versões 1.3 e 1.4 estão ausentes da tabela do PRD:
- `AC-18`: Aceite de contraproposta pelo cliente vs. aceite direto por outra casa simultâneos;
- `AC-19`: Duplo aceite simultâneo de contrapropostas pelo cliente;
- `AC-22`: Tentativa de aceite ou contraproposta por casa não elegível ou suspensa;
- `AC-23`: Concorrência na criação de ofertas no limite simultâneo por cliente;
- `AC-24`: Sincronização do countdown de expiração baseado no horário oficial do servidor;
- `AC-27`: Cálculo da validade efetiva de contraproposta limitada ao término da oferta estendida.
**Por que importa:** A tabela de edge cases do PRD é utilizada por arquitetos, engenheiros de QA e product managers como matriz de cobertura. A omissão desses cenários gera descompasso de rastreabilidade (RTM) entre especificação de produto e casos de teste automatizados.
**Fix:** Atualizar a tabela `### Edge Cases e Cenários de Falha` do `docs/03-product/prd.md` para incluir os 6 critérios faltantes com seus comportamentos observáveis e hiperlinks para o `acceptance-criteria.md`.

---

### F-04: Conflito Conceitual na Métrica de Vazamento (KR 2.2 dos OKRs) decorrente do Fluxo de No-Show

**Localização:** `docs/05-okrs/okrs.md` (Ciclo T1, KR2.2, linhas 84-88) vs. `docs/03-product/prd.md` (FR-31) e `acceptance-criteria.md` (AC-28).
**Problema:** O KR2.2 do ciclo T1 mede a taxa de vazamento (desintermediação pós-match) como:
$$\text{Taxa de Vazamento} = \frac{\text{Negociações em AGUARDANDO\_PAGAMENTO\_ENTREGA que transicionam para CANCELADA ou expiram sem conclusão}}{\text{Total de Negociações}} \times 100$$
Com a implementação do fluxo formal de No-Show (FR-31 e AC-28), negociações onde o cliente simplesmente não compareceu à loja e não contestou o aviso em 24h úteis são transicionadas para `CANCELADA` com motivo `CANCELADA_NO_SHOW`. Essas ocorrências representam atrito operacional ou desistência do consumidor, mas não necessariamente "vazamento comercial" (que ocorre quando as partes burlam a plataforma para fechar por fora).
**Por que importa:** A métrica do KR2.2 ficará artificialmente inflacionada por desistências operacionais legítimas de clientes, sinalizando falsamente que há desintermediação descontrolada e levando a liderança a adotar medidas coercitivas desnecessárias contra casas parceiras.
**Fix:** Ajustar a descrição da métrica do KR2.2 em `docs/05-okrs/okrs.md` para excluir cancelamentos por no-show comprovado ou segregar a métrica em dois indicadores: *Taxa de Ausência Operacional (No-Show)* e *Taxa de Vazamento por Desintermediação/Disputa*.

---

### F-05: Indefinição sobre Disparo de Extensão Automática por Contraproposta Submetida após Recusa Prévia

**Localização:** `docs/03-product/prd.md` (FR-24, FR-26) e `docs/03-product/acceptance-criteria.md` (AC-25, AC-26).
**Problema:** A documentação especifica que uma casa cuja contraproposta anterior foi recusada pelo cliente pode submeter uma nova proposta enquanto a oferta estiver aberta, respeitando o limite de 3 revisões e o cooldown de 30 segundos. Por outro lado, o requisito de extensão prevê que uma contraproposta que chegue nos últimos 5 minutos de uma oferta prorroga o prazo em mais 5 minutos (máx. 1 extensão). Não está formalizado se uma contraproposta submetida por uma casa que já teve proposta recusada tem a prerrogativa de disparar a extensão automática de prazo.
**Por que importa:** Um operador que teve sua proposta recusada poderia propositalmente esperar o último minuto da oferta para submeter uma proposta de valor quase idêntico apenas para forçar a prorrogação da oferta por mais 5 minutos, contrariando a preferência do cliente que já havia deliberadamente recusado aquela casa.
**Fix:** Registrar expressamente em FR-24 e AC-25 a regra de negócio aplicável: ou determinar que qualquer contraproposta válida de casa elegível ativa a extensão única (caso ainda não ocorrida), ou restringir a extensão a contrapropostas inéditas de casas distintas ou propostas com melhoria mínima parametrizada em relação à recusada.

---

## P3 findings

### F-06: Descompasso entre a Matriz de Priorização (v1.0) e as Novas Features Mandatórias de Segurança e PLD do MVP

**Localização:** `docs/02-strategy/prioritization.md` (Seção 3, linhas 40-100) vs. `docs/03-product/prd.md` (FR-47, FR-48, FR-49) e `docs/03-product/user-stories.md` (US-028, US-029, US-030).
**Problema:** O artefato `prioritization.md` reflete o enquadramento de escopo inicial do projeto (16 itens candidatos avaliados via ICE, MoSCoW e Weighted Scoring na versão 1.0). Na versão 1.4, três novos componentes foram adicionados como **Must-Have / P0** no PRD e User Stories por exigências de segurança e compliance: MFA obrigatório (`US-028`), Modal de confirmação pré-aceite (`US-029`) e Teto de valor/alerta de fracionamento PLD (`US-030`). Esses três itens não figuram na matriz do `prioritization.md`.
**Por que importa:** Trata-se de uma divergência documental menor entre a documentação histórica de discovery/estratégia e a especificação de entrega (deliver). Novos leitores podem questionar por que requisitos mandatórios não passaram pelos frameworks de priorização originais.
**Fix:** Adicionar uma nota de atualização no início de `docs/02-strategy/prioritization.md` contextualizando que os requisitos regulatórios, de PLD e segurança cibernética (US-028 a US-030) foram incorporados na v1.4 como restrições não-negociáveis de governança (Compliance Must-Haves), sobrepondo-se à priorização puramente funcional do discovery.

---

## Section 2: Status Summary

The Marketplace de Câmbio por Melhor Oferta documentation suite review (v1.4) returned 6 findings: 0 P0, 2 P1, 3 P2, 1 P3.

The absence of P0 findings confirms that the architectural, transactional, and regulatory foundations of the product are robust and ready for engineering kickoff. The v1.4 sweep successfully resolved earlier discrepancies: error codes across all acceptance criteria and user stories are fully harmonized, fixed IOF tax rates were completely eliminated in favor of exchange-informed amounts under open decision nº 1 (VET total value recommendation), pessimistic locking concurrency is decoupled from BullMQ job rescheduling, and the pilot is explicitly confirmed as 100% free with monetization deferred to Phase 2. The 2 P1 findings highlight actionable operational refinements: scheduling a point delayed job in BullMQ upon offer extension to prevent visual latency from background database sweeps (F-01), and adding dedicated line items to the launch checklist for the specific legal and tax validations required prior to pilot launch (F-02). P2 and P3 findings represent documentation synchronization and metric refinement that can be resolved cleanly during the initial engineering setup sprint.

**Recommended next action:** Ship the v1.4 documentation baseline to the engineering team to commence Phase 1 monorepo setup. Address F-01 in the BullMQ worker implementation design, add the F-02 specific legal workstreams into the Launch Checklist before S06, and sync the PRD edge-case table (F-03) and OKR leakage definition (F-04) prior to pilot kickoff.

**Refusal triggered:** no. The documentation suite is exceptionally thorough, structurally sound, cross-referenced, and fully within review standards across triple-diamond PM specifications.

---

## Section 3: Status

```yaml
artifact:
  path: docs/03-product/prd.md
  type: prd
  thread: melhor-cambio-marketplace

findings:
  total: 6
  p0: 0
  p1: 2
  p2: 3
  p3: 1

refusal:
  triggered: false
  reason: null

standards_consulted:
  - skills/utility-pm-critic/SKILL.md
  - skills/deliver-prd/SKILL.md
  - skills/deliver-acceptance-criteria/SKILL.md
  - skills/deliver-edge-cases/SKILL.md
  - skills/deliver-user-stories/SKILL.md
  - skills/develop-adr/SKILL.md
  - skills/define-hypothesis/SKILL.md
  - skills/foundation-okr-writer/SKILL.md
  - skills/deliver-launch-checklist/SKILL.md

recommended_action: accept-and-ship

dispatch:
  mode: inline-execution
  client: gemini-cli
```
