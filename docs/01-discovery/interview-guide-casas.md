---
artifact: interview-guide
version: "1.5.1"
created: 2026-11-03
status: draft
---

# Roteiro de Entrevista com Casas de Câmbio: Validação de Hipóteses (Piloto SP/RJ)

Este documento estabelece o roteiro padronizado de pesquisa qualitativa e descoberta para condução de entrevistas de validação com proprietários (Owners), diretores comerciais e gerentes de mesa de câmbio das praças do Rio de Janeiro e de São Paulo.

> [!IMPORTANT]
> **Objetivo Primário da Pesquisa:**
> Validar ou invalidar em campo as hipóteses estruturantes de negócio e produto ([H1 a H7](hypotheses.md)), com foco em desvendar a prontidão de migração para uma alternativa neutra, a economia real do canal incumbente, o regime de multi-homing e as restrições contratuais ou técnicas existentes. **Todas as premissas são tratadas como hipóteses a validar, nunca como fatos consumados.**

---

## 1. Ficha Técnica da Entrevista

- **Público-Alvo:** Proprietários (Owners), Diretores de Operações e Gerentes de Mesa de Câmbio de instituições autorizadas pelo Banco Central.
- **Duração Estimada:** 30 a 40 minutos.
- **Formato:** Presencial (na mesa de operações da casa) ou videoconferência individual.
- **Postura do Entrevistador:** 
  - Foco em **fatos e comportamentos passados reais** (o que a casa *já faz e quanto paga*), evitando perguntas hipotéticas do tipo "você gostaria de...".
  - Não vender a solução nos primeiros 25 minutos; ouvir as dores e rotinas operacionais sem induzir respostas.
  - Sigilo absoluto e garantia de que nenhum dado concorrencial será compartilhado com outras casas [VALIDAR COM ADVOGADO].

---

## 2. Estrutura do Roteiro (Passo a Passo)

### Bloco A — Abertura e Enquadramento (3 minutos)
- Agradecer o tempo do entrevistado e apresentar o propósito: *"Estamos desenhando uma ferramenta de software de comunicação em tempo real para conectar clientes a casas de câmbio autorizadas, e nosso objetivo hoje é entender a rotina real da sua mesa de operações, o que funciona bem e o que gera fricção nos canais atuais."*
- Reafirmar o compromisso de **neutralidade** e sigilo profissional.

---

### Bloco B — As 8 Perguntas Centrais de Validação

