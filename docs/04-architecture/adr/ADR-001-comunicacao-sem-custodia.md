---
artifact: adr
version: "1.0"
created: 2026-11-03
status: complete
context: Guarda-corpo de zero custódia do MVP de aproximação neutra entre viajantes e casas de câmbio autorizadas
---

# ADR-001: Plataforma de comunicação estrita, sem custódia nem intermediação financeira

## Status

Accepted

**Date:** 2026-11-03
**Deciders:** Renato (produto), Tech Lead

## Context

O produto aproxima viajantes pessoa física de casas de câmbio autorizadas pelo Banco Central em São Paulo e no Rio de Janeiro. A tese é a neutralidade: sem produto financeiro próprio, sem disputar o cliente da casa e sem conta internacional.

A cartilha de câmbio do Banco Central diz que operação de câmbio só pode ser feita em instituição autorizada ou em seu correspondente, com o cliente identificado. A mesma cartilha atribui à instituição o dever de informar o Valor Efetivo Total (VET), que inclui taxa, IOF e tarifas. Receber recursos do viajante, emitir cobrança, calcular o preço final ou formalizar o contrato colocaria a plataforma numa posição regulada que o piloto não pretende ocupar. Quais regimes exatamente seriam acionados (instituição de pagamento, correspondente cambial ou outro) é pergunta para a assessoria jurídica. Este ADR não substitui esse parecer. Ele fixa a decisão técnica que mantém o produto longe de todos eles.

Existe também uma pressão de produto. O primeiro sinal de tração costuma puxar "só um sinal de reserva por Pix" ou "mostrar o total em reais". Sem uma regra escrita e verificável, esse desvio entra por uma tela, não por uma decisão.

Requisitos relacionados no PRD v1.1: Non-Goals, Out of Scope, FR-5, FR-25 e o guardrail de reais recebidos igual a zero.

## Decision

A plataforma será exclusivamente um software de comunicação e aproximação. Toda negociação formal, contrato cambial, cálculo de encargos, pagamento e entrega do papel-moeda acontece fora do software, entre o viajante e a casa.

**O sistema não terá:**

- recebimento, repasse, retenção ou devolução de valores: Pix, TED, boleto, cartão, carteira, escrow, sinal, taxa de reserva;
- integração com provedor de pagamento, banco, adquirente, carteira digital ou emissor de cobrança;
- cálculo de IOF, VET, tarifas, preço final ou valor total em reais. A plataforma também não multiplica quantia por taxa para exibir um total;
- emissão, armazenamento ou assinatura de contrato de câmbio, boleto de câmbio ou recibo;
- coleta de documento do viajante: CPF, RG, passaporte, comprovante de residência;
- roteamento de entrega física do numerário. O bairro é só uma preferência repassada à casa.

**O sistema terá apenas estes dados de negócio:** cidade, moeda, quantia de intenção, taxa desejada ou pedido de melhor taxa, taxa informada pela casa no aceite, bairro de preferência, nome, e-mail e WhatsApp do viajante, e o cadastro público e operacional da casa. Taxa e quantia são dados de comunicação, não instrução de pagamento.

**Como a decisão é verificada:**

- O esquema do banco não tem coluna de valor transacionado, saldo, chave Pix, dado de cartão nem documento do viajante. Uma migração que adicione um desses campos exige revisão deste ADR.
- O pipeline de integração contínua falha se `package.json` passar a depender de um SDK de pagamento. A lista bloqueada fica versionada no repositório e cresce por pull request.
- A revisão de código usa o PRD, seção Stop and Escalate: qualquer requisito que pareça exigir dinheiro, IOF ou contrato é escalado ao Renato antes da implementação.
- Os textos de vitrine, formulário, confirmação e aceite dizem que pagamento, contrato e valor final são tratados com a casa. A revisão jurídica aprova esses textos antes do lançamento.

## Consequences

### Positive

- O piloto fica fora de autorização, capital e auditoria de instituição de pagamento ou de correspondente cambial, salvo parecer jurídico em contrário.
- A neutralidade fica verificável: a plataforma não ganha nada com a escolha da casa nem com o valor da operação.
- Desaparecem módulos inteiros: conciliação, estorno, disputa, chargeback, KYC do viajante, guarda de documento.
- A superfície de dados pessoais se limita a nome, e-mail e WhatsApp, o que reduz o impacto de um incidente.

### Negative

- A plataforma não garante que a compra aconteça nem o preço final. A casa pode aceitar uma taxa e cobrar tarifas que mudam o total.
- Disputas entre viajante e casa ficam fora do produto. Restam o texto informativo e o histórico do aceite.
- A conversão do aceite em compra só é medida perguntando aos dois lados, como na H4. Não há evento de pagamento para observar.
- Monetizar por transação fica impossível nesta arquitetura. Um modelo de receita futuro terá de ser assinatura, lead ou outra forma que não toque no fluxo financeiro, e exigirá novo ADR.

### Neutral

- Cotação e taxa são exibidas como referência da casa, com até 4 casas decimais, sem arredondamento para um total em reais.
- A conferência da autorização da casa na lista do Banco Central é operacional e manual (ADR-004). Ela não transforma a plataforma em responsável pela operação.

## Alternatives Considered

### Sinal ou taxa de reserva por Pix

Reduziria aceites sem comparecimento e abriria receita. Foi rejeitado porque coloca a plataforma no fluxo financeiro do viajante, exige provedor de pagamento, conciliação e estorno, e contradiz a tese de neutralidade antes de a aproximação estar provada.

### Calcular e exibir o VET estimado

Ajudaria o viajante a comparar. Foi rejeitado porque o VET é dever da instituição autorizada e depende de tarifas e IOF que a plataforma não controla. Um VET errado exibido pela plataforma vira uma promessa de preço que ela não pode cumprir.

### Atuar como correspondente cambial de uma casa parceira

Permitiria fechar a operação dentro do produto. Foi rejeitado porque amarra a plataforma a uma instituição específica, destrói a neutralidade entre casas e traz obrigações operacionais que o piloto não comporta.

## References

- [PRD v1.1](../../03-product/prd.md): Non-Goals, Out of Scope, FR-5, FR-25, Stop and Escalate
- [Problem statement](../../01-discovery/problem-statement.md): guarda-corpos do piloto
- [Hipóteses](../../01-discovery/hypotheses.md): H4, compra fora da plataforma
- Banco Central do Brasil, *Transferências de valores do ou para o exterior e compra ou venda de moeda estrangeira para viagens internacionais* (cartilha de câmbio 2026): https://www.bcb.gov.br/content/estabilidadefinanceira/politica_cambial/Cartilha_cambio_2026.pdf
- Banco Central do Brasil, lista de instituições autorizadas a operar no mercado de câmbio: https://www.bcb.gov.br/estabilidadefinanceira/instituicoesoperacambio
- Parecer jurídico sobre o enquadramento regulatório da plataforma: pendente, owner Renato (produto)