#### Pergunta 1: Motivação de Alternativa e Percepção de Mercado
> **"Por que vocês gostariam ou buscariam uma alternativa de plataforma de cotação e leads hoje?"**
- **Hipótese Vinculada:** [H4 — Neutralidade e Migração](hypotheses.md#h4--hipótese-de-neutralidade-e-migração-casas-buscam-alternativa-independente-ao-incumbente)
- **O que investigar (Probes):**
  - A aquisição do Melhor Câmbio pela Nomad alterou de alguma forma a relação comercial de vocês com a plataforma?
  - Existe preocupação de que os melhores clientes sejam direcionados para a conta global/cartão Nomad?
  - Ou, pelo contrário, o produto atual atende plenamente e tem poucas reclamações operacionais?
  - O que uma nova plataforma precisaria ter para justificar sua atenção?

#### Pergunta 2: Modelo de Precificação Atual (Pricing / WTP)
> **"Quanto e como vocês pagam hoje pelos leads ou pela presença no Melhor Câmbio ou em outros agregadores?"**
- **Hipótese Vinculada:** [H3 — Modelo de Negócio / WTP](hypotheses.md#h3--hipótese-de-negócio-casas-pagariam-pelo-acesso-ao-marketplace)
- **O que investigar (Probes):**
  - Vocês pagam mensalidade fixa, taxa por lead entregue, taxa por match fechado ou percentual?
  - Qual é o valor aproximado desembolsado por mês nessa rubrica?
  - Como é feita a conciliação e o pagamento (boleto, fatura, cartão)?
  - Vocês consideram esse custo justo em relação ao retorno gerado?

#### Pergunta 3: Volume de Demanda e Taxa de Conversão Atual
> **"Qual é o volume semanal médio de ofertas que vocês recebem hoje e qual percentual delas efetivamente vira negócio fechado na loja ou delivery?"**
- **Hipótese Vinculada:** [H5 — Multi-Homing e Liquidez](hypotheses.md#h5--hipótese-de-multi-homing-e-priorização-por-densidade-de-ofertas)
- **O que investigar (Probes):**
  - Quantas notificações/ofertas chegam na mesa em um dia útil típico?
  - Dessas, quantas vocês chegam a responder ou aceitar?
  - Dos aceites, quantos clientes realmente pagam e retiram a moeda (taxa de conversão final)?
  - Qual é a maior causa de perda: taxa, tempo de resposta, desistência do cliente ou falta de estoque de moeda?

#### Pergunta 4: Publicação de Taxas e Requisitos de Integração Técnica
> **"Como vocês publicam e atualizam as taxas de balcão hoje, e que tipo de integração técnica aceitariam ou exigiriam em uma nova plataforma?"**
- **Hipótese Vinculada:** [H7 — Automação de Taxas](hypotheses.md#h7--hipótese-de-automação-de-taxas-atualização-em-lote-é-requisito-eliminatório-para-migração)
- **O que investigar (Probes):**
  - A mesa digita as taxas manualmente todo dia, ou vocês usam uma planilha Excel centralizada, ERP interno ou API?
  - Quantas vezes ao dia as taxas mudam na mesa de vocês?
  - Digitar manualmente em um formulário web seria aceitável no início, ou o envio por planilha CSV é requisito obrigatório desde o primeiro dia?
  - A casa possui equipe ou técnico de TI capaz de consumir uma API/webhook se necessário?

#### Pergunta 5: Exclusividade e Amarras Contratuais
> **"Existe alguma cláusula de exclusividade, restrição de canal ou penalidade no contrato de vocês com o Melhor Câmbio / Nomad que impeça a participação em outra plataforma?"**
- **Hipótese Vinculada:** [Riscos Competitivos](competitive-context.md#5-riscos-competitivos-estruturais) `[VALIDAR COM ADVOGADO]`
- **O que investigar (Probes):**
  - Há algum tipo de fidelidade contratual ou aviso prévio exigido?
  - Existe cláusula de não-concorrência de canal digital?
  - Se vocês colocarem uma plaqueta ou divulgarem uma nova ferramenta, há risco de descredenciamento no incumbente?

#### Pergunta 6: Volume Mínimo de Permanência (Threshold de Densidade)
> **"Qual é o volume mínimo de ofertas qualificadas por semana que a nossa plataforma precisa entregar para valer a pena manter o operador com a tela aberta todos os dias?"**
- **Hipótese Vinculada:** [H5 — Multi-Homing](hypotheses.md#h5--hipótese-de-multi-homing-e-priorização-por-densidade-de-ofertas)
- **O que investigar (Probes):**
  - Se entrarem 3 ofertas por semana, o operador mantém a aba aberta ou esquece?
  - E com 5 a 10 ofertas por semana?
  - O que pesa mais: o número de ofertas ou o ticket médio de cada uma (ex.: ofertas de USD 2.000 vs. USD 200)?

#### Pergunta 7: Interesse em Landing Page Própria / Modo Privado
> **"Vocês teriam interesse em ter uma página própria na internet (ou widget no site de vocês) onde seus próprios clientes pudessem enviar ofertas diretamente para a mesa de vocês?"**
- **Hipótese Vinculada:** [H6 — Canais GTM](hypotheses.md#h6--hipótese-de-aquisição-de-demanda--gtm-clientes-chegam-por-seo-local-e-canais-das-casas)
- **O que investigar (Probes):**
  - A casa já possui site próprio com captura de leads?
  - A ideia de um "Modo Oferta Privada" (oferta enviada exclusivamente para a mesa de vocês, sem concorrência aberta com outras casas) é atraente?
  - Vocês divulgariam essa página no WhatsApp, Instagram ou balcão físico de vocês?

#### Pergunta 8: Operação Interna e SLA de Resposta
> **"Quem na equipe de vocês é responsável por olhar as ofertas que chegam e quanto tempo costumam levar para responder?"**
- **Hipótese Vinculada:** [H2 — Viabilidade Operacional](hypotheses.md#h2--hipótese-de-viabilidade-casas-de-câmbio-respondem-rápido-o-bastante)
- **O que investigar (Probes):**
  - É um operador dedicado de mesa, um operador de caixa ou o próprio gerente/dono?
  - Qual é o canal mais rápido para alertar esse operador: som no computador, mensagem no WhatsApp ou notificação no celular?
  - Responder em até 15 minutos é viável na rotina diária sem atrapalhar o atendimento presencial?

---

### Bloco C — Pergunta Red Team / Dealbreaker (3 minutos)

#### Pergunta 9 (Crucial): Motivos para Não Migrar
> **"O que faria vocês decidirem NÃO migrar ou abandonarem a plataforma nos primeiros 30 dias de piloto?"**
- **O que investigar (Probes):**
  - Se o sistema for perfeito tecnicamente, qual o motivo externo que faria vocês desistirem? (falta de clientes, sistema instável, taxas de comissão altas, complexidade cadastral).
  - Como avaliam a exigência de segundo fator de autenticação (MFA via celular) para cada operador?

---

### Bloco D — Fechamento e Carta de Intenção (5 minutos)
- Agradecer profundamente pela franqueza das respostas.
- Apresentar a oportunidade do piloto da Fase 1 (100% gratuito para 5 a 10 casas selecionadas em SP e RJ).
- Convite formal: *"Com base no que conversamos, faria sentido assinar uma Carta de Intenção (LOI) não vinculante para garantir uma vaga pioneira na mesa de operações do piloto quando abrirmos em São Paulo/Rio?"*
- Registrar a resposta objetiva (Sim / Não / Talvez com condições).

---

## 3. Template de Registro Pós-Entrevista

```markdown
### Registro de Entrevista #[ID]
- **Data/Hora:** AAAA-MM-DD HH:MM
- **Instituição / Casa:** [Nome Fantasia / Razão Social]
- **Praça:** [São Paulo / Rio de Janeiro]
- **Entrevistado:** [Nome e Cargo — ex: Gerente de Mesa / Owner]
- **Entrevistador:** [Nome do Membro do Time]

#### Resumo dos Achados:
1. **Motivação de Alternativa:** [Cita Nomad / Conflito / Insatisfação / Neutro]
2. **Preço Atual:** [R$ X/mês ou R$ Y por lead / modelo praticado]
3. **Volume e Fechamento:** [X ofertas/sem; Y% taxa de fechamento]
4. **Atualização de Taxas:** [Manual / Planilha CSV / API / Requisito eliminatório?]
5. **Amarras Contratuais:** [Sem restrições / Exclusividade alegada / A verificar]
6. **Threshold de Volume:** [Mínimo de X ofertas/semana para ficar ativo]
7. **Interesse em Landing Page:** [Alto / Médio / Baixo / Quer modo privado]
8. **Operador e SLA:** [Perfil: X; Canal preferido: Y; Tempo médio: Z min]
9. **Dealbreaker Declarado:** [Principal risco de abandono]

#### Desfecho Comercial:
- **Assinou Carta de Intenção (LOI)?** [SIM / NÃO / PENDENTE]
- **Comentários adicionais do entrevistador:** [Impressão geral de engajamento]
```

---

## 4. Histórico de Revisão

| Versão | Data | Autor | Mudanças |
|--------|------|-------|----------|
| 1.5.1 | 2026-11-03 | Equipe de Produto | Criação do roteiro padronizado com as 8 perguntas estruturais de validação de campo, probes operacionais e template de registro. |

